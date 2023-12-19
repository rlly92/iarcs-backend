"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
      Users.hasMany(models.risktable);
    }
  }
  Users.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      isrc: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },

      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },

      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "users",
      underscored: true,
    }
  );
  return Users;
};
