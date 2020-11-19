module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            year_month: String,
            value: Number,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const DetachedTradeMonthlyIncrease = mongoose.model(
      "detached_trade_monthly_increase",
      schema,
      "detached_trade_monthly_increase");
    return DetachedTradeMonthlyIncrease;
};
