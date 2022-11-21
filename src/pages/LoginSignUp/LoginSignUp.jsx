import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	signinUserWithEmail,
	signInwithGooglePopup,
	signupUserWithEmail,
} from "../../Firebase/Auth";
import GoogleC from "../../images/google-color-icon.png";
import { userLoggedIn } from "../../State/Auth/slice.Auth";
import { setAtLogin } from "../../State/Google/slice.Google";
import { validMail } from "../../utils/validator";
import "./loginsignup.css";

const LoginSignUp = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const isVerifyed = useSelector((state) => state.auth.isVerifyed);
	const isRegistered = useSelector((state) => state.user.registered);

	const [isLoading, setIsLoading] = useState(false);

	const [signUp, setSignUp] = useState(false);

	const defaultSignInData = {
		email: "",
		password: "",
	};
	const [signInData, setSignInData] = useState(defaultSignInData);

	const defaultSignUpData = {
		email: "",
		password: "",
		confirmPassword: "",
	};
	const [signUpData, setSignUpData] = useState(defaultSignUpData);
	// End of State Managers

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const signInSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		setSignInData((s) => ({
			email: s.email.trim(),
			password: s.password.trim(),
		}));

		if (Object.is(signInData, defaultSignInData)) return;

		if (!validMail(signInData.email)) {
			return;
		}

		try {
			const user = await signinUserWithEmail(
				signInData.email,
				signInData.password
			);
			console.log(user);
			dispatch(userLoggedIn());
			setIsLoading(false);
			return navigate("/");
		} catch (err) {
			setIsLoading(false);
		}
	};

	const signupSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setSignUpData((s) => ({
			email: s.email.trim(),
			password: s.password.trim(),
			confirmPassword: s.confirmPassword.trim(),
		}));
		if (Object.is(signUpData, defaultSignUpData)) return;
		if (!validMail(signUpData.email)) {
			return;
		}
		if (signUpData.password !== signUpData.confirmPassword) {
			return;
		}
		try {
			const user = await signupUserWithEmail(
				signUpData.email,
				signUpData.password
			);
			console.log(user);
			dispatch(userLoggedIn());
			dispatch(setAtLogin(user));
			setIsLoading(false);
			return navigate("/fill-details");
		} catch (err) {
			setIsLoading(false);
		}
	};

	const loginWithGoogle = async () => {
		setIsLoading(true);
		try {
			const user = await signInwithGooglePopup();
			const {
				accessToken,
				displayName,
				emailVerified,
				isAnonymous,
				photoURL,
				email,
				uid,
			} = user;
			dispatch(
				setAtLogin({
					accessToken,
					displayName,
					emailVerified,
					isAnonymous,
					photoURL,
					email,
					uid,
				})
			);
			setIsLoading(false);
			console.log("redirecting to the fill details page");
			navigate("/fill-details");
			// dispatch(userLoggedIn());
		} catch (err) {
			setIsLoading(false);
		}
	};

	if (isLoggedIn) {
		if (isVerifyed && isRegistered) {
			navigate("/");
		} else {
			navigate("/fill-details");
		}
	}

	return (
		<div className="login-page-container">
			<div className="login-container">
				<div className="blueBg">
					<div className="box signin">
						{/* <div className='loginPage'>
                        </div> */}
						<p>Try</p>
						<button
							className="login-with-google-btn"
							onClick={(e) => loginWithGoogle()}
						>
							Log in with <img src={GoogleC} className="google-image" alt="" />
						</button>
						<h2>Already Have an Account ?</h2>
						<button className="signinBtn" onClick={(e) => setSignUp(false)}>
							Sign in
						</button>
					</div>
					<div className="box signup">
						<button
							className="login-with-google-btn"
							onClick={(e) => loginWithGoogle()}
						>
							Log in with <img src={GoogleC} className="google-image" alt="" />
						</button>
						<h2>Don't Have an Account ?</h2>
						<button className="signupBtn" onClick={(e) => setSignUp(true)}>
							Sign Up
						</button>
					</div>
				</div>
				<div className={`formBx ${signUp ? "active" : ""}`}>
					<div className="form signinForm">
						<form onSubmit={signInSubmit}>
							<h3>Sign In</h3>
							<input
								type="text"
								placeholder="Email"
								value={signInData.email}
								onChange={(e) =>
									setSignInData((s) => ({ ...s, email: e.target.value }))
								}
							/>
							<input
								type="password"
								placeholder="Password"
								value={signInData.password}
								onChange={(e) =>
									setSignInData((s) => ({ ...s, password: e.target.value }))
								}
							/>
							{isLoading ? (
								<CircularProgress size={30} />
							) : (
								<input type="submit" value="Login" />
							)}
							<p className="forget">Forget Password ?</p>
						</form>
					</div>

					<div className="form signupForm">
						<form onSubmit={signupSubmit}>
							<h3>Sign Up</h3>

							{/* <input type="text" placeholder="Username" /> */}
							<input
								type="text"
								placeholder="Email Address"
								value={signUpData.email}
								onChange={(e) =>
									setSignUpData((s) => ({ ...s, email: e.target.value }))
								}
							/>
							<input
								type="password"
								placeholder="Password"
								value={signUpData.password}
								onChange={(e) =>
									setSignUpData((s) => ({ ...s, password: e.target.value }))
								}
							/>
							<input
								type="password"
								placeholder="Confirm Password"
								value={signUpData.confirmPassword}
								onChange={(e) =>
									setSignUpData((s) => ({
										...s,
										confirmPassword: e.target.value,
									}))
								}
							/>
							{isLoading ? (
								<CircularProgress size={30} />
							) : (
								<input type="submit" value="Register" />
							)}
							<p className="forget">Forget Password ?</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginSignUp;
