import './SidebarFilter.css'
import LocationAutocomplete from './LocationAutocomplete';

import { useState } from 'react'

export default function SidebarFilter({ onFilter }) {
    const [minGrade, setMinGrade] = useState('');
    const [maxGrade, setMaxGrade] = useState('');
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [minAttempts, setMinAttempts] = useState('');
    const [maxAttempts, setMaxAttempts] = useState('');
    const [filterLocation, setFilterLocation] = useState('');


    const handleFilter = () => {
        onFilter({
            minGrade, 
            maxGrade,
            types: selectedTypes,
            minAttempts, 
            maxAttempts,
            location: filterLocation
        });
    };

    return (
        <div className='sidebar'>
            <h2>Filter</h2>
            <hr />

            <div className='filter-group'>
                <label>Grade</label>
                <div className='grade-range'>
                    <select className="select-grade" value={minGrade} onChange={(e) => setMinGrade(e.target.value)}>
                        <option value="">Any</option>
                        <option value="VB">VB</option>
                        <option value="V0">V0</option>
                        <option value="V1">V1</option>
                        <option value="V2">V2</option>
                        <option value="V3">V3</option>
                        <option value="V4">V4</option>
                        <option value="V5">V5</option>
                        <option value="V6">V6</option>
                        <option value="V7">V7</option>
                        <option value="V8">V8</option>
                        <option value="V9">V9</option>
                        <option value="V10">V10</option>
                        <option value="V11">V11</option>
                        <option value="V12">V12</option>
                        <option value="V13">V13</option>
                        <option value="V14">V14</option>
                        <option value="V15">V15</option>
                        <option value="V16">V16</option>
                        <option value="V17">V17</option>
                    </select>
                    <span> - </span>
                    <select className="select-grade" value={maxGrade} onChange={(e) => setMaxGrade(e.target.value)}>
                        <option value="">Any</option>
                        <option value="VB">VB</option>
                        <option value="V0">V0</option>
                        <option value="V1">V1</option>
                        <option value="V2">V2</option>
                        <option value="V3">V3</option>
                        <option value="V4">V4</option>
                        <option value="V5">V5</option>
                        <option value="V6">V6</option>
                        <option value="V7">V7</option>
                        <option value="V8">V8</option>
                        <option value="V9">V9</option>
                        <option value="V10">V10</option>
                        <option value="V11">V11</option>
                        <option value="V12">V12</option>
                        <option value="V13">V13</option>
                        <option value="V14">V14</option>
                        <option value="V15">V15</option>
                        <option value="V16">V16</option>
                        <option value="V17">V17</option>
                    </select>
                </div>
            </div>

            <div className='filter-group'>
                <label>Type</label>
                <div className='checkbox-group'>
                    <label>
                        <input 
                            type='checkbox'
                            value='Overhang'
                            checked={selectedTypes.includes('Overhang')} 
                            onChange={(e) => {
                                const value = e.target.value;
                                if (selectedTypes.includes(value)) {
                                    setSelectedTypes(selectedTypes.filter(t => t !== value));
                                } else {
                                    setSelectedTypes([...selectedTypes, value]);
                                }
                            }}
                        />
                        Overhang
                    </label>
                    <label>
                        <input 
                            type='checkbox'
                            value='Roof'
                            checked={selectedTypes.includes('Roof')} 
                            onChange={(e) => {
                                const value = e.target.value;
                                if (selectedTypes.includes(value)) {
                                    setSelectedTypes(selectedTypes.filter(t => t !== value));
                                } else {
                                    setSelectedTypes([...selectedTypes, value]);
                                }
                            }}
                        />
                        Roof
                    </label>
                    <label>
                        <input 
                            type='checkbox'
                            value='Slab'
                            checked={selectedTypes.includes('Slab')} 
                            onChange={(e) => {
                                const value = e.target.value;
                                if (selectedTypes.includes(value)) {
                                    setSelectedTypes(selectedTypes.filter(t => t !== value));
                                } else {
                                    setSelectedTypes([...selectedTypes, value]);
                                }
                            }}
                        />
                        Slab
                    </label>
                </div>
            </div>

            <div className='filter-group'>
                <label># of Attempts</label>
                <div className='attempt-range'>
                    <input 
                        type='number' 
                        placeholder='0' 
                        value={minAttempts}
                        onChange={e => {
                            const val = e.target.value;
                            if (val === '') {
                                setMinAttempts('');
                                return;
                            }

                            const num = Number(val);

                            if (num >= 0 && num <= 10000) {
                                setMinAttempts(num);
                            }
                        }}
                        min="0"
                        max="10000"
                    />
                    <span> - </span>
                    <input 
                        type='number' 
                        placeholder='10000' 
                        value={maxAttempts}
                        onChange={e => {
                            const val = e.target.value;
                            if (val === '') {
                                setMaxAttempts('');
                                return;
                            }

                            const num = Number(val);

                            if (num >= 0 && num <= 10000) {
                                setMaxAttempts(num);
                            }
                        }}
                        min="0"
                        max="10000"
                    />
                </div>
            </div>

            <LocationAutocomplete filterLocation={filterLocation} setFilterLocation={setFilterLocation} />

            <div className='filter-group'>
                <label>Date</label>
                <input type='date' />
            </div>
            <div className='filter-group'>
                <button className='filter-button' onClick={handleFilter}>Filter</button>
            </div>
        </div>
    )
}