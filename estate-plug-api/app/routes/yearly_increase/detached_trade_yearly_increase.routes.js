module.exports = app => {
    const detached_trade_yearly_increase = require("../../controller/yearly_increase/detached_trade_yearly_increase.controller.js");

    var router = require("express").Router();

    router.post("/", detached_trade_yearly_increase.create);
    router.get("/", detached_trade_yearly_increase.findAll);
    router.get("/published", detached_trade_yearly_increase.findAllPublished);
    router.get("/:id", detached_trade_yearly_increase.findOne);
    router.put("/:id", detached_trade_yearly_increase.update);
    router.delete("/:id", detached_trade_yearly_increase.delete);
    router.delete("/", detached_trade_yearly_increase.deleteAll);
    app.use('/api/detached_trade_yearly_increase', router);
};