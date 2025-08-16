import './Climbs.css';
import SidebarFilter from '../components/SidebarFilter';
import ClimbCard from '../components/ClimbCard';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useState, useEffect } from 'react';

/**
 * Climbs Page
 * 
 * Displays list of users climbs in 'climb cards' and allows filtering
 * - Filter by grade, type, attempts, location, and date
 * - Delete climbs from Firestore
 * - Plus button to add climb (navigates to Add Climb Page with add climb form)
 * 
 * Props
 * - climbs: array of climb objects (cards) in Firestore
 * - setClimbs: state setter used to make changes to climbs such as deletion
 */

export default function Climbs({ climbs, setClimbs }) {
    
    // Reac Router hook for navigation
    const navigate = useNavigate();

    // Stores filter settings
    const [filter, setFilter] = useState({});
    const [filterModalOpen, setFilterModalOpen] = useState(false);

    // Detect phone screen sizes
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 480);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /**
     * Handles deletion of climb document in Firestore by document ID
     * @param {string} climbId - document ID from Firestore of the specified climb
     */
    const handleDelete = async (climbId) => {
        try {
            await deleteDoc(doc(db, "climbs", climbId));
            // Remove specified climb from local state
            setClimbs(prev => prev.filter(climb => climb.id !== climbId));
        } catch (error) {
            console.log("Failed to delete climb:", error);
        }
    };

    /**
     * Handles updated filter object from SidebarFilter
     * @param {Object} newFilter - Filter settings from SidebarFilter component
     */
    const handleFilterChange = (newFilter) => {
        console.log("received filter", newFilter);
        setFilter(newFilter)
        if (isMobile) setFilterModalOpen(false);
    }

    /**
     * Converts string containing grade into an integer 
     * @param {string} grade - grade string ("V7")
     * @returns {number} number portion of grade (7 in "V7")
     */
    const gradeToNumber = (grade) => {
        const numberPart = grade.substring(1);
        return parseInt(numberPart);
    }

    /**
     * Filters climbs with selected filters
     * Returns climbs that match all selected filters
     */
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
                        {/* Mobile Filter Button */}
                        {isMobile && (
                            <button className='open-filter' onClick={() => setFilterModalOpen(true)}>
                                <span class="material-symbols-outlined">
                                    filter_list
                                </span>
                            </button>
                        )}
                        <button onClick={() => navigate('/add-climb')}>+</button>
                    </div>
                </div>

                {/* Desktop Sidebar Filter */}
                {!isMobile && <SidebarFilter onFilter={handleFilterChange} />}


                {/* Mobile Filter Modal */}
                {isMobile && filterModalOpen && (
                    <div className='modal-overlay' onClick={() => setFilterModalOpen(false)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <button className="close-btn" onClick={() => setFilterModalOpen(false)}>
                                &times;
                            </button>
                            <SidebarFilter onFilter={handleFilterChange} />
                        </div>
                    </div>
                )}


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
                                videoUrl={climb.videoUrl}
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