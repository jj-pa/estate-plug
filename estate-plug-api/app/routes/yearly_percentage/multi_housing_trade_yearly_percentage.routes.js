module.exports = app => {
    const multi_housing_trade_yearly_percentage = require("../../controller/yearly_percentage/multi_housing_trade_yearly_percentage.controller.js");

    var router = require("express").Router();

    router.post("/", multi_housing_trade_yearly_percentage.create);
    router.get("/", multi_housing_trade_yearly_percentage.findAll);
    router.get("/published", multi_housing_trade_yearly_percentage.findAllPublished);
    router.get("/:id", multi_housing_trade_yearly_percentage.findOne);
    router.put("/:id", multi_housing_trade_yearly_percentage.update);
    router.delete("/:id", multi_housing_trade_yearly_percentage.delete);
    router.delete("/", multi_housing_trade_yearly_percentage.deleteAll);
    app.use('/api/multi_housing_trade_yearly_percentage', router);
};
