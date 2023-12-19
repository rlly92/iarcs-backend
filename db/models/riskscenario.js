"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Riskscenario extends Model {
    static associate(models) {
      // define association here
      Riskscenario.belongsToMany(models.risktable, {
        through: "risktable_riskscenario",
      });
    }
  }
  Riskscenario.init(
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
      modelName: "riskscenario",
      underscored: true,
    }
  );
  return Riskscenario;
};
