const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const userController = require('../controllers/user.controllers');
require('dotenv').config();

//Create a new user
router.post('/register', userController.register);

//Login
router.post('/login', userController.login);

//Get all users
router.get('/all', userController.getAll);

//Get user by id
router.get('/:id', userController.getById);

//Update user
router.put('/:id', userController.update);

//Delete user
router.delete('/:id', userController.delete);
