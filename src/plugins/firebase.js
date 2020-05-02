import Vue from 'vue'
import {
  firestorePlugin
} from 'vuefire'
import firebase from "@firebase/app";
import "@firebase/firestore";

Vue.use(firestorePlugin)

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCid_EQwHMI0jLFG7yjhJSJ2unJccJuXYA",
  authDomain: "gblgraph.firebaseapp.com",
  databaseURL: "https://gblgraph.firebaseio.com",
  projectId: "gblgraph",
  storageBucket: "gblgraph.appspot.com",
  messagingSenderId: "139325699362",
  appId: "1:139325699362:web:a027c29eeff68a37a7e17b",
  measurementId: "G-Y4V0JMW4WK"
});

export const db = firebaseApp.firestore();