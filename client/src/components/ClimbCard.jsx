import { useState } from 'react';
import './ClimbCard.css';

export default function ClimbCard( { grade, type, attempts, location, date, note, videoUrl, onDelete } ) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Helper to extract YouTube video ID from URL
    const getYouTubeID = (url) => {
        if (!url) return null;
        const regExp = /^.*(?:youtu.be\/|youtube.com\/(?:shorts\/|embed\/|watch\?v=|v\/))([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[1].length === 11) ? match[1] : null;
    }

    // Extract video ID from passed videoUrl prop
    const videoID = getYouTubeID(videoUrl);

    console.log('videoUrl:', videoUrl, 'videoID:', videoID);
    
    const getGradeClass = (grade) => {
        if (["V0", "V1"].includes(grade)) return "vb-v1-climb-card";
        if (["V2", "V3", "V4"].includes(grade)) return "v2-v4-climb-card";
        if (["V5", "V6", "V7"].includes(grade)) return "v5-v7-climb-card";
        if (["V8", "V9"].includes(grade)) return "v8-v9-climb-card";
        if (["V10", "V11", "V12", "V13", "V14", "V15", "V16", "V17"].includes(grade)) return "v10-climb-card";
    };

    const gradeClass = getGradeClass(grade)

    const climbTypeToImage = {
        overhang: "/public/default-overhang.jpg",
        roof: "/public/default-roof.jpg",
        slab: "/public/default-slab.jpg",
    };

    const imageUrl = climbTypeToImage[type.toLowerCase()] 
    
    return (
        <>
            <div className={`climb-card ${gradeClass}`} onClick={() => setIsModalOpen(true)}>
                <img src={imageUrl} alt={`${type} climb`} className='route-image' />
                <div className='card-info'>
                    <p><strong>Grade:</strong> {grade}</p>
                    <p><strong>Type:</strong> {type}</p>
                    <p><strong># of Attempts:</strong> {attempts}</p>
                    <p className='location'><strong>Location:</strong> {location.trim()}</p>
                    <p><strong>Date:</strong> {date}</p>
                    <p className='note'><strong>Note:</strong> {note}</p>
                </div>
                <div className='delete'>
                    <button 
                        className='delete-button' 
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className='note-modal' onClick={() => setIsModalOpen(false)}>
                    <div className='note-modal-content' onClick={(e) => e.stopPropagation()}>
                        <div className='note-modal-text'>
                            <p className='climb-notes-label'>More Info</p> 
                            <p><strong>Location:</strong> {location}</p>
                            <p><strong>Note:</strong> {note}</p>
                        </div>
                        {videoID && (
                            <div className='video-container'>
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoID}`}
                                    title='Your Beta'
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )}
                        <button onClick={() => setIsModalOpen(false)}>Close</button>
                    </div>
                </div>
                
            )}
        </>
    );
}