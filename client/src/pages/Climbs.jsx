import './Climbs.css'
import '../components/SidebarFilter'
import SidebarFilter from '../components/SidebarFilter';


export default function Climbs() {
    return (
        <div className='climbs-page'>
            <div className='climbs-main'>
                <div className='climbs-header'>
                    <h2>Your Climbs</h2>
                    <div className='tags-container'>
                        <label>VB-V1</label>
                        <div className='green-tag-bar' />
                        <label>V2-V4</label>
                        <div className='red-tag-bar' />
                        <label>V5-V7</label>
                        <div className='blue-tag-bar' />
                        <label>V8-V9</label>
                        <div className='purple-tag-bar' />
                        <label>V10+</label>
                        <div className='black-tag-bar' />
                    </div>
                    <div className='climbs-controls'>
                        <button>Add Climb</button>
                        <button>Sort</button>
                    </div>
                </div>
                <SidebarFilter />
                <div className='climbs-grid'></div>
            </div>
        </div>
    );
};