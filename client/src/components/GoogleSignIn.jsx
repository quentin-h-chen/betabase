import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../firebase/firebaseConfig';
import './GoogleSignIn.css'
import { useNavigate } from 'react-router-dom';

/**
 * GoogleSignIn Component
 * 
 * Displays button for user to sign in through Google OAuth
 * Sucessful:
 * - Displays welcome alert
 * - Redirects user to home page
 * Failure:
 * - Displays alert with error message
 */
export default function GoogleSignIn() {
    // React router hook for navigation
    const navigate = useNavigate();

    /**
     * handles Google sign-in with a Firebase popup
     */
    const handleGoogleSignIn = async () => {
        try {
            // Trigger popup
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