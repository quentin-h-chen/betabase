import './Analysis.css'
import ClimbsPerGrade from '../components/ClimbsPerGrade';
import ClimbsPerTypeChart from '../components/ClimbsPerType';
import AvgAttemptsPerGradeChart from '../components/AttemptsPerGrade';
import ClimbsPerGymChart from '../components/ClimbsPerGym';

export default function Analysis({ climbs }) {
    return (
        <div className='analysis-page'>
            <div className='title-container'>
                <h2>Analysis</h2>
            </div>
            <div className='analysis-container'>
               
                <h3>Difficulty & Grade Progression</h3>
                <div className='row-1'>
                    <div className='chart-1'>
                        <p className='chart-header'>Number of Climbs Per Grade</p>
                        <ClimbsPerGrade climbs = {climbs} />
                    </div>

                    <div className='chart-2'>
                        <p className='chart-header'>Number of Climbs Per Type</p>
                        <ClimbsPerTypeChart climbs = {climbs} />
                    </div>
                </div>

                <h3>Attempts & Efficiency</h3>
                <div className='row-2'>
                    <div className='chart-3'>
                        <p className='chart-header'>Average Number of Attempts Per Grade</p>
                        <AvgAttemptsPerGradeChart climbs = {climbs} />
                    </div>
                    <div className='chart-4'>
                        <p className='chart-header'>Top Flash Percentage</p>
                    </div>
                </div>
                
                <h3>Location & Variety</h3>
                <div className='row-3'>
                    <div className='chart-5'>
                        <p className='chart-header'>Climbs Per Gym</p>
                        <ClimbsPerGymChart climbs = {climbs} />
                    </div>
                    <div className='chart-6'>
                        <p className='chart-header'>Highest Grade Per Location</p>
                    </div>
                </div>

                <h3>Time-based Trends</h3>
                <div className='row-4'>
                    <div className='chart-7'>
                        <p className='chart-header'>Monthly Send Count</p>
                    </div>
                </div>

                <h3>Personal Performace</h3>
                <div className='row-5'>
                    <div className='chart-8'>
                        <p className='chart-header'>Climbing Style</p>
                    </div>
                    <div className='chart-9'>
                        <p className='chart-header'>Highest Grades</p>
                    </div>
                </div>
            </div>
        </div>
    );
};