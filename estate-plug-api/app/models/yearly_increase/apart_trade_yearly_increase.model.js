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

    const ApartTradeYearlyIncrease = mongoose.model(
      "apart_trade_yearly_increase",
      schema,
      "apart_trade_yearly_increase");
    return ApartTradeYearlyIncrease;
};
