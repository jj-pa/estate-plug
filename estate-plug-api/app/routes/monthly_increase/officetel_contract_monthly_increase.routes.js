module.exports = app => {
    const officetel_contract_monthly_increase = require("../../controller/monthly_increase/officetel_contract_monthly_increase.controller.js");

    var router = require("express").Router();

    router.post("/", officetel_contract_monthly_increase.create);
    router.get("/", officetel_contract_monthly_increase.findAll);
    router.get("/published", officetel_contract_monthly_increase.findAllPublished);
    router.get("/:id", officetel_contract_monthly_increase.findOne);
    router.put("/:id", officetel_contract_monthly_increase.update);
    router.delete("/:id", officetel_contract_monthly_increase.delete);
    router.delete("/", officetel_contract_monthly_increase.deleteAll);
    app.use('/api/officetel_contract_monthly_increase', router);
};
