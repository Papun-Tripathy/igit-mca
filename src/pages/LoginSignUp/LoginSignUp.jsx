import './loginsignup.css'

const LoginSignUp = () => {
    return (
        <div className="login-page-container">
            <div className="blueBg">
                <div className="box signin">
                    <div className='loginPage'>
                        <p>Sign in with Google to Continue</p>
                        <button className='login-with-google-btn'>Sign in with Google</button>
                    </div>
                    <h2>Already Have an Account ?</h2>
                    <button className="signinBtn">Sign in</button>
                </div>
                <div className="box signup">
                    <h2>Don't Have an Account ?</h2>
                    <button className="signupBtn">Sign Up</button>
                </div>
            </div>
            <div className="formBx">
                <div className="form signinForm">
                    <form action="">
                        <h3>Sign In</h3>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <input type="submit" value="Login" />
                        <a href="#" className="forget">Forget Password ?</a>
                    </form>
                </div>

                <div className="form signupForm">
                    <form action="">
                        <h3>Sign Up</h3>

                        <input type="text" placeholder="Username" />
                        <input type="text" placeholder="Email Address" />
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder="Confirm Password" />
                        <input type="submit" value="Register" />
                        <a href="#" class="forget">Forget Password ?</a>
                    </form>
                </div>
            </div>



        </div >
    )
}

export default LoginSignUp