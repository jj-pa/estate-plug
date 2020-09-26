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

    const ApartTradeGwanakIndecrease = mongoose.model("apart_trade_gwanak_indecrease", schema, "apart_trade_gwanak_indecrease");
    return ApartTradeGwanakIndecrease;
};