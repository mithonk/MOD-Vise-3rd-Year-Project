// pages/api/orders/[id].js
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  await mongooseConnect();
  const {
    method,
    query: { id },
    body,
  } = req;

  if (!id) {
    return res.status(400).json({ message: "Order ID is required" });
  }

  switch (method) {
    case "PATCH":
      try {
        const order = await Order.findByIdAndUpdate(
          id, // Use the id from the URL
          { $set: body },
          { new: true }
        );
        if (!order) {
          return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    // Handle other methods if needed

    default:
      res.setHeader("Allow", ["PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
