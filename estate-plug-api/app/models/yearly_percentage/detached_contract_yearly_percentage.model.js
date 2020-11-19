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

    const DetachedContractYearlyPercentage = mongoose.model("detached_contract_yearly_percentage", schema);
    return DetachedContractYearlyPercentage;
};
