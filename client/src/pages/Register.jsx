import './Register.css';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import GoogleSignIn from '../components/GoogleSignIn';

/**
 * Register Page
 * 
 * Displays register form for users to create an account with email/password or Google OAuth (GoogleSignIn component)
 * Successful: User receives alert confirming registration
 */

export default function Register() {
    // State variables for user email and password
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    
    /**
     * Handles user email input change and updates user state
     * @param {Object} e - input change event
     */
    const setUserHandler = (e) => {
        setUser(e.target.value)
    }

    /**
     * Handles password input change and updates pass state
     * @param {Object} e - input change event
     */
    const setPassHandler = (e) => {
        setPass(e.target.value)
    }

    /**
     * Attempts to submit form and register user via Firebase Auth
     * Successful: displays confirmation alert
     * Firebase throws error
     */
    const submitHandler = async () => {
        await createUserWithEmailAndPassword(auth, user, pass);
        alert("You have been registered successfully!")
    }

    return (
        <div className='register-page'>
            <div className='register-container'>
                <h1>Welcome to Betabase!</h1>
                <p>Sign Up with Email and Password</p>
                <div className='email-password-container'>
                    <p>Email: </p>
                    <input value={user} onChange={setUserHandler} />
                    <p>Password: </p>
                    <input value={pass} onChange={setPassHandler} />
                </div>
                <div className='seperator-block'>
                    <button onClick={submitHandler} className='submit-button'>Submit</button>
                    <p className='or-text'>or</p>
                    <p className='sign-in-text'>Sign in with Google</p>
                </div>
                <GoogleSignIn />
            </div>
        </div>
    );
};