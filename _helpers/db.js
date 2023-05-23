const { Sequelize } = require('sequelize');
const { dbName, dbConfig } = require('config.json');

const db = {};

//create sequelize instance
const sequelize = new Sequelize(
    dbName,
    dbConfig.authentication.options.userName,
    dbConfig.authentication.options.password,
    {
        host: dbConfig.server,
        port: dbConfig.options.port,
        dialect: "postgres",
        dialectOptions: {
            ssl: false,
        },
    }
)

//init models and add them to the exported db object


//add sequelize to the db object to be used globally
db.sequelize = sequelize;

//sync all models with database
(async () => {
    try {
        await sequelize.sync({ alter: true});
        console.log("Database synchronized successfully");
    } catch (error) {
        console.log("Error synchronizing database: ", error);
    }
})();

module.exports = db;