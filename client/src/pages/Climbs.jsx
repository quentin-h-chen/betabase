import './Climbs.css';
import SidebarFilter from '../components/SidebarFilter';
import ClimbCard from '../components/ClimbCard';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export default function Climbs({ climbs, setClimbs }) {
    const navigate = useNavigate();

    const handleDelete = async (climbId) => {
        try {
            await deleteDoc(doc(db, "climbs", climbId));
            setClimbs(prev => prev.filter(climb => climb.id !== climbId));
        } catch (error) {
            console.log("Failed to delete climb:", error);
        }
    };

    return (
        <div className='climbs-page'>
            <div className='climbs-main'>
                <div className='climbs-header'>
                    <h2>Your Climbs</h2>
                    <div className='tags-container'>
                        <label className='first-label'>VB-V1</label>
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
                        <button>Sort</button>
                    </div>
                </div>

                <SidebarFilter />

                <div className='climbs-grid'>
                    {climbs && climbs.length > 0 ? (
                        climbs.map((climb, index) => (
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