const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
    const { token } = req.cookies 

    if (!token) {
        return res.json({ message: "Please login to create a post" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
            return res.json({ message: "Invalid or expired token" });
        }

        req.user = { id: payload.id, admin: payload.admin };
        next(); 
    });
};

module.exports = authentication;
