import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface Itinerary extends mongoose.Document {
  title: string;
  author: string;
  shortDescription: string;
  content: string;
  likes: number;
  tags: [string?, string?, string?];
}

var itinerarySchema = new Schema({
  title: { type: String, trim: true },
  author: { type: String, trim: true },
  shortDescription: { type: String, trim: true },
  content: { type: String },
  likes: { type: Number, min: 0 },
  tags: [{ type: String }]
});

export default mongoose.model<Itinerary>("itinerary", itinerarySchema);
