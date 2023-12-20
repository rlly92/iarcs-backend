const BaseController = require("./baseController");

class RisktablesriskscenariosController extends BaseController {
  constructor(model, carts, listings, users) {
    super(model);
    this.cartsModel = carts;
    this.listingsModel = listings;
    this.usersModel = users;
  }

  // THIS IS THE LOGIC FOR ADDING A LINE ITEM (LISTING WITH ADDED QTY), i.e. WHEN USER ADDS AN ITEM TO CART
  async addToCart(req, res) {
    try {
      console.log("IS ADD TO CART ROUTE WORKING?");
      const { listing_id, cart_id, added_quantity, subtotal_price } = req.body;
      console.log(req.body);

      // Check if the cart and listing are already associated
      const existingAssociation = await this.model.findOne({
        where: { listing_id, cart_id },
      });
      if (existingAssociation) {
        return res.json({
          message: "This item already exists in the cart",
          cartItem: existingAssociation,
        });
      } else {
        const newCart = await this.model.create({
          listing_id: listing_id,
          cart_id: cart_id,
          added_quantity: added_quantity,
          subtotal_price: subtotal_price,
        });
        console.log(newCart);
        return res.json(newCart);
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //
  //
  //THIS IS THE LOGIC FOR WHEN USER DELETES ITEM FROM THE CART:

  async deleteItemFromCart(req, res) {
    try {
      console.log("IS deleteItemFromCart EVEN WORKING?");

      // Get the listing ID from the request body
      const { cartListingId } = req.body;

      // Find the item to delete from the cart
      const itemToDelete = await this.model.findByPk(cartListingId);

      if (!itemToDelete) {
        return res.status(404).json({ error: true, msg: "Item not found" });
      }

      // Delete the item from the cart
      await itemToDelete.destroy();

      console.log("Item deleted:", cartListingId);

      return res.json({ success: true, msg: "Item deleted successfully" });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  // THIS IS THE LOGIC FOR WHAT HAPPENS WHEN USER EDITS QTY IN CART:
  // FE WILL "FORCE" USER TO GO INTO CART TO MAKE THE EDIT FOR  THAT SPECIFIC LINE ITEM'S QTY, SENDING A PUT REQUEST TO THE BACKEND:

  async updateItemQty(req, res) {
    try {
      console.log("IS UPDATE ITEM QTY ROUTE WORKING?");
      const { added_quantity, id, subtotal_price } = req.body;
      // Find the listing associated with the cart item
      const cartItem = await this.model.findByPk(id);
      console.log(cartItem);
      if (!cartItem) {
        return res
          .status(404)
          .json({ error: true, msg: "Cart item not found" });
      }

      // Retrieve the listing's quantity from the listings table
      const listing = await this.listingsModel.findOne({
        where: { id: cartItem.listing_id },
      });

      console.log(cartItem.listing_id);
      console.log(listing);
      if (!listing) {
        return res.status(404).json({ error: true, msg: "Listing not found" });
      }

      // Check if the added_quantity exceeds the available stock quantity
      if (added_quantity > listing.quantity) {
        return res.json({
          message: "You have exceeded the stock quantity available",
        });
      }

      // find the ID of the cart and update status:
      const updateQty = await this.model.update(
        { added_quantity, subtotal_price },
        { where: { id: id } }
      );
      console.log(updateQty);
      return res.json(updateQty);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // LOGIC FOR GETTING ALL THE LINE ITEMS IN A GIVEN SPECIFIC CART (e.g. WHEN USER ACCESSES THE 'YOUR CART' PAGE ON FE):
  async getAllLineItems(req, res) {
    try {
      console.log("IS UPDATE CART ROUTE WORKING?");
      const { cartID } = req.body;
      // find the ID of the cart and update status:
      const getItemsToDisplayOnCartPage = await this.model.findAll({
        where: { cart_id: cartID },
      });
      console.log(getItemsToDisplayOnCartPage);
      return res.json(getItemsToDisplayOnCartPage);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = RisktablesriskscenariosController;
