module.exports = app => {
    const apart_trade_monthly_price = require("../controller/apart_trade_monthly_price.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", apart_trade_monthly_price.create);
  
    // Retrieve all Tutorials
    router.get("/", apart_trade_monthly_price.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", apart_trade_monthly_price.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", apart_trade_monthly_price.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", apart_trade_monthly_price.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", apart_trade_monthly_price.delete);
  
    // Create a new Tutorial
    router.delete("/", apart_trade_monthly_price.deleteAll);
  
    app.use('/api/apart_trade_monthly_price', router);
  };