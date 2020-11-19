module.exports = app => {
    const apart_contract_yearly_percentage = require("../../controller/yearly_percentage/apart_contract_yearly_percentage.controller.js");

    var router = require("express").Router();

    router.post("/", apart_contract_yearly_percentage.create);
    router.get("/", apart_contract_yearly_percentage.findAll);
    router.get("/published", apart_contract_yearly_percentage.findAllPublished);
    router.get("/:id", apart_contract_yearly_percentage.findOne);
    router.put("/:id", apart_contract_yearly_percentage.update);
    router.delete("/:id", apart_contract_yearly_percentage.delete);
    router.delete("/", apart_contract_yearly_percentage.deleteAll);
    app.use('/api/apart_contract_yearly_percentage', router);
};
