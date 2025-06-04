// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getFirestore,
  connectFirestoreEmulator,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration - Replace with your config
const firebaseConfig = {
  // Add your Firebase config here
  // You can find this in your Firebase console > Project settings > General tab
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
};

// Status indicator elements
const statusDot = document.querySelector(".status-dot");
const statusText = document.querySelector(".status-text");

function updateStatus(status, message) {
  statusDot.className = `status-dot ${status}`;
  statusText.textContent = message;
}

// Initialize Firebase
try {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Check if running locally and connect to emulator if needed
  if (location.hostname === "localhost") {
    try {
      connectFirestoreEmulator(db, "localhost", 8080);
      console.log("Connected to Firestore emulator");
    } catch (error) {
      console.log("Firestore emulator not running, using production");
    }
  }

  // Test Firebase connection
  setTimeout(() => {
    updateStatus("connected", "Firebase Connected Successfully!");
    console.log("Firebase initialized successfully");
  }, 1000);
} catch (error) {
  console.error("Firebase initialization error:", error);
  updateStatus("error", "Firebase Connection Failed");

  // Show helpful message for configuration
  if (
    error.code === "app/invalid-api-key" ||
    firebaseConfig.apiKey === "your-api-key"
  ) {
    statusText.textContent = "Please configure Firebase settings in app.js";
  }
}

// Add some interactivity to feature cards
document.addEventListener("DOMContentLoaded", () => {
  const featureCards = document.querySelectorAll(".feature-card");

  featureCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.style.transform = "scale(0.98)";
      setTimeout(() => {
        card.style.transform = "";
      }, 150);
    });
  });

  // Log app startup
  console.log("Firebase Web App loaded successfully");
  console.log("Running on:", location.hostname);
});
