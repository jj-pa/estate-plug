module.exports = app => {
    const detached_contract_monthly_price = require("../../controller/monthly_price/detached_contract_monthly_price.controller.js");

    var router = require("express").Router();

    router.post("/", detached_contract_monthly_price.create);
    router.get("/", detached_contract_monthly_price.findAll);
    router.get("/published", detached_contract_monthly_price.findAllPublished);
    router.get("/:id", detached_contract_monthly_price.findOne);
    router.put("/:id", detached_contract_monthly_price.update);
    router.delete("/:id", detached_contract_monthly_price.delete);
    router.delete("/", detached_contract_monthly_price.deleteAll);
    app.use('/api/detached_contract_monthly_price', router);
};