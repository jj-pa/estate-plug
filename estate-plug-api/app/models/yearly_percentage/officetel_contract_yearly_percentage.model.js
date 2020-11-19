module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            year: String,
            area_cd: String,
            percent: Number,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const OfficetelContractYearlyPercentage = mongoose.model(
      "officetel_contract_yearly_percentage",
      schema,
      "officetel_contract_yearly_percentage");
    return OfficetelContractYearlyPercentage;
};
