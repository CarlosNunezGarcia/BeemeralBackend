// Importa los módulos necesarios
const { DataTypes } = require('sequelize');
const db = require('../config.json'); // Archivo de configuración de la base de datos
const User = require('./user.model'); // Modelo de la tabla "user"
const Category = require('./category.model'); // Modelo de la tabla "category"
const Theme = require('./theme.model'); // Modelo de la tabla "theme"
const Size = require('./size.model'); // Modelo de la tabla "size"

// Define el modelo "Project"
const Project = db.define('project', {
  project_id: {
    type: DataTypes.MEDIUMINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING(100)
  },
  project_data: {
    type: DataTypes.STRING(150)
  },
  is_public: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  category_id: {
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Category,
      key: 'category_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  theme_id: {
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Theme,
      key: 'theme_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  size_id: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Size,
      key: 'size_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  // Nombre de la tabla en la base de datos
  tableName: 'project',
  // Opciones adicionales del modelo
  timestamps: false // Si no hay columnas de createdAt y updatedAt en la tabla
});

// Exporta el modelo
module.exports = Project;
