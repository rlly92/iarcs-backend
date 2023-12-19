"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Risktable_Riskscenario extends Model {
    static associate(models) {
      // define association here
      Risktable_Riskscenario.belongsTo(models.risktable);
      Risktable_Riskscenario.belongsTo(models.riskscenario);
    }
  }
  Risktable_Riskscenario.init(
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
          model: "risktable",
          key: "id",
        },
      },
      riskscenario_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "riskscenario",
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
      modelName: "risktable_riskscenario",
      underscored: true,
    }
  );
  return Risktable_Riskscenario;
};
