// Importa los módulos necesarios
const { DataTypes } = require('sequelize');
const Supercategory = require('./supercategory.model'); // Modelo de la tabla "supercategory"

// Define el modelo "Category"
function modelCategory(sequelize){

  const Category = sequelize.define('category', {
      category_id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      category_title: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      supercategory_id: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      }
    }, {
      // Nombre de la tabla en la base de datos
      tableName: 'category',
      // Opciones adicionales del modelo
      timestamps: false // Si no hay columnas de createdAt y updatedAt en la tabla
    });
    
    // Crea la restricción de clave externa
    Category.associate = (models) => {
      Category.belongsTo(Supercategory, {
        foreignKey: 'supercategory_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
}
  
  // Exporta el modelo
  module.exports = modelCategory;