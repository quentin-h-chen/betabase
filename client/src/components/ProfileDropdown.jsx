import { useEffect, useState } from "react";
import './ProfileDropdown.css';
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function ProfileDropdown() {
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleSignIn = () => {
        navigate('/login')
        setOpen(false);
    };

    const handleSignUp = () => {
        navigate('/register')
        setOpen(false);
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            alert('Signed out successfully');
        } catch (error) {
            alert(error.message);
        }
        setOpen(false);
    };

    const handleChangePicture = () => {
        alert('Change Picture clicked');
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