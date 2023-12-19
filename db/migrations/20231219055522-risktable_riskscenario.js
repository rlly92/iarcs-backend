"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("risktable_riskscenario", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      risktable_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "risktable",
          key: "id",
        },
      },
      riskscenario_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "riskscenario",
          key: "id",
        },
      },

      mitigation_status: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      mitigation_strategy: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("risktable_riskscenario");
  },
};
