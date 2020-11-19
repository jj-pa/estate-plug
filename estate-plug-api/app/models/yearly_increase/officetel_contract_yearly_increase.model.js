module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            year: String,
            value: Number,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const OfficetelContractYearlyIncrease = mongoose.model(
      "officetel_contract_yearly_increase",
      schema,
      "officetel_contract_yearly_increase");
    return OfficetelContractYearlyIncrease;
};
