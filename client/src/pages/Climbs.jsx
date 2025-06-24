import './Climbs.css'
import '../components/SidebarFilter'
import SidebarFilter from '../components/SidebarFilter';
import ClimbCard from '../components/ClimbCard';

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
                <div className='climbs-grid'>
                    <ClimbCard grade="V2" type="Overhang" location="Hanger 18, Orange" date="06/10/2025" note="The crux is a cross reach for a crimp" />
                    <ClimbCard grade="V8" type="Overhang" location="Rockreation, Santa Ana" date="06/13/2025" note="Very endurance heavy" />
                    <ClimbCard grade="V7" type="Overhang" location="Rockreation, Santa Ana" date="06/13/2025" note="Very endurance heavy" />
                    <ClimbCard grade="V1" type="Overhang" location="Rockreation, Santa Ana" date="06/13/2025" note="Very endurance heavy" />
                    <ClimbCard grade="V4" type="Overhang" location="Rockreation, Santa Ana" date="06/13/2025" note="Very endurance heavy" />
                    <ClimbCard grade="V9" type="Overhang" location="Rockreation, Santa Ana" date="06/13/2025" note="Very endurance heavy" />
                    <ClimbCard grade="V10" type="Overhang" location="Rockreation, Santa Ana" date="06/13/2025" note="Very endurance heavy" />
                    <ClimbCard grade="V3" type="Overhang" location="Rockreation, Santa Ana" date="06/13/2025" note="Very endurance heavy" />
                    <ClimbCard grade="V5" type="Overhang" location="Rockreation, Santa Ana" date="06/13/2025" note="Very endurance heavy" />
                    <ClimbCard grade="V6" type="Overhang" location="Rockreation, Santa Ana" date="06/13/2025" note="Very endurance heavy" />
                    <ClimbCard grade="V13" type="Overhang" location="Rockreation, Santa Ana" date="06/13/2025" note="Very endurance heavy" />
                </div>
            </div>
        </div>
    );
};