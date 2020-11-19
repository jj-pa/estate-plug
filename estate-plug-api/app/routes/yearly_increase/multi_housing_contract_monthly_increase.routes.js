module.exports = app => {
    const multi_housing_contract_yearly_increase = require("../../controller/yearly_increase/multi_housing_contract_yearly_increase.controller.js");

    var router = require("express").Router();

    router.post("/", multi_housing_contract_yearly_increase.create);
    router.get("/", multi_housing_contract_yearly_increase.findAll);
    router.get("/published", multi_housing_contract_yearly_increase.findAllPublished);
    router.get("/:id", multi_housing_contract_yearly_increase.findOne);
    router.put("/:id", multi_housing_contract_yearly_increase.update);
    router.delete("/:id", multi_housing_contract_yearly_increase.delete);
    router.delete("/", multi_housing_contract_yearly_increase.deleteAll);
    app.use('/api/multi_housing_contract_yearly_increase', router);
};
