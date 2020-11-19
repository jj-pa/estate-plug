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

    const DetachedContractYearlyIncrease = mongoose.model(
      "detached_contract_yearly_increase",
      schema,
      "detached_contract_yearly_increase");
    return DetachedContractYearlyIncrease;
};
