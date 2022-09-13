import {
    getDownloadURL, ref, uploadBytes, uploadBytesResumable,
} from "firebase/storage";
import { StorageBucket } from "..";

export class FirebaseBucketStorage{
    constructor(reference){
        this.reference = reference;
    }
    /**
     * fileName - Name of the file to be saved in the server
     * fileObject - the BLOB of FILE to upload
     * fileMeta - {
     *      contentType: "image/jpeg"
     *      contentType: "image/jpg"
     *      contentType: "image/png"
     *      contentType: "image/..."
     * }
     */
    storeObjectAndGetUrl= async (fileName, fileObject, fileMeta) => {
        try {
            
            const fileStorageRef = ref(StorageBucket, `${this.reference}/${fileName}`);
    
            const uploadTask = await uploadBytes(fileStorageRef, fileObject, fileMeta);
    
            return await getDownloadURL(uploadTask.ref);

        } catch (err) {
            throw Error("Something Wrong While Uploading the data");
        }

    }
}

export const StorageFolderStructure = {
    PROFILE_PICTURE: "ProfilePic",
}
