"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Risktables extends Model {
    static associate(models) {
      // define association here
      Risktables.belongsTo(models.users);
      Risktables.belongsToMany(models.riskscenarios, {
        through: "risktables_riskscenarios",
      });
    }
  }
  Risktables.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "risktables",
      underscored: true,
    }
  );
  return Risktables;
};
