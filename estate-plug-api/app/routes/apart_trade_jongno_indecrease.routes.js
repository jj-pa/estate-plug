module.exports = app => {
    const apart_trade_jongno_indecrease = require("../controller/apart_trade_jongno_indecrease.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", apart_trade_jongno_indecrease.findAll);
  
    app.use('/api/apart_trade_jongno_indecrease', router);
  };