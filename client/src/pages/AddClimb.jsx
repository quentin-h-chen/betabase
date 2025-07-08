import './AddClimb.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AddClimb({ onAddClimb }) {
    const [grade, setGrade] = useState('');
    const [type, setType] = useState('');
    const [attempts, setAttempts] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newClimb = { grade, type, attempts, location, date, note };

        if (onAddClimb) {
            onAddClimb(newClimb);
        }

        navigate('/climbs');
    };

    return(
        <div className='add-climb-page'>
            <form className='climb-form' onSubmit={handleSubmit}>

                <div className='inputs'>
                    <h2 className='add-climb-header'>Add Your Climb</h2>
                    <label className='climb-label'>Grade:</label>
                    <input value={grade} onChange={(e) => setGrade(e.target.value)} required />

                    <label className='climb-label'>Type:</label>
                    <input value={type} onChange={(e) => setType(e.target.value)} required />

                    <label className='climb-label'># of Attempts:</label>
                    <input value={attempts} onChange={(e) => setAttempts(e.target.value)} required />

                    <label className='climb-label'>Location:</label>
                    <input value={location} onChange={(e) => setLocation(e.target.value)} required />

                    <label className='climb-label'>Date:</label>
                    <input value={date} onChange={(e) => setDate(e.target.value)} required />

                    <label className='climb-label'>Note:</label>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} required />
                </div>

                <button type='submit' className='submit-form'>Add Climb</button>
            </form>
        </div>
    );
}