import { useState } from "react";
import './ProfileDropdown.css';
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/login')
        setOpen(false);
    };

    const handleSignOut = () => {
        alert('Sign Out clicked');
        setOpen(false);
    };

    const handleChangePicture = () => {
        alert('Change Picture clicked');
        setOpen(false);
    };

    return (
        <div className="profile-dropdown">
            <img 
                src="/default-pic.png" 
                alt="profile" 
                className="avatar"
                onClick={() => setOpen(!open) } 
            />
            {open && (
            <div className="dropdown-menu">
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleSignOut}>Sign Out</button>
            <button onClick={handleChangePicture}>Change Picture</button>
            </div>
             )}
        </div>
    )
}