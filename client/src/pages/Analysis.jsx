import './Analysis.css'
import ClimbsPerGrade from '../components/ClimbsPerGrade';
import ClimbsPerTypeChart from '../components/ClimbsPerType';
import AvgAttemptsPerGradeChart from '../components/AttemptsPerGrade';
import ClimbsPerGymChart from '../components/ClimbsPerGym';
import GradesPerLocationChart from '../components/GradePerLocation';
import ClimbStyleChart from '../components/ClimbStyleChart';
import CurrentClimbingLevel from '../components/CurrentClimbingLevel';

export default function Analysis({ climbs }) {
    return (
        <div className='analysis-page'>
            <div className='title-container'>
                <h2>Analysis</h2>
            </div>
            <div className='analysis-container'>
               <h3 className='category-header'>Personal Performace</h3>
                <div className='personal-performance-container'>
                    <div className='climbing-level-chart'>
                        <CurrentClimbingLevel climbs={climbs} />
                    </div>
                    <div className='climbs-per-grade-chart'>
                        <p className='chart-header'>Number of Climbs Per Grade</p>
                        <ClimbsPerGrade climbs = {climbs} />
                    </div>
                    <div className='climbing-style-chart'>
                        <p className='chart-header'>Climbing Style</p>
                        <ClimbStyleChart climbs={climbs} />
                    </div>
                </div>
                <h3 className='category-header'>Difficulty & Grade Progression</h3>
                <div className='row-1'>
                    <div className='climbs-per-grade-chart'>
                        <p className='chart-header'>Number of Climbs Per Grade</p>
                        <ClimbsPerGrade climbs = {climbs} />
                    </div>

                    <div className='climbs-per-type-chart'>
                        <p className='chart-header'>Number of Climbs Per Type</p>
                        <ClimbsPerTypeChart climbs = {climbs} />
                    </div>
                </div>

                <h3 className='category-header'>Attempts & Efficiency</h3>
                <div className='row-2'>
                    <div className='attempts-per-grade-chart'>
                        <p className='chart-header'>Average Number of Attempts Per Grade</p>
                        <AvgAttemptsPerGradeChart climbs={climbs} />
                    </div>
                    <div className='top-flash-chart'>
                        <p className='chart-header'>Top Flash Percentage</p>
                    </div>
                </div>
                
                <h3 className='category-header'>Location & Variety</h3>
                <div className='row-3'>
                    <div className='climbs-per-gym-chart'>
                        <p className='chart-header'>Climbs Per Gym</p>
                        <ClimbsPerGymChart climbs={climbs} />
                    </div>
                    <div className='grade-per-location-chart'>
                        <p className='chart-header'>Highest Grade Per Location</p>
                        <GradesPerLocationChart climbs={climbs} />
                    </div>
                </div>
            </div>
        </div>
    );
};