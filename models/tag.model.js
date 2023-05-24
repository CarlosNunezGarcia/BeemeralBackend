// Importa los módulos necesarios
const { DataTypes } = require('sequelize');
const db = require('../config.json'); // Archivo de configuración de la base de datos

// Define el modelo "Tag"
const Tag = db.define('tag', {
  tag_id: {
    type: DataTypes.MEDIUMINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  tag_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true
  }
}, {
  // Nombre de la tabla en la base de datos
  tableName: 'tag',
  // Opciones adicionales del modelo
  timestamps: false // Si no hay columnas de createdAt y updatedAt en la tabla
});

// Exporta el modelo
module.exports = Tag;
