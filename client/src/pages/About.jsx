import './About.css'

/**
 * About Page
 * 
 * Displays information about the creation of Betabase
 * - Mission statement
 * - Team
 * - Tools used to create Betabase
 */
export default function About() {
    return(
        <div className='about-page'>
            <div className='about-container'>
                    <div className='about-content'>
                        <div className='mission-container'>
                            <h2>The Mission</h2>
                            <p className='about-text'>
                                Track your indoor bouldering progress with ease. Store information about
                                any routes and videos showing your beta. Analyze your progression
                                and see how far you've come since the start of your journey with Betabase!
                            </p>
                        </div>

                        <div className='team-container'>
                            <h2>Meet the Team</h2>
                            <div className='team-grid'>
                                <img src='/qc2.JPEG' className='founder-picture'></img>
                                <h3>Quentin Chen</h3>
                                <p className='about-text'>
                                    Creator of Betabase and a Linguistics & Computer Science Major at UCLA. Started climbing in 2024 and fell in love
                                    with the sport through Hanger 18 and Sender One in Orange County, California.
                                </p>
                                <p>Founder | Developer | Designer</p>
                            </div>
                        </div>

                        <div className='tools-container'>
                            <h2>Tools</h2>
                            <p className='about-text'>
                                React.JS | Firebase | Google Maps API | Figma
                            </p>
                        </div>
                    </div>
            </div>
        </div>
    )
}

