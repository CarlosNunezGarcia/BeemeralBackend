// Importa los módulos necesarios de Sequelize
const { DataTypes } = require('sequelize');
const sequelize = require('../_helpers/db');

// Define el modelo Subscription
function modelSubscription(sequelize) {

    const Subscription = sequelize.define('subscription', {
      subscription_id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      plans: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
        defaultValue: 0,
      },
      export: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      render: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      space: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 5,
      },
      tokenization: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      price_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },{
        tablename: 'subscription',
    });
}

// Exporta el modelo Subscription
module.exports = modelSubscription;
