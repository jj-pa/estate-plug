module.exports = app => {
    const multi_housing_contract_monthly_price = require("../../controller/monthly_price/multi_housing_contract_monthly_price.controller.js");

    var router = require("express").Router();

    router.post("/", multi_housing_contract_monthly_price.create);
    router.get("/", multi_housing_contract_monthly_price.findAll);
    router.get("/published", multi_housing_contract_monthly_price.findAllPublished);
    router.get("/:id", multi_housing_contract_monthly_price.findOne);
    router.put("/:id", multi_housing_contract_monthly_price.update);
    router.delete("/:id", multi_housing_contract_monthly_price.delete);
    router.delete("/", multi_housing_contract_monthly_price.deleteAll);
    app.use('/api/multi_housing_contract_monthly_price', router);
};