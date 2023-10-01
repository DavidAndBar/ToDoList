const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('token');

    if (!token) return res.status(404).json({error: "No Token"})

    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = verified
        next()
    } catch (error) {
        res.status(404).json({error: "Wrong Token"})
    }
}


module.exports = verifyToken