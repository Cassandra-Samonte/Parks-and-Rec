import { useState, useEffect } from 'react';
import Gallery from '../Gallery';
import DetailsPage from '../DetailsPage'
import './styles.css';

function App() {
  const [parks, setParks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)

  // Define an async function to query the API & JSONify the response  
  async function getData(url) {
      const res = await fetch(url)
      const { data } = await res.json()
      setParks(parks.concat(data))
  }

  // Query the API on component mount, and get 40 Parks.
  useEffect(() => {
      getData('https://developer.nps.gov/api/v1/parks?limit=50&start=0&api_key=UOdct2cZxW8G7nCXedCKcy7sofVSQiDbskbENcXg')
  }, [])

  return (
    <>
      <h1>Parks & Rec</h1>
      <Gallery parks={parks} refreshQueue={getData} />
      {parks.length > 0 && <DetailsPage {...parks[0]} />}

    </>
  );
}

export default App;
