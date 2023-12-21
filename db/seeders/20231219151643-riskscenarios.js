"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("riskscenarios", [
      {
        name: "Weak Access Control",
        description:
          "In the event of weak access controls, an attacker can bypass the access control checks and perform an action outside of his or her role.",
        strategy:
          "Enforce principle of least privilege. Maintain an access control table for all data assets.",

        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Unprotected Sensitive Data",
        description:
          "In the event of unprotected sensitive data, an attacker can access and exfiltrate those sensitive data in a data breach.",
        strategy:
          "Ensure that sensitive data is encrypted in transit and at rest.",

        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "SQL Injection",
        description:
          "An attacker exploits vulnerabilities in input validation to execute malicious SQL queries, potentially gaining unauthorized access to, modifying, or deleting sensitive data in the database.",
        strategy:
          "Implement parameterized queries, input validation, and least privilege principles. Regularly perform code reviews and security assessments.",

        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Cross-Site Scripting (XSS)",
        description:
          "Malicious scripts are injected into web applications, executed by users' browsers, and used to steal sensitive information, such as session cookies, from other users.",
        strategy:
          "Employ content security policies, input validation, and output encoding. Regularly update and patch web application frameworks.",

        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Man-in-the-Middle (MitM) Attack",
        description:
          "An attacker intercepts and possibly alters communication between two parties, gaining access to sensitive information, such as login credentials or financial transactions.",
        strategy: "",

        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Denial of Service (DoS) Attack",
        description:
          "Attackers overwhelm a system, network, or service with a high volume of requests, causing it to become unavailable for legitimate users.",
        strategy: "",

        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Zero-Day Exploit",
        description:
          "Attackers exploit vulnerabilities in software or hardware that are unknown to the vendor, taking advantage of the fact that no patch or fix is available.",
        strategy: "",

        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("riskscenarios", null, {});
  },
};
