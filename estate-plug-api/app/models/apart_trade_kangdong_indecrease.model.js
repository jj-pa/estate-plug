module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            year_month: String,
            area: String,
            indecrease: Number,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const ApartTradeKangdongIndecrease = mongoose.model("apart_trade_kangdong_indecrease", schema, "apart_trade_kangdong_indecrease");
    return ApartTradeKangdongIndecrease;
};