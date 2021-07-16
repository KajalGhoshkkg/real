const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const publishPropertySchema = new mongoose.Schema({
  propertyId: {
    type: ObjectId,
    ref: "propertytables",
  },
});

const publishPropertyModel = mongoose.model("publishpropertytables", publishPropertySchema);
module.exports = publishPropertyModel;
