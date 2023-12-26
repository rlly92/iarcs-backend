const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }

  // all routes for USERS must include /users before the following /endpoints listed here:
  routes() {
    router.use(this.checkJwt);

    // to get userID from db using email sent from Frontend:
    router.get("/getUserID", this.controller.getUserID.bind(this.controller));

    return router;
  }
}

module.exports = UsersRouter;
