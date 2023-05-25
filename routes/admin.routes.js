const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin.controller");
const verify = require("../_middlewares/authorize");

//Show all users
//localhost:4000/admin/showUsers
router.get("/allUser", adminControllers.getAllUsers);

//disable user
//localhost:4000/admin/disableUser/:userId
router.put("/disableUser/:user_id", adminControllers.disableUser);

//enable user
//localhost:4000/admin/enableUser/:userId
router.put("/enableUser/:user_id", adminControllers.enableUser);

//change user role to admin(2)
//localhost:4000/admin/adminUser/:userId
router.put("/adminUser/:user_id", adminControllers.adminUser);

//change user role to user(1)
//localhost:4000/admin/normalUser/:userId
router.put("/normalUser/:user_id", adminControllers.normalUser);

//create supercategory
//localhost:4000/admin/createSuperCategory
router.post("/createSuperCategory", adminControllers.createSupercategory);

//show all supercategories
//localhost:4000/admin/allSuperCategories
router.get("/allSuperCategories", adminControllers.getAllSupercategories);

//edit supercategory
//localhost:4000/admin/editSuperCategory/:supercategory_id
router.put("/editSuperCategory/:supercategory_id", adminControllers.editSupercategory);

//delete supercategory
//localhost:4000/admin/deleteSuperCategory/:supercategory_id
router.delete("/deleteSuperCategory/:supercategory_id", adminControllers.deleteSupercategory);

//enable supercategory
//localhost:4000/admin/enableSuperCategory/:supercategory_id
router.put("/enableSuperCategory/:supercategory_id", adminControllers.enableSupercategory);

//show all categories
//localhost:4000/admin/allCategories
router.get("/allCategories", adminControllers.getAllCategories);

//create category
//localhost:4000/admin/createCategory/:supercategory_id
router.post("/createCategory/:supercategory_id", adminControllers.createCategory);

//edit category
//localhost:4000/admin/editCategory/:category_id
router.put("/editCategory/:category_id", adminControllers.editCategory);

//delete category
//localhost:4000/admin/deleteCategory/:category_id
router.delete("/deleteCategory/:category_id", adminControllers.deleteCategory);

//enable category which was deleted
//localhost:4000/admin/enableCategory/:category_id
router.put("/enableCategory/:category_id", adminControllers.enableCategory);

//show all sizes
//localhost:4000/admin/allSizes
router.get("/allSizes", adminControllers.getAllSizes);

//create size
//localhost:4000/admin/createSize
router.post("/createSize", adminControllers.createSize);

//edit size
//localhost:4000/admin/editSize/:size_id
router.put("/editSize/:size_id", adminControllers.editSize);

//delete size
//localhost:4000/admin/deleteSize/:size_id
router.delete("/deleteSize/:size_id", adminControllers.deleteSize);

//enable size which was deleted
//localhost:4000/admin/enableSize/:size_id
router.put("/enableSize/:size_id", adminControllers.enableSize);

//show all themes
//localhost:4000/admin/allThemes
router.get("/allThemes", adminControllers.getAllThemes);

//create theme
//localhost:4000/admin/createTheme
router.post("/createTheme", adminControllers.createTheme);

//edit theme
//localhost:4000/admin/editTheme/:theme_id
router.put("/editTheme/:theme_id", adminControllers.editTheme);

//delete theme
//localhost:4000/admin/deleteTheme/:theme_id
router.delete("/deleteTheme/:theme_id", adminControllers.deleteTheme);

//enable theme which was deleted
//localhost:4000/admin/enableTheme/:theme_id
router.put("/enableTheme/:theme_id", adminControllers.enableTheme);

module.exports = router;
