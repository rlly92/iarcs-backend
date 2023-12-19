const express = require("express");
const router = express.Router();

class RisktableriskscenarioRouter {
  constructor(controller, checkJwt) {
    // checkJwt; <----------add back next to controller in constructor later
    this.controller = controller;
    this.checkJwt = checkJwt;
  }

  routes() {
    router.use(this.checkJwt);
    router.post("/addtocart", this.controller.addToCart.bind(this.controller));

    router.put(
      "/updateitemqty",
      this.controller.updateItemQty.bind(this.controller)
    );

    router.post(
      "/getalllineitems",
      this.controller.getAllLineItems.bind(this.controller)
    );
    router.delete(
      "/deleteitemfromcart",
      this.controller.deleteItemFromCart.bind(this.controller)
    );

    // router.get(
    //   "/getlisting/:listing_id",
    //   this.controller.getOneListing.bind(this.controller)
    // );

    return router;
  }
}

module.exports = RisktableriskscenarioRouter;
