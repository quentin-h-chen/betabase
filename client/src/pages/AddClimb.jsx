import './AddClimb.css';
import LocationAutocompleteForm from '../components/LocationAutocompleteForm';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db, auth } from '../firebase/firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

export default function AddClimb({ onAddClimb }) {
    const [grade, setGrade] = useState('');
    const [type, setType] = useState('');
    const [attempts, setAttempts] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const user = auth.currentUser;
        if (!user) {
            alert("You must be logged in to add a climb!");
            return;
        }

        const newClimb = { grade, type, attempts, location, date, note, userId: user.uid };

        try {
            const docRef = await addDoc(collection(db, "climbs"), newClimb);

            if (onAddClimb) {
                onAddClimb({ id: docRef.id, ...newClimb });
            }

            navigate('/climbs');
        } catch (error) {
            console.error("Error adding climb to Firestore:", error);
        }
    };

    return(
        <div className='add-climb-page'>
            <form className='climb-form' onSubmit={handleSubmit}>
                <h2 className='add-climb-header'>Add Climb</h2>
                <div className='inputs'>
                    <div className='first-row'>
                        <div className='grade'>
                        <label className='climb-label'>Grade:</label>
                        <select value={grade} onChange={(e) => setGrade(e.target.value)} required>
                            <option value="" disabled>Select grade</option>
                            <option value="VB">VB</option>
                            <option value="V0">V0</option>
                            <option value="V1">V1</option>
                            <option value="V2">V2</option>
                            <option value="V3">V3</option>
                            <option value="V4">V4</option>
                            <option value="V5">V5</option>
                            <option value="V6">V6</option>
                            <option value="V7">V7</option>
                            <option value="V8">V8</option>
                            <option value="V9">V9</option>
                            <option value="V10">V10</option>
                            <option value="V11">V11</option>
                            <option value="V12">V12</option>
                            <option value="V13">V13</option>
                            <option value="V14">V14</option>
                            <option value="V15">V15</option>
                            <option value="V16">V16</option>
                            <option value="V17">V17</option>
                        </select>
                        </div>

                        <div className='type'>
                        <label className='climb-label'>Type:</label>
                        <select value={type} onChange={(e) => setType(e.target.value)} required>
                            <option value="" disabled>Select type</option>
                            <option value="Overhang">Overhang</option>
                            <option value="Slab">Slab</option>
                            <option value="Roof">Roof</option>
                        </select>
                        </div>

                        <div className='attempts'>
                            <label className='climb-label'># of Attempts:</label>
                            <input type='number' placeholder="0" min='1' max='10000' step='1' value={attempts} onChange={(e) => setAttempts(e.target.value)} required />
                        </div>
                    </div>

                    <div className='second-row'>
                        <LocationAutocompleteForm location={location} setLocation={setLocation} />

                        <div className='date'>
                            <label className='climb-label'>Date:</label>
                            <input type='date' value={date} onChange={(e) => setDate(e.target.value)} required />
                        </div>
                    </div>

                    <div className='note'>
                        <label className='climb-label'>Note:</label>
                        <textarea value={note} placeholder="Enter notes" onChange={(e) => setNote(e.target.value)} maxLength={150} />
                        <p>{note.length} / 150 characters</p>
                    </div>
                </div>

                <button type='submit' className='submit-form'>Add Climb</button>
            </form>
        </div>
    );
}