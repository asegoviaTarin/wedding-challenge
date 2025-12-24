import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAW7qpeyZX6yZq1XitFemhelUHytAA4MwU",
  authDomain: "wedding-app-1acc9.firebaseapp.com",
  databaseURL: "https://wedding-app-1acc9-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "wedding-app-1acc9",
  storageBucket: "wedding-app-1acc9.firebasestorage.app",
  messagingSenderId: "32926774782",
  appId: "1:32926774782:web:c1e3969c8729a894093caf",
  measurementId: "G-J5XB7VWR1L"
};
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
