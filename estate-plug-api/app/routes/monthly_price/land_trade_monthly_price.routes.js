module.exports = app => {
    const land_trade_monthly_price = require("../../controller/monthly_price/land_trade_monthly_price.controller.js");

    var router = require("express").Router();

    router.post("/", land_trade_monthly_price.create);
    router.get("/", land_trade_monthly_price.findAll);
    router.get("/published", land_trade_monthly_price.findAllPublished);
    router.get("/:id", land_trade_monthly_price.findOne);
    router.put("/:id", land_trade_monthly_price.update);
    router.delete("/:id", land_trade_monthly_price.delete);
    router.delete("/", land_trade_monthly_price.deleteAll);
    app.use('/api/land_trade_monthly_price', router);
};