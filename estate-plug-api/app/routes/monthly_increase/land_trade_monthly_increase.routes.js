module.exports = app => {
    const land_trade_monthly_increase = require("../../controller/monthly_increase/land_trade_monthly_increase.controller.js");

    var router = require("express").Router();

    router.post("/", land_trade_monthly_increase.create);
    router.get("/", land_trade_monthly_increase.findAll);
    router.get("/published", land_trade_monthly_increase.findAllPublished);
    router.get("/:id", land_trade_monthly_increase.findOne);
    router.put("/:id", land_trade_monthly_increase.update);
    router.delete("/:id", land_trade_monthly_increase.delete);
    router.delete("/", land_trade_monthly_increase.deleteAll);
    app.use('/api/land_trade_monthly_increase', router);
};
