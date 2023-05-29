const { DataTypes } = require('sequelize');

// Define el modelo "Asset"
function modelAsset(sequelize){

    const Asset = sequelize.define('asset', {

        asset_id: {
            type: DataTypes.SMALLINT,   
            primaryKey: true,
            autoIncrement: true
        },
        asset_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        asset_type: {
            type: DataTypes.INTEGER(7),
            allowNull: false
        },
        asset_tags: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        asset_reference: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    });
};

// Exporta el modelo
module.exports = modelAsset;