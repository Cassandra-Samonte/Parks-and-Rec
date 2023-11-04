import { useState, useEffect } from 'react';
import Gallery from '../Gallery';
import './styles.css';

function App() {
  const [parks, setParks] = useState([]);

  // Define function to fetch data from API
  async function fetchData() {
    console.log('API Key:', process.env.REACT_APP_NPS_API_KEY);
    // Include the API key from .env
    const apiKey = process.env.REACT_APP_NPS_API_KEY; 
    const url = `https://developer.nps.gov/api/v1/parks?limit=500&start=0&api_key=${apiKey}`;

    try {
      const response = await fetch(url);
      const { data } = await response.json();
      setParks(data)
    } catch (error) {
      console.error("Failed to fetch parks:", error);
    }
  }

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []); 

  // Create the HTML using JSX for the App component
  return (
    <>
      <h1>Parks & Rec</h1>
      <Gallery parks={parks} />
    </>
  );
}

export default App;
