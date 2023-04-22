// require("dotenv").config();
// const { database } = require("firebase-admin");
// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");
// const { getAuth } = require("firebase-admin/auth");
// //console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)
// initializeApp({
//   credential: applicationDefault(),
// });

// const db = getFirestore();
// const auth = getAuth();
// console.log("---------------" + auth + "---------------");
// module.exports = {
//   db,
//   auth,
// };
require("dotenv").config();
const firebaseAdmin = require("firebase-admin");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { createUserWithEmailAndPassword } = require("firebase/auth");

// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

initializeApp({
  credential: applicationDefault(),
  storageBucket: 'osintagram-be0cd.appspot.com'
});
const db = getFirestore();
const auth = getAuth();

// auth.useDeviceLanguage();
// auth.settings.appVerificationDisabledForTesting = true;
// auth.settings.recaptchaParameters = {
//   size: "invisible",
//   sitekey: "<your-site-key>",
//   callback: () => {},
// };

module.exports = {
  db,
  auth,
  firebaseAdmin,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
};
