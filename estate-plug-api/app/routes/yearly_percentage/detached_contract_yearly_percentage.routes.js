module.exports = app => {
    const detached_contract_yearly_percentage = require("../../controller/yearly_percentage/detached_contract_yearly_percentage.controller.js");

    var router = require("express").Router();

    router.post("/", detached_contract_yearly_percentage.create);
    router.get("/", detached_contract_yearly_percentage.findAll);
    router.get("/published", detached_contract_yearly_percentage.findAllPublished);
    router.get("/:id", detached_contract_yearly_percentage.findOne);
    router.put("/:id", detached_contract_yearly_percentage.update);
    router.delete("/:id", detached_contract_yearly_percentage.delete);
    router.delete("/", detached_contract_yearly_percentage.deleteAll);
    app.use('/api/detached_contract_yearly_percentage', router);
};
