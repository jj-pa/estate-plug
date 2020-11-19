module.exports = app => {
    const officetel_trade_monthly_increase = require("../../controller/monthly_increase/officetel_trade_monthly_increase.controller.js");

    var router = require("express").Router();

    router.post("/", officetel_trade_monthly_increase.create);
    router.get("/", officetel_trade_monthly_increase.findAll);
    router.get("/published", officetel_trade_monthly_increase.findAllPublished);
    router.get("/:id", officetel_trade_monthly_increase.findOne);
    router.put("/:id", officetel_trade_monthly_increase.update);
    router.delete("/:id", officetel_trade_monthly_increase.delete);
    router.delete("/", officetel_trade_monthly_increase.deleteAll);
    app.use('/api/officetel_trade_monthly_increase', router);
};
