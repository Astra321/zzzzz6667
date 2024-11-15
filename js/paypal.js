import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Function to load PayPal buttons
const loadPayPal = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  paypal.Buttons({
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: total.toFixed(2),
            },
          },
        ],
      });
    },
    onApprove: (data, actions) => {
      return actions.order.capture().then(() => {
        alert("Payment successful! Thank you for your purchase.");
        localStorage.removeItem("cart");
        window.location.href = "index.html"; // Redirect to home page after payment
      });
    },
    onError: (err) => {
      console.error("PayPal error:", err);
      alert("Something went wrong with the payment.");
    },
  }).render("#paypal-button-container");
};

// Initialize PayPal buttons
loadPayPal();
