const { DataTypes } = require("sequelize");
const {db} = require("../config/db");

const User = db.define("Users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
    },
}, {
    timestamps: true, 
});

module.exports = User;
