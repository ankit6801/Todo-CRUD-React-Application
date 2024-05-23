import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDFVM3ot7cLQZWoJXeOACeMYh-FeMpEXhk",
  authDomain: "todo-list-32525.firebaseapp.com",
  databaseURL: "https://todo-list-32525-default-rtdb.firebaseio.com",
  projectId: "todo-list-32525",
  storageBucket: "todo-list-32525.appspot.com",
  messagingSenderId: "537626068743",
  appId: "1:537626068743:web:4662acfab1e81af347e7a2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);