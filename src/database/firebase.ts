// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCprzkMw5yXi5gTLBl_c3I4idIeH90YmYM",
  authDomain: "recipeimageupload.firebaseapp.com",
  projectId: "recipeimageupload",
  storageBucket: "recipeimageupload.appspot.com",
  messagingSenderId: "816564065014",
  appId: "1:816564065014:web:0c2c7c92bc6afcdbf612d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);