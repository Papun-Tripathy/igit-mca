import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { firestoreDB } from "..";

export class FireStoreCollection {

    constructor(collectionName) {
        this.collectionName = collectionName;
        this.collectionRef = collection(firestoreDB, collectionName);
    }

    getDetails = async () => {
        try {
            const detailsRef = collection(firestoreDB, `${this.collectionName}/all${this.collectionName}/details`)
            const snap = await getDocs(detailsRef);
            // if(snap.empty()) return Error("Empty") ;
            return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        } catch (err) {
            console.warn(err)
            throw Error("Error in getDetails for the collection");
        }
    }

    customCollectionRef = (newRef) => {
        return collection(firestoreDB, `${this.collectionName}/${newRef}`)
    }
    customCollectionName = (newRef) => {
        return `/${newRef}`;
    }

    getCollectionData = async (customCollection) => {
        try {
            const snap = await getDocs(customCollection ?? this.collectionRef);
            return snap.docs;
        } catch (err) {
            throw Error(err.message);
        }
    }

    getSubscription = ({ workFunction }) => {
        return onSnapshot(this.collectionRef, workFunction)
    }

    getSingleDoc = async (id, customCollectionName) => {
        try {
            const docRef = doc(firestoreDB, customCollectionName ?? this.collectionName, id);
            const docData = await getDoc(docRef);

            if (docData.exists()) 
                return docData.data() 
            else throw Error("Invalid Id in the Collection");

        } catch (err) {
            throw err;
            // throw Error("Error in data fetching")
        }
    }

    updateDocument = async (id, data, customCollectionName) => {
        try {
            const docRef = doc(firestoreDB, customCollectionName ?? this.collectionName, id);
            return await updateDoc(docRef, data);
            
        } catch (err) {
            console.log(err);
        }
    }

    deleteDocument = async (id, customCollectionRef) =>{
        try{
            const docRef = doc(firestoreDB, customCollectionRef ?? this.collectionName, id);
            return await deleteDoc(docRef);
        } catch(err){

        }
    }

    addDocumentWithoutId = async ({ customCollectionRef, data }) => {
        try {
            const docData = await addDoc(customCollectionRef ?? this.collectionRef, data);
            console.log(data);
            return docData;
        } catch (err) {
            throw Error("Error!! Try Again")
        }
    }

    addDocumentWithId = async ({ customCollectionPath, specificId, data }) => {
        try {
            const docRef = doc(firestoreDB, customCollectionPath ?? this.collectionName, specificId);
            await setDoc(docRef, data);

            // const docData = await this.getSingleDoc(specificId, customCollectionPath);
            console.log("Data with Id addition")
            // console.log(docData);
            // return docData;
        } catch (err) {
            console.error(err)
            throw Error("Error in Document Upload!!");
        }
    }


}

export const cloudFirestoreCollections = {
    USER_DETAILS: "User",
    BATCH: "Batch",
}