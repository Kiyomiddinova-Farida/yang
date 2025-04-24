const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    let authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(404).send({ message: "Token not provided" });
    }

    let token = authHeader.split(" ")[1]; 

    try {
        let data = jwt.verify(token, "stakan");
        req.userId = data.id;
        req.userRole = data.role;
        next();
    } catch (error) {
        return res.status(401).send({ message: "Invalid token", error: error.message });
    }
}

module.exports = authMiddleware;