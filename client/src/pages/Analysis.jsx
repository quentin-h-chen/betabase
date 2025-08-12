import './Analysis.css'
import ClimbsPerGrade from '../components/ClimbsPerGrade';
import ClimbsPerTypeChart from '../components/ClimbsPerType';
import AvgAttemptsPerGradeChart from '../components/AttemptsPerGrade';
import ClimbsPerGymChart from '../components/ClimbsPerGym';
import ClimbStyleChart from '../components/ClimbStyleChart';
import CurrentClimbingLevel from '../components/CurrentClimbingLevel';
import { useState } from 'react';

export default function Analysis({ climbs }) {
    const [showToolTip, setShowToolTip] = useState(false);

    return (
        <div className='analysis-page'>
            <div className='title-container'>
                <h2>Personal Analysis</h2>
            </div>
            <div className='analysis-container'>
               <h3 className='category-header'>Performance</h3>
                <div className='personal-performance-container'>
                    <div className='climbing-level-chart'>
                        <h3 className='climbing-level-header'>
                            Climbing Level
                            <span
                            className='info-icon'
                            onMouseEnter={() => setShowToolTip(true)}
                            onMouseLeave={() => setShowToolTip(false)}
                            aria-label="Info about current climbing level"
                            role="button"
                            tabIndex={0}
                            onFocus={() => setShowToolTip(true)}
                            onBlur={() => setShowToolTip(false)}
                        >
                            ℹ️
                            {showToolTip && (
                                <div className='tooltip'>
                                    Highest grade with 3+ routes completed
                                </div>
                            )}
                        </span>
                        </h3>
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
                <h3 className='category-header'>Efficiency</h3>
                <div className='row-1'>
                    <div className='attempts-per-grade-chart'>
                        <p className='chart-header'>Average Number of Attempts Per Grade</p>
                        <AvgAttemptsPerGradeChart climbs={climbs} />
                    </div>
                </div>
                
                <h3 className='category-header'>Location & Variety</h3>
                <div className='row-3'>
                    <div className='climbs-per-gym-chart'>
                        <p className='chart-header'>Number of Climbs Per Gym</p>
                        <ClimbsPerGymChart climbs={climbs} />
                    </div>
                    
                    <div className='climbs-per-type-chart'>
                        <p className='chart-header'>Number of Climbs Per Type</p>
                        <ClimbsPerTypeChart climbs = {climbs} />
                    </div>
                </div>
            </div>
        </div>
    );
};