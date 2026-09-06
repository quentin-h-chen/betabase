import { useState } from 'react';
import './ClimbCard.css';

/**
 * ClimbCard Component
 * 
 * Displays information about each climb in climb cards
 * Contains:
 * - Grade, type, attempts, location, date, notes, and an optional YouTube video link
 * - Delete button to delete climb card
 * - Modal popup for more info and embedded YouTube video
 * 
 * Props:
 * - grade: string
 * - type: string
 * - attempts: number of attempts
 * - location: string
 * - date: string
 * - note: string
 * - videoUrl: string
 * - onEdit: function to edit climb card
 * - onDelete: function to delete climb card
 */
export default function ClimbCard( { grade, type, attempts, location, date, note, videoUrl, onEdit, onDelete } ) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    /**
     * Helper to extract YouTube video ID from URL
     * or returns null if URL is invalid
     */
    const getYouTubeID = (url) => {
        if (!url) return null;
        const regExp = /^.*(?:youtu.be\/|youtube.com\/(?:shorts\/|embed\/|watch\?v=|v\/))([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[1].length === 11) ? match[1] : null;
    }

    // Extract video ID from passed videoUrl prop
    const videoID = getYouTubeID(videoUrl);

    // Truncate a text to the first `n` words with ellipsis
    const truncateWords = (text, n = 3) => {
        if (!text) return '';
        const words = text.trim().split(/\s+/);
        return words.length > n ? words.slice(0, n).join(' ') + '...' : text;
    }
    
    /**
     * Return CSS class name based on grade of climb card
     * Color grades cards by grade
     */
    const getGradeClass = (grade) => {
        if (["V0", "V1"].includes(grade)) return "vb-v1-climb-card";
        if (["V2", "V3", "V4"].includes(grade)) return "v2-v4-climb-card";
        if (["V5", "V6", "V7"].includes(grade)) return "v5-v7-climb-card";
        if (["V8", "V9"].includes(grade)) return "v8-v9-climb-card";
        if (["V10", "V11", "V12", "V13", "V14", "V15", "V16", "V17"].includes(grade)) return "v10-climb-card";
    };

    const gradeClass = getGradeClass(grade)

    // Assign default images to each climb type
    const climbTypeToImage = {
        overhang: "/default-overhang.jpg",
        roof: "/default-roof.jpg",
        slab: "/default-slab.jpg",
    };

    const imageUrl = climbTypeToImage[type.toLowerCase()] 
    
    return (
        <>
            <div className="climb-card" onClick={() => setIsModalOpen(true)}>
                <img src={imageUrl} alt={`${type} climb`} className='route-image' />
                <div className='card-info'>
                    <div className={`grade-badge ${gradeClass}`}>{grade}</div>
                    <p className='type-field'><strong>Type</strong> <span className="value">{type}</span></p>
                    <p className='attempts-field'><strong>Attempts</strong> <span className="value">{attempts}</span></p>
                    <p className='location'><strong>Location</strong> <span className="value">{location.trim()}</span></p>
                    <p className='date-field'><strong>Date</strong> <span className="value">{date}</span></p>
                    <p className='note'><strong>Note</strong> <span className="value">{note || 'None'}</span></p>
                </div>
                <div className='delete'>
                    <button 
                        className='edit-button' 
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit();
                        }}
                        aria-label="Edit Climb"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                    </button>
                    <button 
                        className='delete-button' 
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('ClimbCard delete clicked for', { grade, type, attempts, location, date });
                            try { onDelete(); } catch (err) { console.error('onDelete error', err); }
                        }}
                        aria-label="Delete Climb"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className='note-modal' onClick={() => setIsModalOpen(false)}>
                    <div className='note-modal-content' onClick={(e) => e.stopPropagation()}>
                        <div className='note-modal-text'>
                            <p><strong>Grade:</strong> {grade}</p>
                            <p><strong>Type:</strong> {type}</p>
                            <p><strong># of Attempts:</strong> {attempts}</p>   
                            <p><strong>Location:</strong> {location}</p>
                            <p><strong>Date:</strong> {date}</p>
                            <p><strong>Note:</strong> {note}</p>
                        </div>
                        {videoID ? (
                            <div className="video-container">
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoID}`}
                                    title="Your Beta"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        ) : (
                <div className="video-placeholder">
                    No video of climb added yet.
                </div>
            )}
                        <button className="modal-close-button" onClick={() => setIsModalOpen(false)}>
                            x
                        </button>
                    </div>
                </div>
                
            )}
        </>
    );
}