const { Router } = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const route = Router();

route.post("/login", async (req, res) => {
    let { password, userName } = req.body;

    try {
        let user = await User.findOne({ where: { userName: userName } });

        if (!user) {
            res.status(404).send({ message: "User not found" });
            return;
        }

        let match = bcrypt.compareSync(password, user.password);
        if (!match) {
            res.status(404).send({ message: "Wrong password" });
            return;
        }

        let token = jwt.sign({ id: user.id, role: user.role }, "stakan");
        res.send({ token });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

route.post("/register", async (req, res) => {
    let { password, role, userName } = req.body;

    try {
        let user = await User.findOne({ where: { userName: userName } });

        if (user) {
            res.status(400).send({ message: "User already exists" });
            return;
        }

        let hash = bcrypt.hashSync(password, 10);
        let newUser = await User.create({
            userName: userName,
            password: hash,
            role: role,
        });

        res.send(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = route;
