import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { firestoreDB } from "..";

export class FireStoreCollection {

    constructor(collectionName) {
        this.collectionName = collectionName;
        this.collectionRef = collection(firestoreDB, collectionName);
    }

    getDetails = async () =>{
        try {
            const detailsRef = collection(firestoreDB, `${this.collectionName}/all${this.collectionName}/details`)
            const snap = await getDocs(detailsRef);
            // if(snap.empty()) return Error("Empty") ;
            return snap.docs.map( doc => ({ id: doc.id,...doc.data() }))
            
        } catch (err) {
            console.warn(err)
            return Error("Error in getDetails for the collection");
        }
    }

    customCollectionRef = (newRef) =>{
        return collection(firestoreDB, `${this.collectionName}/${newRef}`)
    }
    customCollectionName = (newRef) =>{
        return `/${newRef}`;
    }

    getCollectionData = async (customCollection) => {
        try {
            const snap = await getDocs(customCollection ?? this.collectionRef);
            return snap.docs;
        } catch (err) {
            return Error(err.message);
        }
    }

    getSubscription = async () => {
        return onSnapshot(this.collectionRef)
    }

    getSingleDoc = async (id, customCollectionName) => {
        try {
            const docRef = doc(firestoreDB, customCollectionName ?? this.collectionName, id);
            const docData = await getDoc(docRef);
            return docData.exists() ?
            docData.data() : Error("Invalid Id in the Collection");
            
        } catch (err) {
            return Error("Error in data fetching")
        }
    }

    addDocumentWithoutId = async ({customCollectionRef, data}) =>{
        try {
            const docData = await addDoc(customCollectionRef ?? this.collectionRef, data);
            console.log(data);
            return docData;
        } catch (err) {
            console.warn(err)
        }
    }

    addDocumentWithId = async ({ customCollectionPath, specificId, data}) =>{
        try {
            const docRef = doc(firestoreDB, customCollectionPath, specificId );
            const docData = await setDoc(docRef, data);
        } catch (err) {
            console.warn(err)
        }
    }
    
}

export const cloudFirestoreCollections = {
    USER_DETAILS: "User",
    BATCH: "Batch",
  }