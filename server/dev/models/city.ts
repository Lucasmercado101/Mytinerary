import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface City extends mongoose.Document {
  country: string;
  name: string;
}

var citySchema = new Schema({
  country: String,
  name: String
});

export default mongoose.model<City>("city", citySchema);
