require("rootpath")()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const errorHandler = require("_middleware/error-handler")
const app = express()

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
