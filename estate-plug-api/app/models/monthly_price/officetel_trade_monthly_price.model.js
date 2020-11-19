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

    const OfficetelTradeMonthlyPrice = mongoose.model(
      "officetel_trade_monthly_price",
      schema,
      "officetel_trade_monthly_price");
    return OfficetelTradeMonthlyPrice;
};
