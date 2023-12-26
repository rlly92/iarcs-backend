const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(model) {
    super(model);
  }

  //Get UserID to store in FE's local storage:
  async getUserID(req, res) {
    console.log("IS getUserID WORKING?");
    try {
      const { email } = req.query;
      console.log(req.query);

      const findUserInfo = await this.model.findOne({
        where: { email: email },
      });
      if (findUserInfo === null) {
        console.log("Not found!");
        return res.json({ error: "user info is not found" });
      } else {
        return res.json(findUserInfo);
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = UsersController;
