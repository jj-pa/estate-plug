module.exports = app => {
    const detached_trade_monthly_price = require("../../controller/monthly_price/detached_trade_monthly_price.controller.js");

    var router = require("express").Router();

    router.post("/", detached_trade_monthly_price.create);
    router.get("/", detached_trade_monthly_price.findAll);
    router.get("/published", detached_trade_monthly_price.findAllPublished);
    router.get("/:id", detached_trade_monthly_price.findOne);
    router.put("/:id", detached_trade_monthly_price.update);
    router.delete("/:id", detached_trade_monthly_price.delete);
    router.delete("/", detached_trade_monthly_price.deleteAll);
    app.use('/api/detached_trade_monthly_price', router);
};