import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { _id } from "@next-auth/mongodb-adapter";

export default async function handler(req, res) {
  await mongooseConnect();
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case "GET":
      try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    case "PATCH":
      try {
        const order = await Order.findByIdAndUpdate(
          _id,
          { $set: body },
          { new: true }
        );
        res.status(200).json(order);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    // Add other methods as needed

    default:
      res.setHeader("Allow", ["GET", "PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
