// Importa los módulos necesarios
const { DataTypes } = require('sequelize');
const db = require('../config.json'); // Archivo de configuración de la base de datos
const Tag = require('./tag.model'); // Modelo de la tabla "tag"
const Project = require('./project.model'); // Modelo de la tabla "project"

// Define el modelo "TagProject"
function modelTagProject(sequelize) {

  const TagProject = sequelize.define('tag_project', {
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    // Nombre de la tabla en la base de datos
    tableName: 'tag_project',
    // Opciones adicionales del modelo
    timestamps: false // Si no hay columnas de createdAt y updatedAt en la tabla
  });

  // Relaciones
  TagProject.associate = (models) => {
    TagProject.belongsTo(models.Tag, {
      as: 'Tag',
      foreignKey: 'tag_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    TagProject.belongsTo(models.Project, {
      as: 'Project',
      foreignKey: 'project_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
}

// Exporta el modelo
module.exports = modelTagProject;
