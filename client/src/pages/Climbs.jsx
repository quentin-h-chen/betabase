import './Climbs.css';
import SidebarFilter from '../components/SidebarFilter';
import ClimbCard from '../components/ClimbCard';
import { useNavigate } from 'react-router-dom';

export default function Climbs({ climbs, setClimbs }) {
    const navigate = useNavigate();

    const handleDelete = (indexToDelete) => {
        setClimbs((prev) => prev.filter((_, index) => index !== indexToDelete));
    };

    return (
        <div className='climbs-page'>
            <div className='climbs-main'>
                <div className='climbs-header'>
                    <h2>Your Climbs</h2>
                    <div className='tags-container'>
                        <label>VB-V1</label>
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
                        <button onClick={() => navigate('/add-climb')}>Add Climb</button>
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
                                location={climb.location}
                                date={climb.date}
                                note={climb.note} 
                                onDelete={()=> handleDelete(index)}
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