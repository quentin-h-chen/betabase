import './Login.css';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import GoogleSignIn from '../components/GoogleSignIn';
import { useNavigate } from 'react-router-dom';

/**
 * Login Page 
 * 
 * Displays login form for users to sign in using two different methods:
 * - Email + password via Firebase Auth
 * - Google OAuth (GoogleSignIn component)
 * Users are redirected to the home page after signing in
 */

export default function Login() {
    // State variables for username, password, and errors
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");

    // React Router hook for navigation
    const navigate = useNavigate();

    /**
     * Handles user email input change and updates user state
     * @param {Object} e - input change event
     */
    const setUserHandler = (e) => { setUser(e.target.value); }

    /**
     * Handles password input change and updates pass state
     * @param {Object} e - input change event 
     */
    const setPassHandler = (e) => { setPass(e.target.value); }

    /**
     * Attempts to let user sign in via Firebase Auth
     * Successful: displays popup welcoming user and redirects to home page
     * Unsucessful: displays error message
     */
    const submitHandler = async() => {
        setError("");
        try {
            await signInWithEmailAndPassword(auth, user, pass);
            navigate('/home')
        } catch (err) {
            if (err.code === "auth/invalid-email") {
                setError("Please enter a valid email address.");
            }
            else if (err.code === "auth/user-not-found") {
                setError("No account found with this email.");
            }
            else if (err.code === "auth/wrong-password") {
                setError("Incorrect password. Please try again.");
            }
            else if (err.code === "auth/too-many-requests") {
                setError("Too many attempts. Try again later.");
            }
            else if (err.code === "auth/invalid-credential") {
                setError("Email or password is incorrect.");
            }
            else {
                setError("Sign in failed: " + err.message);
            }
        }
    }

    return (
        <div className='login-page'>
            <div className='login-container'>
                <h1 className='welcome-back-header'>Welcome Back!</h1>
                <div className='email-password-container'>
                    <p>Email: </p>
                    <input value={user} onChange={setUserHandler} />
                    <p>Password: </p>
                    <input value={pass} onChange={setPassHandler} />
                </div>

                {error && <p className='login-error-message'>{error}</p>}

                <div className='seperator-block'>
                    <button onClick={submitHandler} className='submit-button'>Sign In</button>
                    <p className='or-text'>or</p>
                    <p className='sign-in-text'>Sign in with Google</p>
                </div>
                <GoogleSignIn />
            </div>
        </div>
    );
};