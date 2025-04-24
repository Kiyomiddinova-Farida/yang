const express = require("express");
const authMiddleware = require("./middlewares/auth");
const roleMiddleware = require("./middlewares/roleAuth");
const AuthRoute = require("./routes/auth");
const {connectDB} = require("./config/db");

const app = express();
app.use(express.json());

app.use("/auth", AuthRoute);

connectDB();

app.get("/test", roleMiddleware(["user"]), (req, res) => {
    console.log(req.userId, req.userRole);
    res.send("ishladi");
});

app.post("/test", roleMiddleware(["admin"]), (req, res) => {
    console.log(req.userId, req.userRole);
    res.send("ishladi");
});

app.delete("/test", roleMiddleware(["admin", "mini-admin"]), (req, res) => {
    console.log(req.userId, req.userRole);
    res.send("ishladi");
});

app.get("/test2", authMiddleware, (req, res) => {
    console.log(req.userId, req.userRole);
    res.send("ishladi");
});

app.listen(4000, () => console.log("Server started on port 4000"));
