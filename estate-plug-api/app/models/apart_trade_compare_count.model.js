module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            year_month: String,
            increase: Number,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const ApartTradeCompareCount = mongoose.model("apart_trade_compare_count", schema, "apart_trade_compare_count");
    return ApartTradeCompareCount;
};