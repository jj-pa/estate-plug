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

    const LandTradeYearlyIncrease = mongoose.model(
      "land_trade_yearly_increase",
      schema,
      "land_trade_yearly_increase");
    return LandTradeYearlyIncrease;
};
