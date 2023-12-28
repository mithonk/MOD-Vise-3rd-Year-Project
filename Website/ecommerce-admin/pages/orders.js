import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { sendSms } from "./api/sendSms";

const buttonStyle = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  fontWeight: "bold",
  fontSize: "0.9rem",
  outline: "none",
  margin: "5px", // Gives some space around the button
};

const paidButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#4CAF50", // Green background color for 'Yes' state
  color: "white",
};

const notPaidButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#f44336", // Red background color for 'No' state
  color: "white",
};

const deliveredButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#4CAF50", // Green background color for 'Yes' state
  color: "white",
};

const notDeliveredButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#9E9E9E", // Grey background color for 'No' state
  color: "white",
};

const buttonHoverEffect = {
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};
export function formatPhoneNumber(phoneNumber) {
  // Remove leading '0' and add '+94'
  const formattedNumber = `+94${phoneNumber.substring(1)}`;
  return formattedNumber;
}
export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
      setIsLoading(false);
    });
  }, []);

  const togglePaidStatus = async (orderId, currentStatus) => {
    console.log("Paid", orderId, currentStatus);
    const updatedOrder = await axios.patch(`/api/orders/${orderId}`, {
      paid: !currentStatus,
    });
    // Update local state to reflect the change
    setOrders(
      orders.map((order) => (order._id === orderId ? updatedOrder.data : order))
    );
  };
  const toggleDeliveredStatus = async (
    orderId,
    currentStatus,
    phoneNumber,
    customerName
  ) => {
    if (!currentStatus) {
      const updatedOrder = await axios.patch(`/api/orders/${orderId}`, {
        delivered: true,
      });

      axios
        .post("/api/sendSms", { phoneNumber, customerName })
        .then((response) => console.log("SMS sent:", response))
        .catch((error) => console.error("Error sending SMS:", error));

      // Update local state to reflect the change
      setOrders(
        orders.map((order) =>
          order._id === orderId ? updatedOrder.data : order
        )
      );
    }
  };
  const exportToCSV = () => {
    const csvData = orders.map((order) => {
      const products = order.line_items
        .map((l) => `${l.price_data?.product_data.name} x${l.quantity}`)
        .join(", ");
      return `${order._id}, ${new Date(order.createdAt).toLocaleString()}, ${
        order.paid ? "YES" : "NO"
      }, ${order.delivered ? "Delivered" : "Not Delivered"}, ${order.name} ${
        order.email
      }, ${order.phoneNumber} ${order.address} ${order.city}, ${products}`;
    });

    const csvContent = `Order Id, Date, Time, Paid, Delivery Status, Recipient, Address, Products\n${csvData.join(
      "\n"
    )}`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "orders.csv";
    link.click();
  };

  return (
    <Layout>
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Orders</h1>
      <div style={{ textAlign: "right" }}>
        <button onClick={exportToCSV} style={exportButtonStyle}>
          Download Order Details
        </button>
      </div>

      <table
        className="basic"
        style={{
          borderCollapse: "collapse",
          width: "100%",
          border: "2px solid #333", // Table border color
        }}
      >
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Order Id</th>
            <th style={tableHeaderStyle}>Date</th>
            <th style={tableHeaderStyle}>Paid</th>
            <th style={tableHeaderStyle}>Recipient</th>
            <th style={tableHeaderStyle}>Delivery Status</th>
            <th style={tableHeaderStyle}>Products</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={4}>
                <div className="py-4">
                  <Spinner fullWidth={true} />
                </div>
              </td>
            </tr>
          )}
          {orders.length > 0 &&
            orders.map((order, index) => (
              <tr
                key={index}
                style={index % 2 === 0 ? evenRowStyle : oddRowStyle}
              >
                <td style={tableCellStyle}>{order._id}</td>
                <td style={tableCellStyle}>
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td style={tableCellStyle}>
                  <button
                    style={order.paid ? paidButtonStyle : notPaidButtonStyle}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        buttonHoverEffect.boxShadow)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = buttonStyle.boxShadow)
                    }
                    onClick={() => togglePaidStatus(order._id, order.paid)}
                  >
                    {order.paid ? "Yes" : "No"}
                  </button>
                </td>

                <td style={tableCellStyle}>
                  {`${order.name} ${order.email}`}
                  <br />
                  {`${order.phoneNumber} `}
                  <br />
                  {` ${order.address} ${order.city}`}
                  <br />
                  {order.district}
                </td>
                <td style={tableCellStyle}>
                  <button
                    style={
                      order.delivered
                        ? deliveredButtonStyle
                        : notDeliveredButtonStyle
                    }
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        buttonHoverEffect.boxShadow)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = buttonStyle.boxShadow)
                    }
                    onClick={() =>
                      toggleDeliveredStatus(
                        order._id,
                        order.delivered,
                        order.phoneNumber,
                        order.name
                      )
                    }
                  >
                    {order.delivered ? "Yes" : "No"}
                  </button>
                </td>
                <td style={tableCellStyle}>
                  {order.line_items.map((l, idx) => (
                    <div key={idx}>
                      {`${l.price_data?.product_data.name} x${l.quantity} ${
                        l?.sizes?.length ? `Sizes: ${l.sizes.join(", ")}` : ""
                      }`}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

const tableHeaderStyle = {
  backgroundColor: "#333", // Header background color
  color: "white", // Header text color
  padding: "12px",
  textAlign: "left",
};

const tableCellStyle = {
  border: "2px solid #ddd", // Cell border
  padding: "8px",
};

const evenRowStyle = {
  backgroundColor: "#f2f2f2", // Background color for even rows
};

const oddRowStyle = {
  backgroundColor: "white", // Background color for odd rows
};
const exportButtonStyle = {
  backgroundColor: "#0074D9", // Blue background color
  color: "white", // Button text color
  padding: "10px 20px",
  margin: "10px",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px", // Border radius
};
