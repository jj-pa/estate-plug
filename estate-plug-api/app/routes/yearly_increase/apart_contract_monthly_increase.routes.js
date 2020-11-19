module.exports = app => {
    const apart_contract_yearly_increase = require("../../controller/yearly_increase/apart_contract_yearly_increase.controller.js");

    var router = require("express").Router();

    router.post("/", apart_contract_yearly_increase.create);
    router.get("/", apart_contract_yearly_increase.findAll);
    router.get("/published", apart_contract_yearly_increase.findAllPublished);
    router.get("/:id", apart_contract_yearly_increase.findOne);
    router.put("/:id", apart_contract_yearly_increase.update);
    router.delete("/:id", apart_contract_yearly_increase.delete);
    router.delete("/", apart_contract_yearly_increase.deleteAll);
    app.use('/api/apart_contract_yearly_increase', router);
};
