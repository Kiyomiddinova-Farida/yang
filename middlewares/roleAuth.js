const jwt = require("jsonwebtoken");

function roleMiddleware(roles) {
    return (req, res, next) => {
        let authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(404).send({ message: "Token not provided" });
        }

        let token = authHeader.split(" ")[1]; 

        try {
            let data = jwt.verify(token, "stakan");

            req.userId = data.id;
            req.userRole = data.role;

            if (roles.includes(data.role)) {
                next();
            } else {
                return res.status(401).send({ message: "Not allowed" });
            }
        } catch (error) {
            return res.status(401).send({ message: "Invalid token", error: error.message });
        }
    };
}

module.exports = roleMiddleware;