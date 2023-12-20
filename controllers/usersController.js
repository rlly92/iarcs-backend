const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Retrieve one user
  async getOneUser(req, res) {
    const { userID } = req.params;
    try {
      const user = await this.model.findByPk(userID);
      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Create new user/populate new user's details:
  async createNewUser(req, res) {
    try {
      const { email, name, isrc } = req.body;
      console.log(req.body);

      const newUser = await this.model.create({
        email: email,
        name: name,

        isrc: isrc,
      });
      console.log(newUser);
      return res.json(newUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // To check if user has given us the necessary additinal info like their email and name etc.
  async checkUserInfoExists(req, res) {
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
