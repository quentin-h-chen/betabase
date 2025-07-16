import './Analysis.css'
import ClimbsPerGrade from '../components/ClimbsPerGrade';

export default function Analysis({ climbs }) {
    return (
        <div className='analysis-page'>
            <div className='analysis-container'>
                <h2>Analysis</h2>
                <div className='row-1'>
                    <div className='chart-1'>
                        <p>Number of Climbs Per Grade</p>
                        <ClimbsPerGrade climbs = {climbs} />
                    </div>

                    <div className='chart-2'>
                        <p>Number of Climbs Per Type</p>
                    </div>
                </div>

                <div className='row-2'>
                    <div className='chart-3'>
                        <p>Average Number of Attempts Per Grade</p>
                    </div>
                    <div className='chart-4'>
                        <p>Average Number of Attempts Per Grade</p>
                    </div>
                    <div className='chart-5'>
                        <p>Average Number of Attempts Per Grade</p>
                    </div>
                </div>
            </div>
        </div>
    );
};