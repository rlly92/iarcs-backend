"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        email: "test@gmail.com",
        name: "Test",
        isrc: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "andy@gmail.com",
        name: "Andy",
        isrc: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "Boris@gmail.com",
        name: "Boris",
        isrc: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "Carmen@gmail.com",
        name: "Carmen",
        isrc: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "Derek@gmail.com",
        name: "Derek",
        isrc: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "Edwin@gmail.com",
        name: "Edwin",
        isrc: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "RiskConsultant@gmail.com",
        name: "Risk Consultant",
        isrc: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
