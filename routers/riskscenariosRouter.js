const express = require("express");
const router = express.Router();

class RiskscenariosRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }

  routes() {
    router.use(this.checkJwt);
    router.get("/", this.controller.getAllScenarios.bind(this.controller));
    // router.post(
    //   "/createnewcategory",
    //   this.controller.createNewCategory.bind(this.controller)
    // );

    // COMMENT: routes with /:params_id will always be the last. order matters since anything after /:params routes will assume that thing is a param.

    return router;
  }
}

module.exports = RiskscenariosRouter;
