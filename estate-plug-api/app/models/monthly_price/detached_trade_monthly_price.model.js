module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            year_month: String,
            price: Number,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const DetachedTradeMonthlyPrice = mongoose.model(
      "detached_trade_monthly_price",
      schema,
      "detached_trade_monthly_price");
    return DetachedTradeMonthlyPrice;
};
