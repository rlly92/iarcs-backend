const express = require("express");
const router = express.Router();

class RiskscenariosRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }

  routes() {
    router.use(this.checkJwt);

    // for when RC/PM needs to get all scenarios for loading in respective home page:
    router.get("/", this.controller.getAllScenarios.bind(this.controller));

    router.post(
      "/addriskscenario",
      this.controller.createRiskScenario.bind(this.controller)
    );

    // for when RC edits the risk scenarios in the risk scenario db:
    router.put(
      "/editriskscenario",
      this.controller.editRiskScenario.bind(this.controller)
    );

    return router;
  }
}

module.exports = RiskscenariosRouter;
