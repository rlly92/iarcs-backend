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

    router.get("/", this.controller.getAll.bind(this.controller));

    router.post(
      "/signupinfo",
      this.controller.createNewUser.bind(this.controller)
    );
    // to get userinfo to check if user info exists on db:
    router.get(
      "/checkuserinfo",
      this.controller.checkUserInfoExists.bind(this.controller)
    );
    // router.get("/:userID", this.controller.getOneUser.bind(this.controller));
    return router;
  }
}

module.exports = UsersRouter;
