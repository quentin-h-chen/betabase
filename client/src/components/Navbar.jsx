import { NavLink } from 'react-router-dom';
import './Navbar.css';
import ProfileDropdown from './ProfileDropdown';
import { useState } from 'react';

/**
 * Navigation Component
 * 
 * Displays navigation bar
 * Contains:
 * - Betabase logo, navigation links, and user profile dropdown 
 * - Replaces navigation links with hamburger dropdown menu for phone screen sizes
 */
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <button 
                    className='hamburger'
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label='Toggle menu'
            >
                ☰
            </button>
            <img src='/betabase-logo.png' alt='betabase-logo' className='betabase-logo' />
            <div className='navbar-content'>
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <li><NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                    <li><NavLink to="/climbs" className={({ isActive }) => isActive ? 'active' : ''}>Climbs</NavLink></li>
                    <li><NavLink to="/analysis" className={({ isActive }) => isActive ? 'active' : ''}>Analysis</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>
                </ul>
                <ProfileDropdown />
            </div>
        </nav>
    )
};