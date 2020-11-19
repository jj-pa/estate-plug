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

    const DetachedContractMonthlyPrice = mongoose.model("detached_contract_monthly_price", schema);
    return DetachedContractMonthlyPrice;
};