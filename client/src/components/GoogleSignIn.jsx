import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../firebase/firebaseConfig';
import './GoogleSignIn.css'

export default function GoogleSignIn() {
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            alert(`Welcome ${user.displayName}!`);
            console.log(user);
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