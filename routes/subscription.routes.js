const express = require('express');
const router = express.Router();

const subscriptionController = require('../controllers/subscription.controllers');

//traer las subscripciones
router.get('/allSubs', subscriptionController.getAllSubscriptions);

//crear una subscripcion
router.post('/createSub', subscriptionController.createSubscription);

//editar una subscripcion
router.put('/editSub/:subscription_id', subscriptionController.editSubscription);