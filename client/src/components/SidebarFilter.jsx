import './SidebarFilter.css'

export default function SidebarFilter() {
    return (
        <div className='sidebar'>
            <h2>Filter</h2>
            <hr />

            <div className='filter-group'>
                <label>Grade</label>
                <div className='grade-range'>
                    <input type='text' placeholder='V0' />
                    <span> - </span>
                    <input type='text' placeholder='V10+' />
                </div>
            </div>

            <div className='filter-group'>
                <label>Type</label>
                <div className='checkbox-group'>
                    <label><input type='checkbox' />Vertical</label>
                    <label><input type='checkbox' />Overhang</label>
                    <label><input type='checkbox' />Roof</label>
                    <label><input type='checkbox' />Slab</label>
                </div>
            </div>

            <div className='filter-group'>
                <label># of Attempts</label>
                <div className='attempt-range'>
                    <input type='text' placeholder='0' />
                    <span> - </span>
                    <input type='text' placeholder='1000' />
                </div>
            </div>

            <div className='filter-group'>
                <label>Location</label>
                <input type='text' placeholder='Enter Address' />
            </div>

            <div className='filter-group'>
                <label>Date</label>
                <input type='date' />
            </div>
            <div className='filter-group'>
                <button className='filter-button'>Filter</button>
            </div>
        </div>
    )
}