module.exports = app => {
    const apart_contract_monthly_increase = require("../../controller/monthly_increase/apart_contract_monthly_increase.controller.js");

    var router = require("express").Router();

    router.post("/", apart_contract_monthly_increase.create);
    router.get("/", apart_contract_monthly_increase.findAll);
    router.get("/published", apart_contract_monthly_increase.findAllPublished);
    router.get("/:id", apart_contract_monthly_increase.findOne);
    router.put("/:id", apart_contract_monthly_increase.update);
    router.delete("/:id", apart_contract_monthly_increase.delete);
    router.delete("/", apart_contract_monthly_increase.deleteAll);
    app.use('/api/apart_contract_monthly_increase', router);
};
