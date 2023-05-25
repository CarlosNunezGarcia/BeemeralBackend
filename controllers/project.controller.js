const { Project } = require("../models/project.model");
const { User } = require("../models/user.model");
const { Category } = require("../models/category.model");
const { Theme } = require("../models/theme.model");
const { Size } = require("../models/size.model");
const { Supercategory } = require("../_helpers/db");

//create project and return user projects to BD
//localhost:4000/projects/createProject/:user_id
const createProject = async (req, res) => {
  //get user_id from params
  const user_id = req.params.user_id;
  //get project info from body
  const { title, supercategory, category, theme, size } = req.body;

  try {
    const user = await User.findone({ where: { user_id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const type = resultUser[0].type;

    const project = await Project.create({
      title,
      category_id: category,
      theme_id: theme,
      size_id: size,
      user_id,
    });
    //create asset to send to Unity
    res.status(200).json({
      user_id: user_id,
      project_id: project.project_id,
      title: title,
      supercategory: supercategory,
      category: category,
      theme: theme,
      size: size,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//edit title project
//localhost:4000/projects/editTitle/:project_id
const editProject = async (req, res) => {
  const { project_id } = req.params;
  const { title } = req.body;

  try {
    const project = await Project.findByPk(project_id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    project.title = title;
    await project.save();

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//delete project
//localhost:4000/projects/delProject/:project_id
const delProject = async (req, res) => {
  const { project_id } = req.params;

  try {
    const project = await Project.findByPk(project_id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    project.is_deleted = true;
    await project.save();

    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//show one project
//localhost:4000/projects/oneProject/:project_id/:user_id
const oneProject = async (req, res) => {
  const { project_id, user_id } = req.params;

  try {
    const project = await Project.findOne({
      where: {
        project_id,
        user_id,
        is_deleted: false,
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//see all templates
//localhost:4000/projects/allTemplates
const allTemplates = async (req, res) => {
  try {
    const resultTemplates = await Project.findAll({
      attributes: ["project_id", "title"],
      include: [
        {
          model: User,
          attributes: ["name", "img", "nickname"],
        },
        {
          model: Size,
          attributes: ["size_letter"],
        },
      ],
      where: {
        is_public: true,
      },
      order: Sequelize.literal("random()"),
    });

    const resultCategories = await Category.findAll();
    const resultThemes = await Theme.findAll();
    const resultSizes = await Size.findAll();

    res.status(200).json({
      resultTemplates,
      resultCategories,
      resultThemes,
      resultSizes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//add photo to project
//localhost:4000/projects/addPhoto/:project_id
const addPhoto = async (req, res) => {
  const { project_id } = req.params;
  const { photo } = req.body;

  try {
    const project = await Project.findByPk(project_id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    project.photo = photo;
    await project.save();

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//show all information of supercategory
//localhost:4000/projects/wizard/allSupCat
const allSupCat = async (req, res) => {
  try {
    const resultSupCat = await Supercategory.findAll({
      where: {
        is_deleted: false,
      },
    });

    res.status(200).json(resultSupCat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//show all information of category
//localhost:4000/projects/wizard/allCatFilterSupCat
const allCatFilterSupCat = async (req, res) => {
  const { supercategory_id } = req.body;

  try {
    const resultCategory = await Category.findAll({
      where: {
        supercategory_id,
        is_deleted: false,
      },
    });

    res.status(200).json(resultCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//show all information of size
//localhost:4000/projects/wizard/allSize
const allSize = async (req, res) => {
  try {
    const resultSize = await Size.findAll({
      where: {
        is_deleted: false,
      },
    });

    res.status(200).json(resultSize);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//show all information of theme
//localhost:4000/projects/wizard/allTheme
const allTheme = async (req, res) => {
  try {
    const resultTheme = await Theme.findAll({
      where: {
        is_deleted: false,
      },
    });

    res.status(200).json(resultTheme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//show all templates which have the wizard filters
//localhost:4000/projects/wizard/templateFilter
const templateFilter = async (req, res) => {
  const { category_id, size_id, theme_id } = req.body;

  try {
    const resultFilter = await Project.findAll({
      where: {
        category_id,
        size_id,
        theme_id,
        is_public: true,
      },
      include: [
        {
          model: Size,
          attributes: ["size_letter"],
        },
        {
          model: User,
          attributes: ["img", "nickname"],
        },
      ],
      order: Sequelize.literal("RANDOM()"),
    });

    if (resultFilter.length === 0) {
      return res.status(400).json("There are no templates with these filters");
    }

    res.status(200).json({ resultFilter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//change to public a project
//localhost:4000/projects/publish/:id
const publish = async (req, res) => {
  const { project_id } = req.params;

  try {
    const project = await Project.findByPk(project_id);

    if (!project) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    project.is_public = true;
    await project.save();

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//change to private a project
//localhost:4000/projects/makePrivate/:id
const makePrivate = async (req, res) => {
  const { project_id } = req.params;

  try {
    const project = await Project.findByPk(project_id);

    if (!project) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    project.is_public = false;
    await project.save();

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    res.status(400).json({ error });
  }
};

//create a project with form
//localhost:4000/projects/createProjectByForm/:id
const createProjectByForm = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { title, category_id, theme_id, size_id } = req.body;

    let projectData = {
      title,
      category_id,
      theme_id,
      size_id,
      user_id,
      photo: req.files && req.files.length ? req.files[0].filename : null,
    };

    const project = await Project.create(projectData);

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    res.status(400).json({ error });
  }
};

module.exports = {
  createProject,
  editProject,
  delProject,
  oneProject,
  allTemplates,
  addPhoto,
  allSupCat,
  allCatFilterSupCat,
  allSize,
  allTheme,
  templateFilter,
  publish,
  makePrivate,
  createProjectByForm,
};
