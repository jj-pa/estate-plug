module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            year: String,
            value: Number,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const MultiHousingTradeYearlyIncrease = mongoose.model(
      "multi_housing_trade_yearly_increase",
      schema,
      "multi_housing_trade_yearly_increase");
    return MultiHousingTradeYearlyIncrease;
};
