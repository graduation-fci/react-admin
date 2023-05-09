
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB_xsqfMafiEMCU5-wo4ftf6HZszOgWIQY",
  authDomain: "amit-3c7b3.firebaseapp.com",
  databaseURL: "https://amit-3c7b3-default-rtdb.firebaseio.com",
  projectId: "amit-3c7b3",
  storageBucket: "amit-3c7b3.appspot.com",
  messagingSenderId: "1086692887600",
  appId: "1:1086692887600:web:61dc8d249becd9145071f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const storage=getStorage(app);