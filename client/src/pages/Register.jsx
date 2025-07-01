import './Register.css';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import GoogleSignIn from '../components/GoogleSignIn';

export default function Register() {
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    
    const setUserHandler = (e) => {
        setUser(e.target.value)
    }

    const setPassHandler = (e) => {
        setPass(e.target.value)
    }

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