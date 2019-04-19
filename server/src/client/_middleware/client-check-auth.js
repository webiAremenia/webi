import jwt from 'jsonwebtoken'

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.client = jwt.verify(token, process.env.JWT_KEY);
        next()
    } catch (e) {
        return res.status(401).json({
            message: 'Auth failed !'
        })
    }
}