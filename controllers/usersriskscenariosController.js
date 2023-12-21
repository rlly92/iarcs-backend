const BaseController = require("./baseController");

class UsersriskscenariosController extends BaseController {
  constructor(model, users, riskscenarios) {
    super(model);
    this.usersModel = users;
    this.riskscenariosModel = riskscenarios;
  }

  // LOGIC FOR PM ADDING A RISK SCENARIO TO THEIR RISK TABLE:
  async addToRiskTable(req, res) {
    try {
      console.log("IS addToRiskTable WORKING?");
      const { user_id, riskscenario_id } = req.body;
      console.log(req.body);

      // Check if the cart and listing are already associated
      const existingAssociation = await this.model.findOne({
        where: { user_id, riskscenario_id },
      });
      if (existingAssociation) {
        return res.json({
          message: "This risk scenario already exists in your risk table",
        });
      } else {
        const newRiskTable = await this.model.create({
          user_id: user_id,
          riskscenario_id: riskscenario_id,
          status: null,
        });
        console.log(newRiskTable);
        return res.json(newRiskTable);
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // LOGIC FOR GETTING ALL THE RISK SCENARIOS IN A PM'S RISK TABLE:
  async getPMRiskScenarios(req, res) {
    try {
      console.log("IS getPMRiskScenarios?");
      const { user_id } = req.params;
      // find all of the corresponding riskscenario_id(s) of user:
      const getAssociatedIDs = await this.model.findAll({
        where: { user_id: user_id },
      });
      console.log(getAssociatedIDs);
      // Extract riskscenario_id(s):
      const riskScenarioIDs = getAssociatedIDs.map(
        (record) => record.riskscenario_id
      );

      //   Use extracted riskscenario_id(s) to get corresponding riskscenarios:
      const getAssociatedRiskScenariosData =
        await this.riskscenariosModel.findAll({
          where: { id: riskScenarioIDs },
        });

      // Modify the data to include the "status" key-value pair:
      const modifiedRiskScenariosData = getAssociatedRiskScenariosData.map(
        (scenario) => {
          // Find the corresponding user_riskscenarios record:
          const associatedRecord = getAssociatedIDs.find(
            (record) => record.riskscenario_id === scenario.id
          );

          // Include the "status" key-value pair in the scenario object:
          return {
            ...scenario.dataValues,
            status: associatedRecord.status,
            user_riskscenario_id: associatedRecord.id,
          };
        }
      );

      console.log(modifiedRiskScenariosData);
      return res.json(modifiedRiskScenariosData);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // LOGIC FOR WHEN PM EDITS THE MITIGATION STATUS OF THEIR RISK SCENARIO IN THEIR TABLE:
  async editStatus(req, res) {
    try {
      console.log("IS editStatus ROUTE WORKING?");
      const { status, UserRiskScenarioID } = req.body;
      const updateStatus = await this.model.update(
        { status },
        { where: { id: UserRiskScenarioID } }
      );
      console.log(updateStatus);
      return res.json(updateStatus);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //THIS IS THE LOGIC FOR WHEN PM DELETES RISK SCENARIO FROM THEIR RISK TABLE:

  async deleteScenario(req, res) {
    try {
      console.log("IS deleteRiskScenario EVEN WORKING?");

      // Get the user_riskscenario_id from params
      const { UserRiskScenarioID } = req.params;

      // Find the item to delete from the cart
      const riskScenarioToDelete = await this.model.findByPk(
        UserRiskScenarioID
      );
      console.log(riskScenarioToDelete);
      if (!riskScenarioToDelete) {
        return res
          .status(404)
          .json({ error: true, msg: "User_riskscenario not found" });
      }

      // Delete the item from the cart
      await riskScenarioToDelete.destroy();

      console.log("User_Riskscenario deleted:", UserRiskScenarioID);

      return res.json({
        success: true,
        msg: "User_RiskScenario deleted successfully",
      });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = UsersriskscenariosController;
