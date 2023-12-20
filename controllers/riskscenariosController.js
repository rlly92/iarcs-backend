const BaseController = require("./baseController");
const { Op } = require("sequelize");

class RiskscenariosController extends BaseController {
  constructor(model, users, riskscenarios, risktable) {
    super(model);
    this.usersModel = users;
    this.riskscenariosModel = riskscenarios;
    this.risktableModel = risktable;
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

  // Retrieve ONE SPECIFIC Listing using PARAMS:
  // async getOneListing(req, res) {
  //   console.log("IS getOneListing WORKING?");
  //   try {
  //     const { listing_id } = req.params;
  //     const listing = await this.model.findOne({
  //       where: { id: listing_id },
  //     });
  //     return res.json(listing);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }

  // Retrieve ONE SPECIFIC LISTING using BODY:
  // async getOneListingUsingBody(req, res) {
  //   console.log("IS getOneListingUsingBody WORKING?");
  //   try {
  //     const { listing_id } = req.body;
  //     const listing = await this.model.findOne({
  //       where: { id: listing_id },
  //     });
  //     return res.json(listing);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }

  // create NEW Listings with category association:
  async createListing(req, res) {
    console.log("is CreateListing even working?");
    try {
      const {
        user_id,
        title,
        price,
        description,
        shipping_detail,
        sku_number,
        quantity,
        selectedCategoryIDs,
        photo_url_1,
        photo_url_2,
        photo_url_3,
      } = req.body;

      const newListing = await this.model.create({
        user_id: user_id,
        title: title,
        price: price,
        description: description,
        shipping_detail: shipping_detail,
        sku_number: sku_number,
        quantity: quantity,
        photo_url_1: photo_url_1,
        photo_url_2: photo_url_2,
        photo_url_3: photo_url_3,
      });
      console.log(this.categoriesModel);
      // // retrieve the selected categories by using the selectedCategoryIds from the JSON body
      const selectedCategories = await this.categoriesModel.findAll({
        where: {
          id: {
            [Op.or]: selectedCategoryIDs,
          },
          // Op stands for Operator, .or means or (|| like in if conditions)
        },
      });

      console.log(
        "selectedCategories from selectedCategoryIDs:",
        selectedCategories
      );
      console.log("selectedCategoryIDs:", selectedCategoryIDs);

      // ASSOCIATE NEW LISTING WITH SELECTED CATEGORIES:
      //Promise.all and .map allows for the extraction of categories (from array SelectedCategories) and the subsequent association of those categories with listings to be performed at the same time:
      await Promise.all(
        selectedCategories.map(async (category) => {
          await newListing.addCategory(category);
        })
      );

      console.log(newListing);
      return res.json(newListing);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // DELETE Listing: GET THE CORRECT LISTING ID FIRST THEN REMOVE ASSOCIATION TO CATEGORY THEN DELETE LISTING:
  async deleteListing(req, res) {
    //  METHOD B:
    console.log("IS deleteListing EVEN WORKING?");
    try {
      // Get listing ID from params
      const { listing_id } = req.params;
      const listingToDelete = await this.model.findByPk(listing_id, {
        include: this.categoriesModel,
      });

      if (!listingToDelete) {
        return res.status(404).json({ error: true, msg: "Listing not found" });
      }

      // Remove the associations between listing and categories
      const removeAssociation = await listingToDelete.setCategories([]);
      console.log("Association has been removed:", removeAssociation);
      // Delete the listing
      const deleteListing = await this.model.destroy({
        where: { id: listing_id },
      });

      console.log("Listing deleted:", listing_id, deleteListing);

      return res.json({ success: true, msg: "Listing deleted successfully" });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // RETREIVE ALL THE LISTINGS MADE BY A SPECFIC PARTICULAR USER:
  async getAllListingsByThisUser(req, res) {
    try {
      console.log("IS getAllListingsByThisUser ROUTE WORKING?");
      const { userID } = req.body;

      const getAllListingsMadeByThisUser = await this.model.findAll({
        where: { user_id: userID },
      });
      console.log(getAllListingsMadeByThisUser);
      return res.json(getAllListingsMadeByThisUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = RiskscenariosController;
