import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";
import { firebaseAuth } from "..";
import { validMail } from "../../utils/validator";

const provider = new GoogleAuthProvider();

export const signupUserWithEmail = async (email, pass) => {

    if (email.trim() === "" || pass.trim() === "" || !validMail(email)) {
        return Error("Something wrong in Input");
    }

    try {
        const response = await createUserWithEmailAndPassword(firebaseAuth, email, pass);

        return response.user;

    } catch (err) {
        return Error(err.message)
    }
    
}

export const signinUserWithEmail = async (email, pass) => {
    if (email.trim() === "" || pass.trim() === "" || !validMail(email)) {
        return Error("Something wrong in Input");
    }
    try {
        const response = await signInWithEmailAndPassword(firebaseAuth, email, pass);
    
        return response.user;
    
    } catch (err) {
        return Error(err.message)
    }

}

export const signInwithGooglePopup = async () =>{
    try{
        const result = await signInWithPopup(firebaseAuth, provider);

        return result.user;
    } catch(err){
        return Error(err.message)
    }    
}

export const logout = async () =>{
    try {
        await signOut(firebaseAuth); 
    } catch (err) {
        return Error(err.message);
    }
}