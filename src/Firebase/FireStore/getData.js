import { collection, getDocs, getDoc } from "firebase/firestore/lite";
import { firestoreDB } from "..";

class Collection {
    
    constructor(collectionName){
        this.collectionName = collectionName;
        this.coll = collection(firestoreDB, collectionName);
    }

    getSnapshot = async () =>{
        return await getDocs(this.coll);
    }

    getAllCollectionData = async () =>{
        const collectionSnapshot = await this.getSnapshot();

        const dataList = collectionSnapshot.docs.map( doc => doc.data() );

        return dataList;
    }

    getSingleDoc = async (refId) =>{
        const doc = await getDoc(refId);
        return {
            refId: doc.ref,
            data: doc.data(),
        };
        
    }

}