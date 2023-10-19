import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {

  apiKey: "AIzaSyAIDCYoTqrrN4KrT0Lb3HyOEo7Z3-W4Np4",

  authDomain: "react-fb-auth-63ba6.firebaseapp.com",

  projectId: "react-fb-auth-63ba6",

  storageBucket: "react-fb-auth-63ba6.appspot.com",

  messagingSenderId: "635620038593",

  appId: "1:635620038593:web:aa82a900756fb3e178c140"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)