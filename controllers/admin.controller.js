const connection = require("../config.json");
const { User } = require("../models/user.model");
const { Subscription } = require("../models/subscription.model");
const { SuperCategory } = require("../models/supercategory.model");

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
const createSupercategory = async (req, res) => {
  try {
    const { supercategory_title } = req.body;

    const newSupercategory = await Supercategory.create({
      supercategory_title,
    });

    res.status(200).json(newSupercategory);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
};

//pick up all supercategories
//localhost:4000/admin/allSuperCategories
const getAllSupercategories = (req, res) => {
  Supercategory.findAll()
    .then((supercategories) => {
      res.status(200).json(supercategories);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//edit supercategory
//localhost:4000/admin/editSupercategory/:supercategory_id
const editSupercategory = async (req, res) => {
  const id = req.params.supercategory_id;
  const { supercategory_title } = req.body;

  try {
    const supercategory = await Supercategory.findByPk(id);

    if (!supercategory) {
      return res.status(404).json({ error: "Supercategory not found" });
    }

    supercategory.supercategory_title = supercategory_title;
    await supercategory.save();

    res.status(200).json(supercategory);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//delete supercategory
//localhost:4000/admin/deleteSupercategory/:supercategory_id
const deleteSupercategory = async (req, res) => {
  const id = req.params.supercategory_id;

  try {
    const supercategory = await Supercategory.findByPk(id);

    if (!supercategory) {
      return res.status(404).json({ error: "Supercategory not found" });
    }

    supercategory.is_deleted = true;
    await supercategory.save();

    res.status(200).json(supercategory);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//enable supercategory
//localhost:4000/admin/enableSupercategory/:supercategory_id
const enableSupercategory = async (req, res) => {
  const id = req.params.supercategory_id;

  try {
    const supercategory = await Supercategory.findByPk(id);

    if (!supercategory) {
      return res.status(404).json({ error: "Supercategory not found" });
    }

    supercategory.is_deleted = false;
    await supercategory.save();

    res.status(200).json(supercategory);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//all categories
//localhost:4000/admin/allCategories
const getAllCategories = (req, res) => {
  Category.findAll()
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//create category
//localhost:4000/admin/createCategory/:supercategory_id
const createCategory = (req, res) => {
  const { category_title, supercategory_id } = req.body;

  Category.create({ category_title, supercategory_id })
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error creating category" });
    });
};

//edit category
//localhost:4000/admin/editCategory/:category_id
const editCategory = (req, res) => {
  const id = req.params.category_id;
  const { category_title } = req.body;

  Category.findByPk(id)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      category.category_title = category_title;
      return category.save();
    })
    .then((updatedCategory) => {
      res.status(200).json(updatedCategory);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//delete category
//localhost:4000/admin/deleteCategory/:category_id
const deleteCategory = (req, res) => {
  const id = req.params.category_id;

  Category.findByPk(id)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      category.is_deleted = true;
      return category.save();
    })
    .then(() => {
      res.status(200).json({ message: "Category deleted successfully" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//enable category which was deleted
//localhost:4000/admin/enableCategory/:category_id
const enableCategory = (req, res) => {
  const id = req.params.category_id;

  Category.findByPk(id)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      category.is_deleted = false;
      return category.save();
    })
    .then(() => {
      res.status(200).json({ message: "Category enabled successfully" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//pick up all sizes
//localhost:4000/admin/allSizes
const getAllSizes = (req, res) => {
  Size.findAll()
    .then((sizes) => {
      res.status(200).json(sizes);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//create a size
//localhost:4000/admin/createSize
const createSize = async (req, res) => {
  try {
    const { size_letter } = req.body;

    const size = await Size.create({ size_letter });

    res.status(200).json(size);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//edit size
//localhost:4000/admin/editSize/:size_id
const editSize = async (req, res) => {
  try {
    const { size_letter } = req.body;
    const id = req.params.size_id;

    const size = await Size.findByPk(id);

    if (!size) {
      return res.status(404).json({ error: "Size not found" });
    }

    size.size_letter = size_letter;
    await size.save();

    res.status(200).json(size);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//delete size
//localhost:4000/admin/deleteSize/:size_id
const deleteSize = async (req, res) => {
  try {
    const id = req.params.size_id;

    const size = await Size.findByPk(id);

    if (!size) {
      return res.status(404).json({ error: "Size not found" });
    }

    size.is_deleted = true;
    await size.save();

    res.status(200).json(size);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//enable size
//localhost:4000/admin/enableSize/:size_id
const enableSize = async (req, res) => {
  try {
    const id = req.params.size_id;

    const size = await Size.findByPk(id);

    if (!size) {
      return res.status(404).json({ error: "Size not found" });
    }

    size.is_deleted = false;
    await size.save();

    res.status(200).json(size);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//get all themes
//localhost:4000/admin/allThemes
const getAllThemes = async (req, res) => {
  try {
    const themes = await Theme.findAll();

    res.status(200).json(themes);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//create theme
//localhost:4000/admin/createTheme
const createTheme = async (req, res) => {
  try {
    const { theme_title } = req.body;

    const theme = await Theme.create({ theme_title });

    res.status(200).json(theme);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//edit theme
//localhost:4000/admin/editTheme/:theme_id
const editTheme = async (req, res) => {
  try {
    const { theme_id } = req.params;
    const { theme_title } = req.body;

    const theme = await Theme.findByPk(theme_id);

    if (!theme) {
      return res.status(404).json({ error: "Theme not found" });
    }

    theme.theme_title = theme_title;
    await theme.save();

    res.status(200).json(theme);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//delete theme
//localhost:4000/admin/deleteTheme/:theme_id
const deleteTheme = async (req, res) => {
  try {
    const { theme_id } = req.params;

    const theme = await Theme.findByPk(theme_id);

    if (!theme) {
      return res.status(404).json({ error: "Theme not found" });
    }

    theme.is_deleted = true;
    await theme.save();

    res.status(200).json({ message: "Theme deleted successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

//enable theme which was deleted
//localhost:4000/admin/enableTheme/:theme_id
const enableTheme = async (req, res) => {
  try {
    const { theme_id } = req.params;

    const theme = await Theme.findByPk(theme_id);

    if (!theme) {
      return res.status(404).json({ error: "Theme not found" });
    }

    theme.is_deleted = false;
    await theme.save();

    res.status(200).json({ message: "Theme enabled successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  getAllUsers,
  disableUser,
  enableUser,
  adminUser,
  normalUser,
  createSupercategory,
  getAllSupercategories,
  editSupercategory,
  deleteSupercategory,
  enableSupercategory,
  getAllCategories,
  createCategory,
  editCategory,
  deleteCategory,
  enableCategory,
  getAllSizes,
  createSize,
  editSize,
  deleteSize,
  enableSize,
  getAllThemes,
  createTheme,
  editTheme,
  deleteTheme,
  enableTheme,
};
