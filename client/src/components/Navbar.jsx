import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar">
            <h1 className="logo">Betabase</h1>
            <ul className="nav-links">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/climbs">Climbs</Link></li>
                <li><Link to="/analysis">Analysis</Link></li>
            </ul>
        </nav>
    )
};