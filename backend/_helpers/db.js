const config = require("config.json")
const mysql = require("mysql2/promise")
const { Sequelize } = require("sequelize")

module.exports = db = {}

initialize()

async function initialize() {
    try {
        console.log("Initializing database connection...")
        // Create database if it does not exist
        const { host, port, user, password, database } = config.database
        
        console.log(`Connecting to MySQL: ${host}:${port} as ${user}`)
        const connection = await mysql.createConnection({
            host,
            port,
            user,
            password,
        })
        
        // Create database if it doesn't exist
        console.log(`Ensuring database exists: ${database}`)
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)
        
        // Export direct connection for debugging
        db.connection = await mysql.createConnection({
            host,
            port,
            user,
            password,
            database
        })
        
        // Connect to db with Sequelize
        console.log("Connecting with Sequelize...")
        const sequelize = new Sequelize(database, user, password, {
            host: host,
            port: port,
            dialect: "mysql",
            logging: console.log,
            dialectOptions: {
                // For better error messages
                multipleStatements: true
            }
        })
        
        // Test connection
        await sequelize.authenticate()
        console.log("Sequelize connection established successfully.")
        
        // Export sequelize instance
        db.sequelize = sequelize
        
        // Init models and add them to exported db object
        console.log("Initializing models...")
        db.Account = require("../accounts/account.model")(sequelize)
        db.RefreshToken = require("../accounts/refresh-token.model")(sequelize)

        // Define relationships
        db.Account.hasMany(db.RefreshToken, { onDelete: "CASCADE" })
        db.RefreshToken.belongsTo(db.Account)

        // Helper function for direct SQL inserts (for debugging)
        db.directInsert = async (tableName, data) => {
            const columns = Object.keys(data).join(', ');
            const placeholders = Object.keys(data).map(() => '?').join(', ');
            const values = Object.values(data);
            
            const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
            const [result] = await db.connection.execute(sql, values);
            return result;
        };

        // Sync all models with the database
        console.log("Syncing database models...")
        await sequelize.sync({ alter: true })
        console.log("Database initialization complete")

    } catch (error) {
        console.error("Database initialization failed:", error)
        throw error
    }
}
