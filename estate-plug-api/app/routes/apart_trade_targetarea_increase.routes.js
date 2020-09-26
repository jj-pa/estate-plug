module.exports = app => {
    const apart_trade_targetarea_increase = require("../controller/apart_trade_targetarea_increase.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", apart_trade_targetarea_increase.findAll);
  
    app.use('/api/apart_trade_targetarea_increase', router);
  };