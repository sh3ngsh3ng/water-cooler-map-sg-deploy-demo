module.exports = mongoose => {
  const schema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      description: { type: String },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      postcode: { type: String },
      level: { type: String },
      image: { type: String },
      temperature: { type: String },
      source: { type: String },
      verified: { type: Boolean, default: false },
      verifiedBy: { type: String },
      operator: { type: String },
      date: { type: Date, default: Date.now }
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