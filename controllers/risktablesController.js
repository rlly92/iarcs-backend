const BaseController = require("./baseController");

class RisktablesController extends BaseController {
  constructor(model, listings, users, carts_listings) {
    super(model);
    this.listingsModel = listings;
    this.cartsListingsModel = carts_listings;
    this.usersModel = users;
  }

  // THIS IS THE BACKEND LOGIC THAT WILL BE CALLED ON THE FRONTEND *AFTER* USERS HAVE SUBMIITED THEIR SIGNUP INFO
  // AND WILL BE REDIRECTED TO THE LISTINGS PAGE WITH AN ACTIVE CART ON DISPLAY IN THE NAVBAR:
  async createNewCart(req, res) {
    try {
      console.log("IS CREATE NEW CART ROUTE WORKING?");
      const { user_id } = req.body;
      // check for an active cart first:
      const findActiveCart = await this.model.findOne({
        where: {
          user_id: user_id,
          status: "active",
        },
      });
      if (!findActiveCart) {
        const newCart = await this.model.create({
          user_id: user_id,
          status: "active",
        });
        console.log(newCart);
        return res.json(newCart);
      } else {
        return res.json(findActiveCart);
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // THIS IS LOGIC FOR WHAT HAPPENS WHEN USER CLICKS ON "MY CART" ON THE NAVBAR:
  // FE WILL MAKE QUERY WITH THE USER ID TO DB FOR A CART WITH "ACTIVE" STATUS AND GET THAT CART ID:

  async checkForActiveCart(req, res) {
    try {
      console.log("IS GET ACTIVE CART ROUTE WORKING?");
      const { user_id } = req.query;
      console.log(req.query);

      const findActiveCart = await this.model.findOne({
        where: {
          user_id: user_id,
          status: "active",
        },
      });
      if (!findActiveCart) {
        console.log("Not found!");
        return res.json({ error: "active cart is not found" });
      } else {
        return res.json(findActiveCart);
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  //

  // AFTER CHECKOUT: THIS IS THE PUT REQUEST TO UPDATE THE STATUS OF THE CART:
  // NOTE TO SELF: The cartID in this instance might have to be sent via the params instead of the body, depending on FE logic.
  // TAKE NOTE: updateCartStatus only happens when USER CHECKS OUT which would then stand to reason why the lising qty is updated as shown in this async block below:
  async updateCartStatus(req, res) {
    try {
      console.log("IS UPDATE CART ROUTE WORKING?");
      const { cartID, status } = req.body;

      // find the ID of the cart and update status:
      const updateCart = await this.model.update(
        { status },
        { where: { id: cartID } }
      );
      console.log(updateCart);
      if (status === "checked out") {
        const findCartListingIDs = await this.cartsListingsModel.findAll({
          where: {
            cart_id: cartID,
          },
        });

        const updateListingPromises = findCartListingIDs.map(
          async (cartListing) => {
            const findListing = await this.listingsModel.findOne({
              where: {
                id: cartListing.listing_id,
              },
            });
            console.log(findListing.quantity);
            const deleteAddedQuantityFromListingQuantity =
              findListing.quantity - cartListing.added_quantity;
            console.log(deleteAddedQuantityFromListingQuantity);
            const updateListingQty = await this.listingsModel.update(
              {
                quantity: deleteAddedQuantityFromListingQuantity,
              },
              { where: { id: cartListing.listing_id } }
            );
            console.log(updateListingQty);
          }
        );
        await Promise.all(updateListingPromises);
      }
      return res.json(updateCart);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // WHEN USER ENTERS THE 'YOUR ORDERS MADE' PAGE ON THE FE, IT SENDS A req TO BACKEND TO SEARCH FOR CART IDs THAT BELONG TO USER
  //  AND CHECKS FOR THE CARTS THAT ARE "CHECKED OUT" IN THE STATUS COLUMN AND THEN SENDS ALL OF THOSE CART IDS TO FRONTEND:
  async checkForCheckedOutCart(req, res) {
    try {
      console.log("IS GET CHECKED OUT CART ROUTE WORKING?");
      const { user_id } = req.query;
      console.log(req.query);

      const findCheckedOutCart = await this.model.findAll({
        where: {
          user_id: user_id,
          status: "checked out",
        },
      });
      if (!findCheckedOutCart) {
        console.log("Not found!");
        return res.json({ error: "checked out cart is not found" });
      } else {
        return res.json(findCheckedOutCart);
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = RisktablesController;
