const connection = require('../config.json');
const { User } = require('../models/user.model');
const { Subscription } = require('../models/subscription.model');
const { SuperCategory } = require('../models/supercategory.model');

//Show all users
//localhost:4000/admin/allUser
const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      const admin = await User.findByPk(req.body.id);
  
      res.status(200).json({ users, admin });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  //Disable user
//localhost:4000/admin/disableUser/:userId
  const disableUser = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      await User.update({ is_deleted: true }, { where: { user_id } });
      const users = await User.findAll();
  
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  //Enable user
//localhost:4000/admin/enableUser/:userId
const enableUser = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      await User.update({ is_deleted: false }, { where: { user_id } });
      const users = await User.findAll();
  
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  //change role to admin(2)
  //localhost:4000/admin/adminUser/:userId
  const adminUser = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      await User.update({ type: 2 }, { where: { user_id } });
      const users = await User.findAll();
  
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  //change role to user(1)
  //localhost:4000/admin/normalUser/:userId
  const normalUser = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      await User.update({ type: 1 }, { where: { user_id } });
      const users = await User.findAll();
  
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  //create supercategory
  //localhost:4000/admin/createSuperCategory
  /* const createSupercategory = async (req, res) => {
  try {
    const { supercategory_title } = req.body;

    const newSupercategory = await Supercategory.create({ supercategory_title });

    res.status(200).json(newSupercategory);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
};*/


  module.exports = {
    getAllUsers,
    disableUser,
    enableUser,
    adminUser,
    normalUser,
    //createSupercategory,

  }
