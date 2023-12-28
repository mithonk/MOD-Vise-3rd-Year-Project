import mongoose, { model, models, Schema } from "mongoose";

const AddressSchema = new Schema({
  userEmail: { type: String, unique: true, required: true },
  name: String,
  email: String,
  phoneNumber: String, //city
  address: String, // postalCode
  city: String, // street address
  district: String, //country
});

export const Address = models?.Address || model("Address", AddressSchema);
