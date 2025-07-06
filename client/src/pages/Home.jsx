import './Home.css'

export default function Home() {
    return (
        <div className='home-page'>
            <div className='home-grid'>
                <div className='container container1'>
                    <h2>Welcome to Betabase</h2>
                </div>
                <div className='container container2'>
                    <h2>Your Data</h2>
                </div>
                <div className='container container3'>
                    <h2>Recent Climbs</h2>
                </div>
            </div>
        </div>
    );
};