import './LocationAutocomplete.css'
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'
import { useRef } from 'react'

export default function LocationAutocomplete({filterLocation, setFilterLocation}) {
    const inputRef = useRef(null);
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries:["places"]
    });

    const handleOnPlacesChanged = () => {
        const places = inputRef.current.getPlaces();
        if (places && places.length > 0) {
            const place = places[0];
            const name = place.name;
            const address = place.formatted_address;
            const fullLocation = name && address ? `${name}, ${address}` : name || address;
            setFilterLocation(fullLocation);
        }
    };
    
    if (!isLoaded) return <div className='loading'>Loading...</div>;
    
    return(
        <div className='search-container'>
            <label>Location</label>
            <StandaloneSearchBox
                onLoad={(ref) => inputRef.current = ref}
                onPlacesChanged={handleOnPlacesChanged}
            >
                <input 
                    type='text' 
                    placeholder='Enter Address' 
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                />
            </StandaloneSearchBox>
        </div>
    )
}
