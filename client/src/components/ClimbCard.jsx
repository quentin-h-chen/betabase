import './ClimbCard.css'

export default function ClimbCard( {grade, type, location, date, note} ) {
    const getGradeClass = (grade) => {
        if (["VB", "V0", "V1"].includes(grade)) return "vb-v1-climb-card";
        if (["V2", "V3", "V4"].includes(grade)) return "v2-v4-climb-card";
        if (["V5", "V6", "V7"].includes(grade)) return "v5-v7-climb-card";
        if (["V8", "V9"].includes(grade)) return "v8-v9-climb-card";
        if (["V10", "V11", "V12", "V13", "V14", "V15", "V16", "V17"].includes(grade)) return "v10-climb-card";
    };

    const gradeClass = getGradeClass(grade)
    
    return (
        <div className={` climb-card ${gradeClass}`}>
            <img src='/example.jpg' alt='bouldering-route' className='route-image' />
            <p><strong>Grade:</strong> {grade}</p>
            <p><strong>Type:</strong> {type}</p>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Note:</strong> {note}</p>
        </div>
    );
}