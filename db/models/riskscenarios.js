"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Riskscenarios extends Model {
    static associate(models) {
      // define association here
      Riskscenarios.belongsToMany(models.risktables, {
        through: "risktables_riskscenarios",
      });
    }
  }
  Riskscenarios.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      strategy: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "riskscenarios",
      underscored: true,
    }
  );
  return Riskscenarios;
};
