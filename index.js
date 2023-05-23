require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");

const errorHandler = require("_middlewares/error-handler");
const sequelize = require("sequelize");
const db = require("_helpers/db");


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use("/users", require("./routes/user.routes"));

//global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === "production" ? 80 : 4000;
//app.listen(port, () => console.log("Server listening on port " + port));

db.sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created!");
  app.listen(4000, () => console.log(`Example app listening on port ${port}!`));
});
