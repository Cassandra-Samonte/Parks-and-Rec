import { useState, useEffect } from 'react';
import Gallery from '../Gallery';
import './styles.css';

function App() {
  const [parks, setParks] = useState([]);

// Define an async function to query the API & JSONify the response  
async function getData(url) {
    const res = await fetch(url)
    const { data } = await res.json()
    setParks(data)
}

// Query the API on component mount, and get 40 Parks.
useEffect(() => {
    getData('https://developer.nps.gov/api/v1/parks?limit=50&start=0&api_key=UOdct2cZxW8G7nCXedCKcy7sofVSQiDbskbENcXg')
}, [])

  return (
    <>
      <h1>Parks & Rec</h1>
      <Gallery parks={parks} />
    </>
  );
}

export default App;
