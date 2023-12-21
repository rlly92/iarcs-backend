const express = require("express");
const router = express.Router();

class UsersriskscenariosRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }

  // all routes for USERS must include /users before the following /endpoints listed here:
  routes() {
    router.use(this.checkJwt);

    // for when PM loads their riskscenarios in their risk table:
    router.get(
      "/getPMriskscenarios/:user_id",
      this.controller.getPMRiskScenarios.bind(this.controller)
    );

    // for when RC needs to get all risk scenario tables created by PMs:
    router.get(
      "/getallriskscenariotables",
      this.controller.getAllRiskScenarioTables.bind(this.controller)
    );

    // for when PM adds scenario to risk table:
    router.post(
      "/addtorisktable",
      this.controller.addToRiskTable.bind(this.controller)
    );

    // for when PM edits the mitigation status of the risk scenario in their risk table:
    router.put("/editstatus", this.controller.editStatus.bind(this.controller));

    // for when PM deletes risk scenario from their risk table:
    router.delete(
      "/deletescenario/:UserRiskScenarioID",
      this.controller.deleteScenario.bind(this.controller)
    );

    return router;
  }
}

module.exports = UsersriskscenariosRouter;
