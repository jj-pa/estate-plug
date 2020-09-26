const db = require("../models");
const ApartTradeGwanakIndecrease = db.apart_trade_gwanak_indecrease;

exports.findAll = (req, res) => {
    const year_month = req.query.year_month;
    var condition = year_month ? { year_month: { $regex: new RegExp(year_month), $options: "i" } } : {};
  
    ApartTradeGwanakIndecrease.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving apart_trade_gwanak_indecrease."
        });
      });
  };
