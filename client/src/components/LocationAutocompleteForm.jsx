import './LocationAutocompleteForm.css'
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'
import { useRef } from 'react'

/**
 * LocationAutocompleteForm Component for AddClimb page
 * 
 * Displays Google Places autocomplete input to allow user to select a gym location
 * Updates parent componen with selected location
 * 
 * Props:
 * - location: string, storing location input
 * - setLocation: function, setter to update location in parent state
 */
export default function LocationAutocompleteForm({ location, setLocation }) {
    // Ref to access StandaloneSearchBox instance
    const inputRef = useRef(null);

    // Load Google Maps JavaScript API with places library
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries:["places"]
    });

    /**
     * Callback when user chooses option from autocomplete dropdown menu
     */
    const handleOnPlacesChanged = () => {
        const places = inputRef.current.getPlaces();
        if (places && places.length > 0) {
            const place = places[0];
            const name = place.name;
            const address = place.formatted_address;
            const fullLocation = name && address ? `${name}, ${address}` : name || address;
            setLocation(fullLocation);
        }
    };

    // Display loading message while Google Maps API is loading
    if (!isLoaded) return <div className='loading'>Loading...</div>;

    return(
        <div className='location-container'>
            <label>Location:</label>
            <StandaloneSearchBox
                onLoad={(ref) => inputRef.current = ref}
                onPlacesChanged={handleOnPlacesChanged}
            >
                <input 
                    type='text' 
                    placeholder='Enter Address'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)} 
                />
            </StandaloneSearchBox>
        </div>
    )
}
