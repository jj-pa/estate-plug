module.exports = app => {
    const apart_trade_compare_count = require("../controller/apart_trade_compare_count.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", apart_trade_compare_count.findAll);
  
    app.use('/api/apart_trade_compare_count', router);
  };