import jwt from "jsonwebtoken"

export const verifyToken = async (req ,res, next) => {
    try {
        let token = req.header("Authorization")

        if (!token) {
            return res.status(403).send("Access Denied! ")
        }

        if (token.startWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft()
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)

        // Store the verified user information in the user attribute of the request object so that subsequent routing processing functions can access it
        req.user = verified
        next()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}