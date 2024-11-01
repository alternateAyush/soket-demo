import mongoose from "mongoose";

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name."],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
    },
    website: {
      type: String,
      required: [true, "Please provide your company's website url."],
      unique:true
    },
  },
  {
    timestamps: true,
  }
);

const Person = mongoose.models.persons || mongoose.model("persons", personSchema);

export default Person;
