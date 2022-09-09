import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
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

    getCollectionData = async (customCollection) => {
        const snap = await getDocs(customCollection ?? this.collectionRef)
        console.log("Data")
        // snap.docs.forEach( doc => console.log(doc.data()))
        return snap.docs;
    }

    getSubscription = async () => {
        return onSnapshot(this.collectionRef)
    }

    getSingleDoc = async (id, customCollectionRef) => {
        try {
            const docRef = doc(firestoreDB, customCollectionRef ?? this.collectionName, id);
            const docData = await getDoc(docRef)
            return docData.exists() ?
                docData.data() : Error("Invalid Id in the Collection");
    
        } catch (err) {
            return Error("Error in data fetching")
        }
    }
    
}
