// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAUHODhcbxRmgjGMtowfbaAAH7gtQgRIo",
  authDomain: "saigonchildren-ede09.firebaseapp.com",
  projectId: "saigonchildren-ede09",
  storageBucket: "saigonchildren-ede09.appspot.com",
  messagingSenderId: "379772787968",
  appId: "1:379772787968:web:417cdfb847e5ebcecda7e5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {auth}