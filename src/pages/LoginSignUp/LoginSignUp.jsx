import { useState, useEffect } from "react";
import { logout, signinUserWithEmail, signInwithGooglePopup, signupUserWithEmail } from "../../Firebase/Auth";
import GoogleC from "../../images/google-color-icon.png";
import { validMail } from "../../utils/validator";
import "./loginsignup.css";

const LoginSignUp = () => {
	const [signUp, setSignUp] = useState(false);
    
    const defaultSignInData = {
        email: "",
        password: "",
    };
    const [signInData, setSignInData] = useState(defaultSignInData)

    const defaultSignUpData = {
        email: "",
        password: "",
        confirmPassword: "",
    }
    const [signUpData, setSignUpData] = useState(defaultSignUpData);


    const signInSubmit = async (e) =>{
        
        setSignInData(s => ({email: s.email.trim(), password: s.password.trim()}))
        e.preventDefault();
        if(Object.is(signInData, defaultSignInData))
            return ;
        if(!validMail(signInData.email)){
            return ;
        }
        const user = await signinUserWithEmail(signInData.email, signInData.password);
        console.log(user);
        
    }
    
    const signupSubmit = async (e) =>{
        setSignUpData(s => ({email:s.email.trim(), password: s.password.trim(), confirmPassword: s.confirmPassword.trim()}))
        e.preventDefault();
        if(Object.is(signUpData, defaultSignUpData))
            return ;
        if(!validMail(signUpData.email)){
            return ;
        }
        if(signUpData.password !== signUpData.confirmPassword){
            return ;
        }
        const user = await signupUserWithEmail(signUpData.email, signUpData.password);
        console.log(user)

    }

	return (
		<div className="login-page-container">
            <div className="login-container">
                <div className="blueBg">
                    <div className="box signin">
                        {/* <div className='loginPage'>
                        </div> */}
                        <p>Try</p>
                        <button className="login-with-google-btn" onClick={signInwithGooglePopup} >
                            Log in with <img src={GoogleC} className="google-image" alt="" />
                        </button>
                        <h2>Already Have an Account ?</h2>
                        <button className="signinBtn" onClick={(e) => setSignUp(false)}>
                            Sign in
                        </button>
                    </div>
                    <div className="box signup">
                        <button className="login-with-google-btn" onClick={signInwithGooglePopup}>
                            Sign in with <img src={GoogleC} className="google-image" alt="" />
                        </button>
                        <h2>Don't Have an Account ?</h2>
                        <button className="signupBtn" onClick={(e) => setSignUp(true)}>
                            Sign Up
                        </button>
                    </div>
                </div>
                <div className={`formBx ${signUp ? "active" : ""}`}>
                    <div className="form signinForm">
                        <form onSubmit={signInSubmit} >
                            <h3>Sign In</h3>
                            <input type="text" placeholder="Email" value={signInData.email} onChange={e => setSignInData(s => ({...s, email: e.target.value}))} />
                            <input type="password" placeholder="Password" value={signInData.password} onChange={e => setSignInData(s => ({...s, password: e.target.value}))} />
                            <input type="submit" value="Login" />
                            <p className="forget">Forget Password ?</p>
                        </form>
                    </div>

                    <div className="form signupForm">
                        <form onSubmit={signupSubmit} >
                            <h3>Sign Up</h3>

                            {/* <input type="text" placeholder="Username" /> */}
                            <input type="text" placeholder="Email Address" value={signUpData.email} onChange={e => setSignUpData(s => ({...s, email: e.target.value}))} />
                            <input type="password" placeholder="Password" value={signUpData.password} onChange={e => setSignUpData(s => ({...s, password: e.target.value}))} />
                            <input type="password" placeholder="Confirm Password" value={signUpData.confirmPassword} onChange={e => setSignUpData(s => ({...s, confirmPassword: e.target.value}))} />
                            <input type="submit" value="Register" />
                            <p className="forget">Forget Password ?</p>
                        </form>
                    </div>
                </div>
            </div>
		</div>
	);
};

export default LoginSignUp;