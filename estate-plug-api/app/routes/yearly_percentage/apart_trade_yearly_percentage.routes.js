module.exports = app => {
    const apart_trade_yearly_percentage = require("../../controller/yearly_percentage/apart_trade_yearly_percentage.controller.js");

    var router = require("express").Router();

    router.post("/", apart_trade_yearly_percentage.create);
    router.get("/", apart_trade_yearly_percentage.findAll);
    router.get("/published", apart_trade_yearly_percentage.findAllPublished);
    router.get("/:id", apart_trade_yearly_percentage.findOne);
    router.put("/:id", apart_trade_yearly_percentage.update);
    router.delete("/:id", apart_trade_yearly_percentage.delete);
    router.delete("/", apart_trade_yearly_percentage.deleteAll);
    app.use('/api/apart_trade_yearly_percentage', router);
};
