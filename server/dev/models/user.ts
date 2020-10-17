import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface User extends mongoose.Document {
  username: string;
  password: string;
  email: string;
  profileText: string;
  firstname: string;
  lastname: string;
  country: string;
}

var userSchema = new Schema({
  username: { type: String, trim: true },
  password: { type: String },
  email: { type: String, trim: true },
  profileText: { type: String, trim: true },
  firstname: { type: String, trim: true },
  lastname: { type: String, trim: true },
  country: { type: String, trim: true }
});

export default mongoose.model<User>("user", userSchema);
