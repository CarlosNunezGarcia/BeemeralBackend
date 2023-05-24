var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../config.json");
const uploadImgUser = require('../_middlewares/uploadImgUser')
const uploadImgProyect = require('../_middlewares/uploadImgProject');
const uploadJsonProyect = require('../_middlewares/uploadJsonProject');
const verify = require('../_middlewares/verify');
const userControllers = require("../controllers/user.controller");
require("dotenv").config();
const nodemailer = require("nodemailer");

//1 - crear usuario
//localhost:4000/users/createUser
router.post("/createUser", uploadImgUser("user"), userControllers.createUser);

//2 - login
//localhost:4000/users/login
router.post("/login", userControllers.login);

//3 - traer info de un usuario
//localhost:4000/users/oneUser/:user_id
//router.get("/oneUser/:user_id", verify, userControllers.selectOneUser);

//4 - editar info usuario
//localhost:4000/users/editUser/:userId
router.put("/editUser/:user_id", verify, userControllers.editUser)

//5 - editar foto usuario
//localhost:4000/users/editImgUser/:userId
router.put("/editImgUser/:user_id", uploadImgUser("user"), verify, userControllers.editImgUser)

//6 - verificar contraseña
//localhost:4000/users/checkPassword/:userId
router.put("/checkPassword/:user_id", verify, userControllers.checkPassword)

//7 - editar contraseña
//localhost:4000/users/editPassword/:userId
router.put("/editPassword/:user_id", verify, userControllers.editPassword)

//8 - borrado lógico de un usuario
//localhost:4000/users/deleteUser/:userId       
router.delete("/deleteUser/:user_id", verify, userControllers.deleteUser);

//9 - verificar email
//localhost:4000/users/verify/:token
router.get("/verify/:token", userControllers.verifyUser);

//10 - reenviar email de verificacion
//localhost:4000/users/resendEmail
router.put("/resendEmail", userControllers.resendEmail);

//11 - recuperación de contraseña
//localhost:4000/users/forgotPassword
router.put("/forgotPassword", userControllers.forgotPassword);

//12 - gastar un render
// localhost:4000/users/spendRender/:user_id
router.get("/spendRender/:user_id", verify, userControllers.spendRender);

//13 - gastar un export
// localhost:4000/users/spendExport/:user_id
router.get("/spendExport/:user_id", verify, userControllers.spendExport);

//14 - traer todos los precios disponibles en la cuenta de Stripe
//localhost:4000/users/getPrices
router.get("/getPrices", userControllers.getPrices);

module.exports = router;
