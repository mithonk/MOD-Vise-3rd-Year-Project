import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    line_items: Object,
    name: String,
    email: String,
    phoneNumber: String, //city
    address: String, // postalCode
    city: String, // street address
    district: String, //country
    paid: Boolean,
    delivered: Boolean,
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);
