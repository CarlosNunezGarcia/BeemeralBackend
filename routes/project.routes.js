const express = require('express');
const router = express.Router();
const verify = require('../_middlewares/authorize');
const uploadImgProyect = require('../_middlewares/uploadImgProject');
const uploadJsonProyect = require('../_middlewares/uploadJsonProject');

const projectControllers = require('../controllers/project.controller');

//creat project
//localhost:4000/projects/createProject/:user_id
router.post('/createProject/:user_id', verify, projectControllers.createProject);

//edit title project
//localhost:4000/projects/editTitle/:project_id
router.put('/editTitle/:project_id', verify, projectControllers.editProject);

//delete project
//localhost:4000/projects/delProject/:project_id
router.put('/delProject/:project_id', verify, projectControllers.delProject);

//get all information from a project
//localhost:4000/projects/getProject/:project_id/:user_id
router.get('/oneProject/:project_id/:user_id', verify, projectControllers.oneProject);

//show all templates
//localhost:4000/projects/allTemplates
router.get('/allTemplates', verify, projectControllers.allTemplates);

//add photo to project
//localhost:4000/projects/addPhoto/:project_id
router.put('/addPhoto/:project_id', uploadImgProyect('project'), uploadJsonProyect('project'), projectControllers.addPhoto);

//show all information from a Supercategory
//localhost:4000/projects/wizard/allSupCat
router.get('/wizard/allSupCat', projectControllers.allSupCat);

//show all information from a Category filtered by Supercategory
//localhost:4000/projects/wizard/allCatFilterSupCat
router.post('/wizard/allCatFilterSupCat', projectControllers.allCatFilterSupCat);

//show all information of size
//localhost:4000/projects/wizard/allSize
router.get('/wizard/allSize', projectControllers.allSize);

//show all information of theme
//localhost:4000/projects/wizard/allTheme
router.get('/wizard/allTheme', projectControllers.allTheme);

//show all templates filtered by wizard
//localhost:4000/projects/wizard/templateFilter
router.get('/wizard/templateFilter', projectControllers.templateFilter);

//make public a project
//localhost:4000/projects/publish/:id
router.put('/publish/:id', verify, projectControllers.publish);

//make private a project
//localhost:4000/projects/makePrivate/:id
router.put('/makePrivate/:id', verify, projectControllers.makePrivate);

//create a project with form
//localhost:4000/projects/createProjectByForm/:user_id
router.post('/createProjectByForm/:user_id', verify, uploadImgProyect('project'), projectControllers.createProjectByForm);


module.exports = router;



