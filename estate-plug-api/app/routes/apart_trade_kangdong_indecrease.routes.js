module.exports = app => {
    const apart_trade_kangdong_indecrease = require("../controller/apart_trade_kangdong_indecrease.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", apart_trade_kangdong_indecrease.findAll);
  
    app.use('/api/apart_trade_kangdong_indecrease', router);
  };