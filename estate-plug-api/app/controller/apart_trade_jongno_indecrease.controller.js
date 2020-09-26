const db = require("../models");
const ApartTradeJongnoIndecrease = db.apart_trade_jongno_indecrease;

exports.findAll = (req, res) => {
    const year_month = req.query.year_month;
    var condition = year_month ? { year_month: { $regex: new RegExp(year_month), $options: "i" } } : {};
  
    ApartTradeJongnoIndecrease.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving apart_trade_jongno_indecrease."
        });
      });
  };