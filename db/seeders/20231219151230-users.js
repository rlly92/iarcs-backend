"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        email: "test@gmail.com",
        name: "Test",
        isrc: false,
        project: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "andy@gmail.com",
        name: "Andy",
        isrc: false,
        project: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "boris@gmail.com",
        name: "Boris",
        isrc: false,
        project: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "carmen@gmail.com",
        name: "Carmen",
        isrc: false,
        project: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "derek@gmail.com",
        name: "Derek",
        isrc: false,
        project: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "edwin@gmail.com",
        name: "Edwin",
        isrc: false,
        project: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "riskconsultant@gmail.com",
        name: "Risk Consultant",
        isrc: true,
        project: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
