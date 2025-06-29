import { NavLink } from 'react-router-dom';
import './Navbar.css';
import ProfileDropdown from './ProfileDropdown';

export default function Navbar() {
    return (
        <nav className="navbar">
            <img src='/betabase-logo.png' alt='betabase-logo' className='betabase-logo' />
            <div className='navbar-content'>
                <ul className="nav-links">
                    <li><NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                    <li><NavLink to="/climbs" className={({ isActive }) => isActive ? 'active' : ''}>Climbs</NavLink></li>
                    <li><NavLink to="/analysis" className={({ isActive }) => isActive ? 'active' : ''}>Analysis</NavLink></li>
                </ul>
                <ProfileDropdown />
            </div>
        </nav>
    )
};