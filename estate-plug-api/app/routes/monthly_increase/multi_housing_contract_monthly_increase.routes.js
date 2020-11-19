module.exports = app => {
    const multi_housing_contract_monthly_increase = require("../../controller/monthly_increase/multi_housing_contract_monthly_increase.controller.js");

    var router = require("express").Router();

    router.post("/", multi_housing_contract_monthly_increase.create);
    router.get("/", multi_housing_contract_monthly_increase.findAll);
    router.get("/published", multi_housing_contract_monthly_increase.findAllPublished);
    router.get("/:id", multi_housing_contract_monthly_increase.findOne);
    router.put("/:id", multi_housing_contract_monthly_increase.update);
    router.delete("/:id", multi_housing_contract_monthly_increase.delete);
    router.delete("/", multi_housing_contract_monthly_increase.deleteAll);
    app.use('/api/multi_housing_contract_monthly_increase', router);
};
