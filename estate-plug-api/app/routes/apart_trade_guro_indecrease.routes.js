module.exports = app => {
    const apart_trade_guro_indecrease = require("../controller/apart_trade_guro_indecrease.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", apart_trade_guro_indecrease.findAll);
  
    app.use('/api/apart_trade_guro_indecrease', router);
  };
