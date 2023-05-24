// Importa los módulos necesarios
const { DataTypes } = require('sequelize');
const db = require('../config.json'); // Archivo de configuración de la base de datos
const Tag = require('./tag.model'); // Modelo de la tabla "tag"
const Project = require('./project.model'); // Modelo de la tabla "project"

// Define el modelo "TagProject"
const TagProject = db.define('tag_project', {
  tag_id: {
    type: DataTypes.MEDIUMINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Tag,
      key: 'tag_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  project_id: {
    type: DataTypes.MEDIUMINT.UNSIGNED,
    allowNull: false,
    references: {
      model: Project,
      key: 'project_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  // Nombre de la tabla en la base de datos
  tableName: 'tag_project',
  // Opciones adicionales del modelo
  timestamps: false // Si no hay columnas de createdAt y updatedAt en la tabla
});

// Exporta el modelo
module.exports = TagProject;
