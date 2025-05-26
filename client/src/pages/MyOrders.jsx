import React, { useEffect, useState } from "react";
import { dummyOrders } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext()

  const fetchMyOrders = async () => {
  try {
    const { data } = await axios.get("/api/order/user"); 
    if (data.success) {
      console.log(data);
      setMyOrders(data.orders);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="mt-16 pb-16 px-4">
      <div className="flex flex-col items-start mb-6">
        <p className="text-2xl font-semibold uppercase">All Products</p>
        <div className="w-16 h-1 bg-primary rounded-full mt-1" />
      </div>

      {myOrders.map((order, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-xl my-10 p-4 max-w-4xl shadow-md bg-white space-y-4  text-gray-400"
        >
          {/* Order Header */}
          <div className="flex flex-wrap justify-between">
            <span><strong>Order ID :</strong> {order._id}</span>
            <span><strong>Paymen t:</strong> {order.paymentType}</span>
            <span><strong>Total Amount :</strong> {currency}{order.amount}</span>
          </div>

          {/* Items */}
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 px-4 border-b border-gray-300"
              >
                <img
                  src={item.product.image[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
                  
                  {/* Left: Name + Category */}
                  <div>
                    <h2 className="font-semibold text-lg text-black">{item.product.name}</h2>
                    <p className="text-sm ">
                      Category: {item.product.category}
                    </p>
                  </div>

                  {/* Middle: Quantity + Date + Status */}
                  <div className="text-sm space-y-1">
                    <p><strong>Quantity:</strong> {item.quantity || "1"}</p>
                    <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                  </div>

                  {/* Right: Amount */}
                  <div className="text-lg font-semibold text-right text-primary">
                    Amount: {currency}{item.product.offerPrice * item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
