const { expressjwt: jwt } = require("express-jwt")
const { secret } = require("../config.json")
const db = require("_helpers/db")

module.exports = authorize

function authorize(roles = []) {
    //
    //
    if (typeof roles == "string") {
        roles = [roles]
    }
    return [
        // Authenticate JWT token and attach user to request object (req.user)
        jwt({ secret, algorithms: ["HS256"] }),

        // authorize based on user role
        async (req, res, next) => {
            const account = await db.Account.findByPk(req.user.id)

            if (!account || (roles.length && !roles.includes(account.role))) {
                // Role not authorized or account no longer exist
                return res.status(401).json({ message: "Unauthorized" })
            }

            // authentication and authorization successful
            req.user.role = account.role
            const refreshTokens = await account.getRefreshTokens()
            req.user.ownsToken = (token) =>
                !!refreshTokens.find((x) => x.token === x.token)
            next()
        },
    ]
}
