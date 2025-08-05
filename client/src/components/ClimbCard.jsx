import './ClimbCard.css'

export default function ClimbCard( {grade, type, attempts, location, date, note, onDelete} ) {
    const getGradeClass = (grade) => {
        if (["VB", "V0", "V1"].includes(grade)) return "vb-v1-climb-card";
        if (["V2", "V3", "V4"].includes(grade)) return "v2-v4-climb-card";
        if (["V5", "V6", "V7"].includes(grade)) return "v5-v7-climb-card";
        if (["V8", "V9"].includes(grade)) return "v8-v9-climb-card";
        if (["V10", "V11", "V12", "V13", "V14", "V15", "V16", "V17"].includes(grade)) return "v10-climb-card";
    };

    const gradeClass = getGradeClass(grade)
    
    return (
        <div className={`climb-card ${gradeClass}`}>
            <img src='/climbcardexample.jpg' alt='bouldering-route' className='route-image' />
            <div className='card-info'>
                <p><strong>Grade:</strong> {grade}</p>
                <p><strong>Type:</strong> {type}</p>
                <p><strong># of Attempts:</strong> {attempts}</p>
                <p className='location'><strong>Location:</strong> {location.trim()}</p>
                <p><strong>Date:</strong> {date}</p>
                <p className='note'><strong>Note:</strong> {note}</p>
            </div>
            <div className='delete'>
                <button className='delete-button' onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
}