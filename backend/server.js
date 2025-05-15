require("rootpath")()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const errorHandler = require("_middleware/error-handler")
const app = express()

// Debug logging for database connection
try {
    const db = require("_helpers/db")
    console.log("Database connection initialized successfully")
} catch (error) {
    console.error("Error connecting to database:", error)
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

// CORS configuration
app.use(cors({
    origin: 'http://localhost:4200', // Angular default port
    credentials: true
}))

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the User Management System API' });
});

// Debug database connection
app.get('/debug/db-status', async (req, res) => {
    try {
        const db = require("_helpers/db");
        
        // Test direct connection
        const connection = db.connection;
        const [dbStatus] = await connection.query('SELECT 1 as dbOnline');
        
        // Get table information
        const [tables] = await connection.query('SHOW TABLES');
        
        // Get Accounts count using direct SQL
        const [accountsCount] = await connection.query('SELECT COUNT(*) as count FROM accounts');
        
        // Get Sample data
        let accounts = [];
        try {
            const [accountsResults] = await connection.query('SELECT id, email, firstName, lastName, role, created FROM accounts LIMIT 5');
            accounts = accountsResults;
        } catch (e) {
            console.error("Error querying accounts:", e);
        }
        
        res.json({
            status: 'Connected',
            dbStatus: dbStatus[0],
            tables: tables.map(t => Object.values(t)[0]),
            accountsCount: accountsCount[0].count,
            sampleAccounts: accounts
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'Error', 
            error: error.message, 
            stack: error.stack 
        });
    }
});

// Direct SQL account insert for testing
app.post('/debug/direct-insert', async (req, res) => {
    try {
        const db = require("_helpers/db");
        const bcrypt = require("bcryptjs");
        
        // Create test data
        const testEmail = `test${Date.now()}@example.com`;
        const passwordHash = await bcrypt.hash('Test1234!', 10);
        
        // Direct insert using custom function
        const insertData = {
            email: testEmail,
            passwordHash: passwordHash,
            title: 'Mr',
            firstName: 'Test',
            lastName: 'User',
            role: 'User',
            isActive: 1,
            created: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        
        // Attempt direct insert
        const result = await db.directInsert('accounts', insertData);
        
        // Verify insertion success with a direct query
        const [accounts] = await db.connection.query('SELECT * FROM accounts WHERE email = ?', [testEmail]);
        
        res.json({
            success: true,
            message: 'Direct insert test completed',
            insertResult: result,
            verification: accounts
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message, 
            stack: error.stack 
        });
    }
});

// Debug route to check accounts
app.get('/debug/accounts', async (req, res) => {
    try {
        const db = require("_helpers/db")
        const accounts = await db.Account.findAll()
        res.json({ 
            success: true, 
            count: accounts.length,
            accounts: accounts.map(a => ({ 
                id: a.id,
                email: a.email,
                firstName: a.firstName,
                lastName: a.lastName,
                role: a.role,
                isVerified: a.isVerified,
                createdAt: a.created
            }))
        })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message, stack: error.stack })
    }
})

// Debug route to test account creation
app.post('/debug/create-account', async (req, res) => {
    try {
        const db = require("_helpers/db")
        const accountService = require("./accounts/account.service")
        
        // Get current count
        const beforeCount = await db.Account.count()
        
        // Create test account
        const testAccount = {
            title: "Mr",
            firstName: "Test",
            lastName: "User",
            email: `test${Date.now()}@example.com`,
            password: "Test1234!",
            confirmPassword: "Test1234!",
            acceptTerms: true
        }
        
        // Register the account
        const result = await accountService.register(testAccount, `${req.protocol}://${req.get('host')}`)
        
        // Get new count
        const afterCount = await db.Account.count()
        
        res.json({
            success: true,
            result,
            beforeCount,
            afterCount,
            difference: afterCount - beforeCount
        })
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message, 
            stack: error.stack 
        })
    }
})

// api routes
app.use("/accounts", require("./accounts/accounts.controller"))

// Swagger docs route
app.use("/api-docs", require("_helpers/swagger"))
// Global error handler
app.use(errorHandler)

const port =
    process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
