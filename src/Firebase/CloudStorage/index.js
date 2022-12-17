import {
    deleteObject,
    getDownloadURL, ref, uploadBytes,
} from "firebase/storage";
import { StorageBucket } from "..";

export class FirebaseBucketStorage {
    constructor(reference) {
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
    storeObjectAndGetUrl = async (fileName, fileObject, fileMeta) => {
        try {

            const fileStorageRef = ref(StorageBucket, `${this.reference}/${fileName}`);

            const uploadTask = await uploadBytes(fileStorageRef, fileObject, fileMeta);

            return await getDownloadURL(uploadTask.ref);

        } catch (err) {
            throw Error("Something Wrong While Uploading the data");
        }

    }

    #getFileNamefromUrl(url) {
        const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/igit-mca.appspot.com/o/';
        let imagePath = url.replace(baseUrl, "");

        const indexOfEndPath = imagePath.indexOf("?");

        imagePath = imagePath.substring(0, indexOfEndPath);
        
        imagePath = imagePath.replace("%2F", "/");

        return imagePath;
    }

    deleteObjectFromBucketStorage = async (imageUrl) => {
        const fileLocation = this.#getFileNamefromUrl(imageUrl);
        const fileRef = ref(StorageBucket, fileLocation);
        
        // deleting the object
        try {
            await deleteObject(fileRef);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export const StorageFolderStructure = {
    PROFILE_PICTURE: "ProfilePic",
}
