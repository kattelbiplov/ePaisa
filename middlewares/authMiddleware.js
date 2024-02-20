const jwt = require('jsonwebtoken');

//decode token
module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.jwt_secret);
        //req.user = { userId: decoded.userId, role: decoded.role };
        console.log('User object in authMiddleware:', req.user);
     req.body.userId = decoded.userId;
        req.body.role = decoded.role;
        console.log('User object in authMiddleware:', req.body.userId);
        console.log('Decoded Token:', decoded);
        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized",
            success: false,
        });
    }
};





