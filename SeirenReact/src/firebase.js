import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC49hTn3C...your_api_key...",
  authDomain: "photo-island-dade4.firebaseapp.com",
  projectId: "photo-island-dade4",
  storageBucket: "photo-island-dade4.appspot.com",
  messagingSenderId: "164483164265",
  appId: "1:164483164265:web:cbd43487c78160566b5af8",
  measurementId: "G-RL203HHCQ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase 서비스 초기화
const auth = getAuth(app); // app을 인자로 전달
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
