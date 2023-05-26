// Importa los módulos necesarios
const { DataTypes } = require('sequelize');


// Define el modelo "Size"
function modelSize(sequelize){

  const Size = sequelize.define('size', {
    size_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    size_letter: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    // Nombre de la tabla en la base de datos
    tableName: 'size',
    // Opciones adicionales del modelo
    timestamps: false // Si no hay columnas de createdAt y updatedAt en la tabla
  });
}

// Exporta el modelo
module.exports = modelSize;
