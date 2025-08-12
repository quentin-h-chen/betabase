import './Climbs.css';
import SidebarFilter from '../components/SidebarFilter';
import ClimbCard from '../components/ClimbCard';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useState } from 'react';

export default function Climbs({ climbs, setClimbs }) {
    const navigate = useNavigate();
    const [filter, setFilter] = useState({});

    const handleDelete = async (climbId) => {
        try {
            await deleteDoc(doc(db, "climbs", climbId));
            setClimbs(prev => prev.filter(climb => climb.id !== climbId));
        } catch (error) {
            console.log("Failed to delete climb:", error);
        }
    };

    const handleFilterChange = (newFilter) => {
        console.log("received filter", newFilter);
        setFilter(newFilter)
    }

    const gradeToNumber = (grade) => {
        const numberPart = grade.substring(1);
        return parseInt(numberPart);
    }

    const filteredClimbs = climbs.filter((climb) => {
        // Grade filter
        
        const climbGrade = gradeToNumber(climb.grade);
        const min = filter.minGrade ? gradeToNumber(filter.minGrade) : null;
        const max = filter.maxGrade ? gradeToNumber(filter.maxGrade) : null;

        if (min !== null && climbGrade < min) return false;
        if (max !== null && climbGrade > max) return false;

        // Type filter
        if (filter.types && filter.types.length > 0 && !filter.types.includes(climb.type)) return false;
        
        // Attempts filter   
        if (filter.minAttempts && climb.attempts < filter.minAttempts) return false;
        if (filter.maxAttempts && climb.attempts > filter.maxAttempts) return false;
        
        // Location filter
        if (filter.location && filter.location.trim() !== '') {
            const locationFilter = filter.location.toLowerCase();
            if (!climb.location.toLowerCase().includes(locationFilter)) return false;
        }

        // Date filter
        if (filter.date) {
            if (climb.date !== filter.date) return false;
        }

        return true;
    });

    return (
        <div className='climbs-page'>
            <div className='climbs-main'>
                <div className='climbs-header'>
                    <h2>Your Climbs</h2>
                    <div className='tags-container'>
                        <label className='first-label'>V0-V1</label>
                        <div className='green-tag-bar' />
                        <label>V2-V4</label>
                        <div className='red-tag-bar' />
                        <label>V5-V7</label>
                        <div className='blue-tag-bar' />
                        <label>V8-V9</label>
                        <div className='purple-tag-bar' />
                        <label>V10+</label>
                        <div className='black-tag-bar' />
                    </div>
                    <div className='climbs-controls'>
                        <button onClick={() => navigate('/add-climb')}>+</button>
                    </div>
                </div>

                <SidebarFilter onFilter={handleFilterChange} />

                <div className='climbs-grid'>
                    {filteredClimbs && filteredClimbs.length > 0 ? (
                        filteredClimbs.map((climb, index) => (
                            <ClimbCard
                                key={index}
                                grade={climb.grade}
                                type={climb.type}
                                attempts={climb.attempts}
                                location={climb.location}
                                date={climb.date}
                                note={climb.note || "None"} 
                                onDelete={()=> handleDelete(climb.id)}
                            />
                        ))
                    ) : (
                        <div className='no-climbs'>
                            <p className='message'>No climbs added yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};