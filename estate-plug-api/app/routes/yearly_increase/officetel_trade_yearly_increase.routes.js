module.exports = app => {
    const officetel_trade_yearly_increase = require("../../controller/yearly_increase/officetel_trade_yearly_increase.controller.js");

    var router = require("express").Router();

    router.post("/", officetel_trade_yearly_increase.create);
    router.get("/", officetel_trade_yearly_increase.findAll);
    router.get("/published", officetel_trade_yearly_increase.findAllPublished);
    router.get("/:id", officetel_trade_yearly_increase.findOne);
    router.put("/:id", officetel_trade_yearly_increase.update);
    router.delete("/:id", officetel_trade_yearly_increase.delete);
    router.delete("/", officetel_trade_yearly_increase.deleteAll);
    app.use('/api/officetel_trade_yearly_increase', router);
};
