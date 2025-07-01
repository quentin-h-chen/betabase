import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../firebase/firebaseConfig';
import './GoogleSignIn.css'
import { useNavigate } from 'react-router-dom';

export default function GoogleSignIn() {
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            alert(`Welcome ${user.displayName}!`);
            console.log(user);
            navigate('/home')
        } catch (error) {
            console.log('Google Sign-In Error', error);
            alert(error.message);
        }
    }

    return (
        <button onClick={handleGoogleSignIn} className="google-button">
            Sign In
        </button>
    )
}