const { Sequelize } = require("sequelize");

const db = new Sequelize('testing', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql', 
});

async function connectDB() {
    try {
        await db.authenticate();
        console.log("Database connected");
        // await db.sync({force:true});
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

module.exports = { db, connectDB };
