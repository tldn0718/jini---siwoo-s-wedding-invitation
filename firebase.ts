import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAXqNa1FCppXE_km0m1bzRdHwYZGw7EkBs",
    authDomain: "gen-lang-client-0630377070.firebaseapp.com",
    projectId: "gen-lang-client-0630377070",
    storageBucket: "gen-lang-client-0630377070.firebasestorage.app",
    messagingSenderId: "427605589004",
    appId: "1:427605589004:web:e8730654d25890fd694229"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
