module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      name: String,
      description: String,
      latitude: Number,
      longitude: Number,
      postcode: Number,
      level: String,
      image: String,
      temperature: String,
      source: String,
      verified: Boolean,
      verifiedBy: String,
      operator: String,
      date: Date
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const waterCoolerPoints = mongoose.model("waterCoolerPoints", schema);
  return waterCoolerPoints;
};