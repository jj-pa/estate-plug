module.exports = app => {
    const officetel_trade_yearly_percentage = require("../../controller/yearly_percentage/officetel_trade_yearly_percentage.controller.js");

    var router = require("express").Router();

    router.post("/", officetel_trade_yearly_percentage.create);
    router.get("/", officetel_trade_yearly_percentage.findAll);
    router.get("/published", officetel_trade_yearly_percentage.findAllPublished);
    router.get("/:id", officetel_trade_yearly_percentage.findOne);
    router.put("/:id", officetel_trade_yearly_percentage.update);
    router.delete("/:id", officetel_trade_yearly_percentage.delete);
    router.delete("/", officetel_trade_yearly_percentage.deleteAll);
    app.use('/api/officetel_trade_yearly_percentage', router);
};
