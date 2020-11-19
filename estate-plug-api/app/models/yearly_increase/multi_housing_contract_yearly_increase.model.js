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

    const MultiHousingContractYearlyIncrease = mongoose.model("multi_housing_contract_yearly_increase", schema);
    return MultiHousingContractYearlyIncrease;
};