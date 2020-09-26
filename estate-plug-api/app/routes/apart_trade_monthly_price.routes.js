module.exports = app => {
    const apart_trade_monthly_price = require("../controller/apart_trade_monthly_price.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", apart_trade_monthly_price.create);
  
    router.get("/", apart_trade_monthly_price.findAll);
  
    router.get("/published", apart_trade_monthly_price.findAllPublished);
  
    router.get("/:id", apart_trade_monthly_price.findOne);
  
    router.put("/:id", apart_trade_monthly_price.update);
  
    router.delete("/:id", apart_trade_monthly_price.delete);
  
    router.delete("/", apart_trade_monthly_price.deleteAll);
  
    app.use('/api/apart_trade_monthly_price', router);
  };