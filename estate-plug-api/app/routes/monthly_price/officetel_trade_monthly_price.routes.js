module.exports = app => {
    const officetel_trade_monthly_price = require("../../controller/monthly_price/officetel_trade_monthly_price.controller.js");

    var router = require("express").Router();

    router.post("/", officetel_trade_monthly_price.create);
    router.get("/", officetel_trade_monthly_price.findAll);
    router.get("/published", officetel_trade_monthly_price.findAllPublished);
    router.get("/:id", officetel_trade_monthly_price.findOne);
    router.put("/:id", officetel_trade_monthly_price.update);
    router.delete("/:id", officetel_trade_monthly_price.delete);
    router.delete("/", officetel_trade_monthly_price.deleteAll);
    app.use('/api/officetel_trade_monthly_price', router);
};