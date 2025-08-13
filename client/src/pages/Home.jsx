import './Home.css'
import { useNavigate } from 'react-router-dom';

/**
 * Home Page
 * 
 * Displays the landing page with a hero section, call to action buttons,
 * and a list of key features in the footer. The Get Started and
 * Learn More buttons utilize react-router's 'useNavigate' hook to
 * help users navigate to the Climbs and About page.
 */

export default function Home() {
    // Hook for navigation
    const navigate = useNavigate(); 

    return (
        <div className='home-page'>
            <div className='main-content'>
                <section className='hero'>
                    <p className='hero-text'>
                        Your stats.<br></br>
                        Your beta.<br></br>
                        Your journey.
                    </p>
                    <div className='start-buttons'>
                        <button className='btn-primary' onClick={() => navigate('/climbs')}>Get Started</button>
                        <button className='btn-secondary' onClick={() => navigate('/about')}>Learn More</button>
                    </div>
                </section>
            </div>

            <footer className='features-section'>
                <div className='features-container'>
                    <div className='feature'>
                        <h3>
                            <span class="material-symbols-outlined">check</span>
                            Track Sends
                        </h3>
                        <p>Log climbs with grade, style, number of attempts, etc.</p>
                    </div>
                    <div className='feature'>
                        <h3>
                            <span class="material-symbols-outlined">show_chart</span>
                            Analyze Progress
                        </h3>
                        <p>See your grade trends and progress</p>
                    </div>
                    <div className='feature'>
                        <h3>
                            <span class="material-symbols-outlined">play_arrow</span>
                            Review Beta
                        </h3>
                        <p>Store and watch videos of your sends</p>
                    </div>
                    <div className='feature'>
                        <h3>
                            <span class="material-symbols-outlined">trophy</span>
                            Reach Goals
                        </h3>
                        <p>Keep track of set and completed goals</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};