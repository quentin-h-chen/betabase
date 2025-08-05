# Betabase 

**Betabase** is a personal indoor bouldering progress tracker. Users can log climbing routes, track progress, and see their stats over time.

## Features
- Firebase Firestore for realtime data storage and retrieval of climbing route information
- Firebase Authentication for personalized user experience
- Google Maps API integration for location input and filtering
- Filter your climbs by:
    - Grade (VB-V17)
    - Type (Overhang, Roof, Slab)
    - Number of Attempts
    - Gym Location
    - Date
- Add notes to each climb
- Delete climbs


## Tech Stack
- React.js, Vite
- HTML/CSS
- Firebase (auth and firestore)
- Google Maps JavaScript API

## Getting Started
To run locally:
```bash
cd client
npm install
npm install @react-google-maps/api

## Create .env inside client directory and add the following:
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

## Then run development server:
npm run dev