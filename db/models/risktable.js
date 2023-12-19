"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Risktable extends Model {
    static associate(models) {
      // define association here
      Risktable.belongsTo(models.users);
      Risktable.belongsToMany(models.riskscenario, {
        through: "risktable_riskscenario",
      });
    }
  }
  Risktable.init(
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
      modelName: "risktable",
      underscored: true,
    }
  );
  return Risktable;
};
