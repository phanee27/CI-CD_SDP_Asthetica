import React from "react";
import axios from "axios";

const Payment = () => {
    const handlePayment = async () => {
        try {
            // Step 1: Create an order on the backend
            const orderResponse = await axios.post("http://localhost:8080/api/payment/order", {
                amount: 50000, // Amount in paise (e.g., 50000 paise = ₹500)
                currency: "INR",
            });

            const { id: orderId, amount, currency } = orderResponse.data;

            // Step 2: Initialize Razorpay payment
            const options = {
                key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
                amount: amount,
                currency: currency,
                name: "Asthetica",
                description: "Test Transaction",
                order_id: orderId,
                handler: async function (response) {
                    // Step 3: Verify payment on the backend
                    const verifyResponse = await axios.post("http://localhost:8080/api/payment/verify", {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    });

                    if (verifyResponse.data.success) {
                        alert("Payment successful!");
                    } else {
                        alert("Payment verification failed!");
                    }
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Payment error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div>
            <h1>Payment Page</h1>
            <button onClick={handlePayment}>Pay ₹500</button>
        </div>
    );
};

export default Payment;