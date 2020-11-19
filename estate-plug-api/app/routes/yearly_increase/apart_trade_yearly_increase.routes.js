module.exports = app => {
    const apart_trade_yearly_increase = require("../../controller/yearly_increase/apart_trade_yearly_increase.controller.js");

    var router = require("express").Router();

    router.post("/", apart_trade_yearly_increase.create);
    router.get("/", apart_trade_yearly_increase.findAll);
    router.get("/published", apart_trade_yearly_increase.findAllPublished);
    router.get("/:id", apart_trade_yearly_increase.findOne);
    router.put("/:id", apart_trade_yearly_increase.update);
    router.delete("/:id", apart_trade_yearly_increase.delete);
    router.delete("/", apart_trade_yearly_increase.deleteAll);
    app.use('/api/apart_trade_yearly_increase', router);
};
