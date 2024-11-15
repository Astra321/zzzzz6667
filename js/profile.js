
const firebaseConfig = {
  apiKey: "AIzaSyAHwQdpTQ-xzhpl63yapaUfmxUy0mBpAAs",
  authDomain: "zizo2-dbd4e.firebaseapp.com",
  projectId: "zizo2-dbd4e",
  storageBucket: "zizo2-dbd4e.firebasestorage.app",
  messagingSenderId: "1087993545163",
  appId: "1:1087993545163:web:78c4bcb27c1b22ef6af64e",
  measurementId: "G-W1JS7BWN5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
import { getAuth, onAuthStateChanged, updatePassword, signOut } from "firebase/auth";
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
const auth = getAuth(app);

// Display user email
const userEmailElement = document.getElementById("user-email");
const updatePasswordForm = document.getElementById("update-password-form");
const logoutButton = document.getElementById("logout-button");

onAuthStateChanged(auth, (user) => {
  if (user) {
    userEmailElement.textContent = user.email;
  } else {
    alert("You are not logged in. Redirecting to login page.");
    window.location.href = "login.html";
  }
});

// Update user password
updatePasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newPassword = document.getElementById("new-password").value;

  try {
    const user = auth.currentUser;
    await updatePassword(user, newPassword);
    alert("Password updated successfully!");
    updatePasswordForm.reset();
  } catch (error) {
    console.error("Error updating password:", error);
    alert("Failed to update password: " + error.message);
  }
});

// Logout user
logoutButton.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("You have been logged out.");
    window.location.href = "login.html";
  } catch (error) {
    console.error("Error logging out:", error);
    alert("Failed to log out: " + error.message);
  }
});
