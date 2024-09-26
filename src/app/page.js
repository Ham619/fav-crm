"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faUsers,
  faRocket,
  faWrench,
  faMagnifyingGlass,
  faArrowUp,
  faFilter,
  faUser,
  faPhone,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedOrders,setSelectedOrders] = useState(null);

  // Fetch customers data
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/customers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }

      const result = await response.json();
      console.log("Customer data:", result); // Log the response for debugging

      // Check if 'data' is an array, if not, convert it to an array
      const customerArray = Array.isArray(result.data)
        ? result.data
        : [result.data];

      // Set the customers state with the array
      setCustomers(customerArray);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  };

  useEffect(() => {
    fetchCustomers(); // Fetch customers on component mount
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Main Layout with Sidebar, Top Bar, Main Content, and Right Sidebar */}
      <div className="flex flex-grow h-full">
        {/* Sidebar with Icons */}
        <div className="bg-white w-16 pt-24 p-4 flex flex-col items-center space-y-6 rounded-lg mt-2 mb-2 ml-3 shadow-lg">
          <SidebarIcon icon={faHome} />
          <SidebarIcon icon={faEnvelope} />
          <SidebarIcon icon={faUsers} />
          <SidebarIcon icon={faRocket} />
          <SidebarIcon icon={faWrench} />
        </div>

        {/* Content Section */}
        <div className="flex flex-grow flex-col">
          {/* Top Bar with Customers and Profile Overview */}
          <div className="flex justify-between items-center p-1 mt-4 ml-2">
            <div>
              <h1 className="text-2xl font-bold">Customers</h1>
              <p className="text-green-800 text-sm">Profile Overview</p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-grow space-x-4 p-2 px-4">
            {/* Left Sidebar */}
            <div className="bg-white w-1/5 p-6 rounded-lg shadow-lg">
              {/* Search Conversation Card */}
              <div className="bg-gray-100 p-4 rounded-sm shadow-md mb-6">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-2 pl-10 pr-4 border rounded-md"
                    placeholder="Search Conversation..."
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <FontAwesomeIcon
                      className="text-gray-500"
                      icon={faMagnifyingGlass}
                    />
                  </div>
                </div>
              </div>

              {/* Dropdown and Icons Section Card */}
              <div className=" p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <select
                    className="text-gray-700 border-gray-400 px-2 py-1 focus:outline-none rounded-md"
                    defaultValue="Open"
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>

                  <div className="flex items-center space-x-1 ml-2">
                    <span className="flex p-[0.4rem] items-center justify-center w-7 h-7 text-gray-500 bg-white border border-gray-300 rounded">
                      <FontAwesomeIcon icon={faArrowUp} size="sm" />
                    </span>
                    <span className="flex p-[0.4rem] items-center justify-center w-7 h-7 text-gray-500 bg-white border border-gray-300 rounded">
                      <FontAwesomeIcon icon={faFilter} size="sm" />
                    </span>
                  </div>
                </div>
                {/* Conditionally render spinner or customer data */}
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="loader" />
                    <p className="text-gray-500 text-sm">
                      Loading customers...
                    </p>
                  </div>
                ) : (
                  customers.map((customer, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-4 shadow rounded mb-6 cursor-pointer"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <div className="flex items-center">
                      
                        <div className="w-12 h-12">
                          <FontAwesomeIcon icon={faUser} size="lg" />
                        </div>

                        <div className="ml-4">
                          <h2 className="font-bold">
                            {customer.first_name} {customer.last_name}
                          </h2>
                          <p className="text-[0.9rem] text-gray-500 mb-1">
                            {customer.email}
                          </p>
                          <p className="text-[0.75rem] text-gray-500">
                            {customer.first_name} is a long-time customer with a
                            history of high-value purchases.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-6 bg-white rounded-lg shadow-lg">
              <div className="flex justify-between mb-4">
                <select
                  className="text-pink-500 cursor-pointer bg-white border-2 border-pink-500 px-2 py-1 focus:outline-none rounded-sm text-sm font-semibold"
                  defaultValue="Conversations & Notes"
                >
                  <option value="Conversations & Notes">
                    Conversations & Notes
                  </option>
                  <option value="Notes">Notes</option>
                  <option value="Conversations">Conversations</option>
                </select>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 font-semibold text-white text-sm rounded-sm bg-gradient-to-br from-pink-500 to-purple-600">
                    Snooze
                  </button>
                  <button className="px-4 py-2 font-semibold text-white text-sm rounded-sm bg-gradient-to-br from-pink-500 to-purple-600">
                    Close
                  </button>
                </div>
              </div>

              {/* Communication and Notes Section */}
              <div className="bg-gray-100 p-6 rounded-lg shadow mb-4">
                {/* Conversation 1 */}
                <div className="mb-4">
                  <p className="text-gray-500 text-sm">
                    Date: 2023-09-20 10:15 AM
                  </p>
                  <p className="font-semibold">Subject: Welcome Email</p>
                  <p className="mb-2">
                    Hi John, welcome to our platform! We're excited to have you
                    with us.
                  </p>
                  <div className="border-2 border-dashed border-gray-400 p-4 rounded-lg">
                    <p className="font-semibold">Note:</p>
                    <p>
                      Customer signed up but hasn’t completed their profile yet.
                      Sent a follow-up email.
                    </p>
                  </div>
                </div>

                {/* Conversation 2 */}
                <div className="mb-4">
                  <p className="text-gray-500 text-sm">
                    Date: 2023-09-18 02:30 PM
                  </p>
                  <p className="font-semibold">Subject: Product Inquiry</p>
                  <p className="mb-2">
                    Hello, I have a question regarding the latest product in
                    your store.
                  </p>
                  <div className="border-2 border-dashed border-gray-400 p-4 rounded-lg">
                    <p className="font-semibold">Note:</p>
                    <p>
                      Customer was interested in the "XPro Gadget". Sent product
                      details and price list.
                    </p>
                  </div>
                </div>

                {/* Conversation 3 */}
                <div className="mb-4">
                  <p className="text-gray-500 text-sm">
                    Date: 2023-09-15 09:00 AM
                  </p>
                  <p className="font-semibold">Subject: Order Confirmation</p>
                  <p className="mb-2">
                    Thank you for your order! Your order #103 has been processed
                    and will be shipped soon.
                  </p>
                  <div className="border-2 border-dashed border-gray-400 p-4 rounded-lg">
                    <p className="font-semibold">Note:</p>
                    <p>
                      Customer placed the first order successfully. Order
                      details were sent.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2">
                <button className="px-4 py-2 font-semibold text-pink-500 text-sm rounded-sm border-2 border-pink-500 bg-white">
                  Add Note
                </button>
                <button className="px-4 py-2 font-semibold text-white text-sm rounded-sm bg-gradient-to-br from-pink-500 to-purple-600">
                  Write a Reply
                </button>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-2/11">
              {selectedCustomer ? (
                <div className="mb-6 p-4 rounded-lg shadow-lg bg-white">
                  {/* Display selected customer details */}
                  <div className="flex justify-start items-center mb-4">
                    <h2 className="text-blue-600 text-lg font-bold">
                      {selectedCustomer.first_name} {selectedCustomer.last_name}
                    </h2>

                    <div className="flex space-x-2 ml-3">
                      <button className="px-2 py-1 bg-green-400 text-white rounded-sm text-xs font-semibold">
                        Loyal
                      </button>
                      <button className="px-2 py-1 bg-yellow-400 text-white rounded-sm text-xs font-semibold">
                        VIP
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2 text-gray-600">
                        <FontAwesomeIcon icon={faEnvelope} size="sm" />
                      </span>
                      <p className="text-sm pt-1">{selectedCustomer.email}</p>
                    </div>

                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2 text-gray-600">
                        <FontAwesomeIcon icon={faPhone} size="sm" />
                      </span>
                      <p className="text-sm pt-1">
                        {selectedCustomer.phone || "N/A"}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2 text-gray-600">
                        <FontAwesomeIcon icon={faMoneyBill} size="sm" />
                      </span>
                      <p className="text-sm pt-1">
                        Total Spent: ${selectedCustomer.total_spent || "0"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">
                  Select a customer to view details
                </p>
              )}

              {/* Middle Card: Attributes */}
              <div className="mb-6 p-4 rounded-lg shadow-lg bg-white">
                <h3 className="font-bold text-gray-600 mb-1 pl-1">
                  Attributes
                </h3>
                {/* Search Box */}
                <input
                  type="text"
                  placeholder="Type here"
                  className="w-full h-7 p-2 mb-3 text-sm border rounded-sm border-gray-300 focus:outline-none"
                />
                {/* Attributes List */}
                <div className="space-y-2 text-sm pl-2 pr-2 text-left">
                  <div className="flex justify-between">
                    <p>Email Status:</p>
                    <p>Subscribed</p>
                  </div>
                  <div className="flex justify-between">
                    <p>First Seen:</p>
                    <p>2022-05-15</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Signed Up:</p>
                    <p>2022-05-01</p>
                  </div>
                  <div className="flex justify-between">
                    <p>First Contacted:</p>
                    <p>2022-05-10</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Last Contacted:</p>
                    <p>2022-09-18</p>
                  </div>
                  <div className="flex justify-between">
                    <p>First Order Placed:</p>
                    <p>2022-06-01</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Last Order Placed:</p>
                    <p>2022-09-15</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Total Order Value:</p>
                    <p>$10,000</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Total Order Quantity:</p>
                    <p>5</p>
                  </div>
                </div>
              </div>

              {/* Bottom Card: Order Summary */}
              <div className="p-4 rounded-lg shadow-lg bg-white">
                <h3 className="font-bold text-gray-600 mb-1 pl-1">
                  Order Summary
                </h3>
                {/* Search Box */}
                <div className=" flex items-start justify-between ">
                  <input
                    type="text"
                    placeholder="Search Order"
                    className="w-full p-2 mb-4 text-sm border rounded-sm border-gray-300 h-7 focus:outline-none"
                  />
                  <div className="flex items-center space-x-1 ml-2">
                    <span className="flex p-[0.4rem] items-center justify-center w-7 h-7 text-gray-500 bg-white border border-gray-300 rounded">
                      <FontAwesomeIcon icon={faArrowUp} size="sm" />
                    </span>
                    <span className="flex p-[0.4rem] items-center justify-center w-7 h-7 text-gray-500 bg-white border border-gray-300 rounded">
                      <FontAwesomeIcon icon={faFilter} size="sm" />
                    </span>
                  </div>
                </div>
                {/* Table-like Structure */}
                <div className="text-sm border border-gray-300">
                  {/* Header Row */}
                  <div className="grid grid-cols-3 gap-4 font-semibold  bg-gray-200 p-2 border">
                    <p>Date</p>
                    <p>Order ID</p>
                    <p>Status</p>
                  </div>
                  {/* Rows */}
                  <div className="grid grid-cols-3 gap-4 mb-1 border-t border-gray-300">
                    <p className="p-2 bg-white">2023-09-20</p>
                    <p className="p-2 bg-white">#101</p>
                    <p className="p-2 bg-white text-green-600 font-semibold">
                      Completed
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-1 border-t border-gray-300">
                    <p className="p-2 bg-white">2023-09-18</p>
                    <p className="p-2 bg-white">#102</p>
                    <p className="p-2 bg-white text-yellow-500 font-semibold">
                      Processing
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-t border-gray-300">
                    <p className="p-2 bg-white">2023-09-16</p>
                    <p className="p-2 bg-white">#103</p>
                    <p className="p-2 bg-white text-red-500 font-semibold">
                      Shipped
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarIcon({ icon }) {
  return (
    <div className="flex items-center justify-center w-9 h-9 p-2 rounded-md bg-gray-300 hover:bg-pink-500 hover:text-white transition duration-300 cursor-pointer">
      <FontAwesomeIcon icon={icon} size="lg" />
    </div>
  );
}
