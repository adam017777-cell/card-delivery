import mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
}, { timestamps: true });

type Card = mongoose.InferSchemaType<typeof cardSchema>;

module.exports = mongoose.model<Card>("Card", cardSchema);

