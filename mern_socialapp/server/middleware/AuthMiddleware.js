import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header(`Authorization`)
        //Grab the token from the req header

        if(!token)
            return res.status(403).send(`Access Denied`)

        if (token.startsWith(`Bearer `)) {
            token = token.slice(7, token.length).trimStart()
            //Reformat token string
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        
        next()
    }
    catch (err){
        res.status(500).json({ error: err.message })
    }
}