import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { ENV } from "../utils/env";

const firebaseConfig = {
  apiKey: ENV.firebase.apiKey,
  authDomain: ENV.firebase.authDomain,
  projectId: ENV.firebase.projectId,
  storageBucket: ENV.firebase.storageBucket,
  messagingSenderId: ENV.firebase.messagingSenderId,
  appId: ENV.firebase.appId,
  measurementId: ENV.firebase.measurementId,
};

export const firebaseApp = initializeApp(firebaseConfig);

export const firestoreDB = getFirestore(firebaseApp);

