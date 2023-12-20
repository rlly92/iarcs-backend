"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Risktables_Riskscenarios extends Model {
    static associate(models) {
      // define association here
      Risktables_Riskscenarios.belongsTo(models.risktables);
      Risktables_Riskscenarios.belongsTo(models.riskscenarios);
    }
  }
  Risktables_Riskscenarios.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      risktable_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "risktables",
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
      mitigation_status: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      mitigation_strategy: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "risktables_riskscenarios",
      underscored: true,
    }
  );
  return Risktables_Riskscenarios;
};
