module.exports = app => {
    const officetel_contract_yearly_percentage = require("../../controller/yearly_percentage/officetel_contract_yearly_percentage.controller.js");

    var router = require("express").Router();

    router.post("/", officetel_contract_yearly_percentage.create);
    router.get("/", officetel_contract_yearly_percentage.findAll);
    router.get("/published", officetel_contract_yearly_percentage.findAllPublished);
    router.get("/:id", officetel_contract_yearly_percentage.findOne);
    router.put("/:id", officetel_contract_yearly_percentage.update);
    router.delete("/:id", officetel_contract_yearly_percentage.delete);
    router.delete("/", officetel_contract_yearly_percentage.deleteAll);
    app.use('/api/officetel_contract_yearly_percentage', router);
};
