const db = require("../models");
const ApartTradeMonthlyPrice = db.apart_trade_monthly_price;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.year_month) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    const apartTradeMonthlyPrice = new ApartTradeMonthlyPrice({
        year_month: req.body.year_month,
        price: req.body.price,
    });
  
    apartTradeMonthlyPrice
      .save(apartTradeMonthlyPrice)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
};

exports.findAll = (req, res) => {
    const year_month = req.query.year_month;
    var condition = year_month ? { year_month: { $regex: new RegExp(year_month), $options: "i" } } : {};
  
    ApartTradeMonthlyPrice.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

exports.findOne = (req, res) => {
const id = req.params.id;

ApartTradeMonthlyPrice.findById(id)
    .then(data => {
    if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
    else res.send(data);
    })
    .catch(err => {
    res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    ApartTradeMonthlyPrice.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else res.send({ message: "Tutorial was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    ApartTradeMonthlyPrice.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    ApartTradeMonthlyPrice.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Tutorials were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

  exports.findAllPublished = (req, res) => {
    ApartTradeMonthlyPrice.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };