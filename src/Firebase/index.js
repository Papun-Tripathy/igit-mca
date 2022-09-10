import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ENV } from "../utils/env";
import { useDispatch } from "react-redux";

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

export const StorageBucket = getStorage(firebaseApp);

export const firebaseAuth = getAuth(firebaseApp);

export const cloudFirestoreCollections = {
  USER_DETAILS: "User",
  BATCH: "Batch",
}

export const checkAuthState = () =>{
  const unSubscribe = onAuthStateChanged(firebaseAuth,(user) =>{
    console.log("changes in user....")
    console.log(user)
    // if user is loggin in then there will be something in the object otherwise null
    if(user){
      
    } else {

    }
  })
  return unSubscribe;
}
