module.exports = app => {
    const land_trade_yearly_percentage = require("../../controller/yearly_percentage/land_trade_yearly_percentage.controller.js");

    var router = require("express").Router();

    router.post("/", land_trade_yearly_percentage.create);
    router.get("/", land_trade_yearly_percentage.findAll);
    router.get("/published", land_trade_yearly_percentage.findAllPublished);
    router.get("/:id", land_trade_yearly_percentage.findOne);
    router.put("/:id", land_trade_yearly_percentage.update);
    router.delete("/:id", land_trade_yearly_percentage.delete);
    router.delete("/", land_trade_yearly_percentage.deleteAll);
    app.use('/api/land_trade_yearly_percentage', router);
};
