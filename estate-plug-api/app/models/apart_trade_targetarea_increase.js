module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            year_month: String,
            target_area_code: Number,
            increase: Number,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const ApartTradeTargetareaIncrease = mongoose.model("apart_trade_targetarea_increase", schema);
    return ApartTradeTargetareaIncrease;
};