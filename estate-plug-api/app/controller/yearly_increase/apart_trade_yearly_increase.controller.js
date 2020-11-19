const db = require("../../models");
const ApartTradeYearlyIncrease = db.apart_trade_yearly_increase;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.year) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const apartTradeYearlyIncrease = new ApartTradeYearlyIncrease({
        year: req.body.year,
        value: req.body.value,
    });

    apartTradeYearlyIncrease
      .save(apartTradeYearlyIncrease)
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
    const year = req.query.year;
    var condition = year ? { year: { $regex: new RegExp(year), $options: "i" } } : {};

    ApartTradeYearlyIncrease.find(condition)
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

    ApartTradeYearlyIncrease.findById(id)
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

    ApartTradeYearlyIncrease.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

      ApartTradeYearlyIncrease.findByIdAndRemove(id)
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
      ApartTradeYearlyIncrease.deleteMany({})
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
      ApartTradeYearlyIncrease.find({ published: true })
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
