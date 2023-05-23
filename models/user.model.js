const { Datatypes } = require("sequelize");

module.exports = modelUser;

function modelUser(sequelize) {
    const users = {
        Id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        img: {
            varchar: Datatypes.STRING,
            allowNull: false,
            },
        nickname: {
            varchar: Datatypes.STRING,
            allowNull: false,
            unique: true,
        },
        first_name: {
            varchar: Datatypes.STRING,
            allowNull: false,
        },
        last_name: {
            varchar: Datatypes.STRING,
            allowNull: false,
        },
        email: {
            varchar: Datatypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            varchar: Datatypes.STRING,
            allowNull: false,    
        },
        phone: {
            varchar: Datatypes.STRING,
            allowNull: false,
        },
        birth_date: {
            varchar: Datatypes.STRING,
            allowNull: false,
        },
        type: {
            tinyint: Datatypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        is_verified: {
            type: Datatypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        cont_export: {
            smallint: Datatypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        cont_render: {
            smallint: Datatypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        is_deleted: {
            type: Datatypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        code: {
            varchar: Datatypes.STRING,
            defaultValue: "",
        },
        subscription_id: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            defaultValue: 1
        },
        subscription_end: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        subscription_code: {
            varchar: Datatypes.STRING,
            defaultValue: "",
        },
        subscription_status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        last_single_payment_code: {
            varchar: Datatypes.STRING,
            defaultValue: "",
        }

    }
    users.belongsTo(sequelize.models.subscription, {
        foreignKey: 'subscription_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
}