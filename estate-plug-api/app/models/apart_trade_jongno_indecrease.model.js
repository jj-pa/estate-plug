module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            area: String,
            year_month: String,
            indecrease: Number,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const ApartTradeJongnoIndecrease = mongoose.model("apart_trade_jongno_indecrease", schema, "apart_trade_jongno_indecrease");
    return ApartTradeJongnoIndecrease;
};