import { useEffect, useState } from "react";
import './ProfileDropdown.css';
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from "firebase/auth";

/**
 * ProfileDropdown Component
 * 
 * Displays dropdown menu 
 * Contains:
 * - User avatar
 * - Sign-in/sign-out button if user is logged in
 * - Sign-up button if user is not authenticated
 */

export default function ProfileDropdown() {
    // State variables to control drop down menu
    const [open, setOpen] = useState(false);

    // State variables to store authenticated user
    const [currentUser, setCurrentUser] = useState(null)

    // React router hook for navigation
    const navigate = useNavigate();

    /**
     * onAuthStateChanged listener
     * - Monitors authentication state
     * - Updates currentUser
     */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    /**
     * Redirect user to login page and close dropdown menu
     */
    const handleSignIn = () => {
        navigate('/login')
        setOpen(false);
    };

    /**
     * Redirect user to sign-up page and close dropdown menu
     */
    const handleSignUp = () => {
        navigate('/register')
        setOpen(false);
    }

    /**
     * Sign out user and close dropdown menu
     */
    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Sign out error:", error);
        }
        setOpen(false);
    };

    return (
        <div className="profile-dropdown">
            <img 
                src={currentUser?.photoURL || "/default-pic.png" }
                alt="profile" 
                className="avatar"
                onClick={() => setOpen(!open) } 
            />
            {open && (
                <div className="dropdown-menu">
                    {currentUser ? (
                        <>
                            <p className="user-text">{currentUser.displayName || currentUser.email}</p>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleSignIn}>Sign In</button>
                            <button onClick={handleSignUp}>Sign Up</button>
                        </>
                        )}
                </div>
            )}
        </div>
    );
}