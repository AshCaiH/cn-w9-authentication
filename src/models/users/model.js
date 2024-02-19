const { DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");

const User = sequelize.define(
    "User", {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { timestamps: false },
);

module.exports = User;