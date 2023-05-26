const { DataTypes } = require('sequelize');


function modelTheme(sequelize){

  const Theme = sequelize.define('theme', {
      theme_id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      theme_title: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      tableName: 'theme',
      timestamps: false
    });
}
  
  module.exports = modelTheme;