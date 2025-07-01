import './Login.css';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import GoogleSignIn from '../components/GoogleSignIn';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const setUserHandler = (e) => {
        setUser(e.target.value);
    }

    const setPassHandler = (e) => {
        setPass(e.target.value);
    }

    const submitHandler = async() => {
        try {
            await signInWithEmailAndPassword(auth, user, pass);
            alert("Signed in successfully");
            navigate('/home')
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className='login-page'>
            <div className='login-container'>
                <h1>Welcome Back!</h1>
                <p>Sign in with Email and Password</p>
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