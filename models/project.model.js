// Importa los módulos necesarios
const { DataTypes } = require('sequelize');
const db = require('../config.json'); // Archivo de configuración de la base de datos
const User = require('./user.model'); // Modelo de la tabla "user"
const Category = require('./category.model'); // Modelo de la tabla "category"
const Theme = require('./theme.model'); // Modelo de la tabla "theme"
const Size = require('./size.model'); // Modelo de la tabla "size"

// Define el modelo "Project"
function modelProject(sequelize){

  const Project = sequelize.define('project', {
    project_id: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    theme_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    size_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    }
  }, {
    // Nombre de la tabla en la base de datos
    tableName: 'project',
    // Opciones adicionales del modelo
    timestamps: false // Si no hay columnas de createdAt y updatedAt en la tabla
  });


  // Crea la restricción de clave externa
  Project.associate = (models) => {
    Project.belongsTo(User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Project.belongsTo(Category, {
      foreignKey: 'category_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Project.belongsTo(Theme, {
      foreignKey: 'theme_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Project.belongsTo(Size, {
      foreignKey: 'size_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
}

// Exporta el modelo
module.exports = modelProject;
