require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");

const errorHandler = require("_middlewares/error-handler");
const { sequelize } = require("sequelize");
const db = require("_helpers/db");

const usersRoutes = require("./routes/user.routes");
const subscriptionsRoutes = require("./routes/subscription.routes");
const adminRoutes = require("./routes/admin.routes");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api routes
app.use("/users", usersRoutes);
app.use("/subscriptions", subscriptionsRoutes);
app.use("/admin", adminRoutes);

//global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === "production" ? 80 : 4000;
//app.listen(port, () => console.log("Server listening on port " + port));

db.sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created!");
  app.listen(4000, () => console.log(`Example app listening on port ${port}!`));
});
