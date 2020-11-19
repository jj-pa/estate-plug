module.exports = app => {
    const detached_contract_monthly_increase = require("../../controller/monthly_increase/detached_contract_monthly_increase.controller.js");

    var router = require("express").Router();

    router.post("/", detached_contract_monthly_increase.create);
    router.get("/", detached_contract_monthly_increase.findAll);
    router.get("/published", detached_contract_monthly_increase.findAllPublished);
    router.get("/:id", detached_contract_monthly_increase.findOne);
    router.put("/:id", detached_contract_monthly_increase.update);
    router.delete("/:id", detached_contract_monthly_increase.delete);
    router.delete("/", detached_contract_monthly_increase.deleteAll);
    app.use('/api/detached_contract_monthly_increase', router);
};
