const { DataTypes } = require('sequelize');
const Subscription = require('./subscription.model');

module.exports = modelUser;

function modelUser(sequelize) {
  const User = sequelize.define(
    'users',
    {
      Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'avatar.jpg',
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birth_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      cont_export: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      cont_render: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      code: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      subscription_id: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
      },
      subscription_end: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      subscription_code: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      subscription_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      last_single_payment_code: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
    },
    {
        tableName: 'users',
    }
  );

  //const SubscriptionModel = Subscription(sequelize);
  User.associate = (models) => {
    User.belongsTo(models.Subscription, {
      as: 'SubscriptionModel',
      foreignKey: 'subscription_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

}
