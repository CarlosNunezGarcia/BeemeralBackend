const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const userController = require('../controllers/user.controllers');
const authorize = require('../_middlewares/authorize');
require('dotenv').config();

//Create a new user
router.post('/register', authorize, userController.create);

//Login
router.post('/login', authorize, userController.login);

//Get all users
router.get('/all', authorize, userController.getAll);

//Get user by id
router.get('/:id', authorize, userController.getById);

//Update user
router.put('/:id', authorize, userController.update);

//Delete user
router.delete('/:id', authorize, userController.delete);

module.exports = router;
