import axios from "axios";
import { mongooseConnect } from "@/lib/mongoose";
import moment from "moment";

// Function to format the phone number
const formatPhoneNumber = (phoneNumber) => {
  return `+94${phoneNumber.substring(1)}`;
};

// Function to send SMS
const sendSms = async (phoneNumber, customerName) => {
  const apiUrl = "https://sms.send.lk/api/v3/sms/send";
  const accessToken = "1521|mgm4L80Okdgvvb8pCQSuaL0AMoih8EPjt5q9bkoO"; // Ideally, use environment variables
  const senderId = "SendTest";
  const currentDateTime = moment().format("MMMM Do YYYY, h:mm a"); // e.g., "November 19th 2023, 4:30 pm"
  const message = `🌟 Hello ${customerName}, your order from ModVise Shoe Store 🥿👞👡 has been delivered. It was delivered on ${currentDateTime} from Maggona,Kalutara Store. Thank you for shopping with us! 🌟 - ModVise Shoes 👟👠👢`;
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

  const payload = {
    recipient: formattedPhoneNumber,
    sender_id: senderId,
    message,
  };

  try {
    const response = await axios.post(apiUrl, JSON.stringify(payload), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log("SMS sent successfully:", response.data);

    return response.data; // Return the response data
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error; // Throw the error to be handled by the caller
  }
};

// API endpoint
export default async function handle(req, res) {
  await mongooseConnect();

  if (req.method === "POST") {
    const { phoneNumber, customerName } = req.body;

    try {
      const smsResponse = await sendSms(phoneNumber, customerName);
      res.status(200).json(smsResponse);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to send SMS", error: error.message });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
