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

    const ApartContractMonthlyIncrease = mongoose.model(
      "apart_contract_monthly_increase",
      schema,
      "apart_contract_monthly_increase");
    return ApartContractMonthlyIncrease;
};
