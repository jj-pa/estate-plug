module.exports = app => {
    const officetel_contract_monthly_price = require("../../controller/monthly_price/officetel_contract_monthly_price.controller.js");

    var router = require("express").Router();

    router.post("/", officetel_contract_monthly_price.create);
    router.get("/", officetel_contract_monthly_price.findAll);
    router.get("/published", officetel_contract_monthly_price.findAllPublished);
    router.get("/:id", officetel_contract_monthly_price.findOne);
    router.put("/:id", officetel_contract_monthly_price.update);
    router.delete("/:id", officetel_contract_monthly_price.delete);
    router.delete("/", officetel_contract_monthly_price.deleteAll);
    app.use('/api/officetel_contract_monthly_price', router);
};