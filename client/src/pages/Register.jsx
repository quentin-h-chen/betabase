import './Register.css';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import GoogleSignIn from '../components/GoogleSignIn';
import { useNavigate } from 'react-router-dom';

/**
 * Register Page
 * 
 * Displays register form for users to create an account with email/password or Google OAuth (GoogleSignIn component)
 * Successful: User receives alert confirming registration
 */

export default function Register() {
    // State variables for user email, password, and errors in registration
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    /**
     * Handles user email input change and updates user state
     * @param {Object} e - input change event
     */
    const setUserHandler = (e) => { setUser(e.target.value) }

    /**
     * Handles password input change and updates pass state
     * @param {Object} e - input change event
     */
    const setPassHandler = (e) => { setPass(e.target.value) }

    /**
     * Attempts to submit form and register user via Firebase Auth
     * Successful: displays confirmation alert
     * Firebase throws error
     */
    const submitHandler = async () => {
        setError("");
        try {
            await createUserWithEmailAndPassword(auth, user, pass);
            navigate('/home');
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                setError("This email is already registered.");
            }
            else if (err.code === "auth/invalid-email") {
                setError("Invalid email. Please enter a valid email.");
            }
            else if (err.code === "auth/weak-password") {
                setError("Make password at least 6 characters.");
            }
            else {
                setError("Registration failed: " + err.message);
            }
        }
    };

    return (
        <div className='register-page'>
            <div className='register-container'>
                <h1 className='welcome-to-betabase-header'>Sign up for Betabase!</h1>
                <div className='email-password-container'>
                    <p>Email: </p>
                    <input value={user} onChange={setUserHandler} />
                    <p>Password: </p>
                    <input value={pass} onChange={setPassHandler} />
                </div>

                {error && <p className='register-error-message'>{error}</p>}

                <div className='seperator-block'>
                    <button onClick={submitHandler} className='submit-button'>Sign Up</button>
                    <p className='or-text'>or</p>
                    <p className='sign-in-text'>Sign in with Google</p>
                </div>
                <GoogleSignIn />
            </div>
        </div>
    );
};