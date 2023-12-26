const BaseController = require("./baseController");

class RiskscenariosController extends BaseController {
  constructor(model, users) {
    super(model);
    this.usersModel = users;
  }

  // Retrieve ALL SCENARIOS:
  async getAllScenarios(req, res) {
    console.log("IS getAllScenarios WORKING?");
    try {
      const scenarios = await this.model.findAll();
      return res.json(scenarios);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // LOGIC FOR WHEN RC EDITS THE RISK SCENARIOS DB:
  async editRiskScenario(req, res) {
    try {
      console.log("IS editRiskScenario ROUTE WORKING?");
      const { riskscenario_id, name, description, strategy } = req.body;
      const updateRiskScenario = await this.model.update(
        { name, description, strategy },
        { where: { id: riskscenario_id } }
      );
      console.log(updateRiskScenario);
      return res.json(updateRiskScenario);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // LOGIC FOR WHEN RC ADDS RISK SCENARIOS TO RISK SCENARIO DB:
  async createRiskScenario(req, res) {
    try {
      console.log("IS createRiskScenario WORKING?");
      const { name, description, strategy } = req.body;
      console.log(req.body);

      // Check if the cart and listing are already associated
      const existingAssociation = await this.model.findOne({
        where: { name: name },
      });
      if (existingAssociation) {
        return res.json({
          message:
            "This risk scenario already exists in your risk scenario database",
        });
      } else {
        const newRiskTable = await this.model.create({
          name: name,
          description: description,
          strategy: strategy,
        });
        console.log(newRiskTable);
        return res.json(newRiskTable);
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = RiskscenariosController;
