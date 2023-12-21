"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users_Riskscenarios extends Model {
    static associate(models) {
      // define association here
      Users_Riskscenarios.belongsTo(models.users);
      Users_Riskscenarios.belongsTo(models.riskscenarios);
    }
  }
  Users_Riskscenarios.init(
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
      riskscenario_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "riskscenarios",
          key: "id",
        },
      },

      status: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "users_riskscenarios",
      underscored: true,
    }
  );
  return Users_Riskscenarios;
};
