const { DataTypes } = require('sequelize');


function modelSupercategory(sequelize){

  const Supercategory = sequelize.define('supercategory', {
      supercategory_id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      supercategory_title: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      // Nombre de la tabla en la base de datos
      tableName: 'supercategory',
      // Opciones adicionales del modelo
      timestamps: false // Si no hay columnas de createdAt y updatedAt en la tabla
    });
}
  
  // Exporta el modelo
  module.exports = modelSupercategory;