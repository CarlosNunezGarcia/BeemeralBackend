// Importa los módulos necesarios
const { DataTypes } = require('sequelize');


// Define el modelo "Tag"
function modelTag(sequelize){

  const Tag = sequelize.define('tag', {
    tag_id: {
      type: DataTypes.INTEGER,
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
}

// Exporta el modelo
module.exports = modelTag;
