import jwt from 'jsonwebtoken';


module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.adminData = jwt.verify(token, global.gConfig.jwt_key);
        next();
    } catch (e) {
        return res.status(401).json({
            message: 'Auth failed !'
        })
    }
};
