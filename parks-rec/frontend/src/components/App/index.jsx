import { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import HomePage from '../HomePage'
import DetailsPage from '../DetailsPage'
import SearchPage from '../SearchPage'
import Gallery from '../Gallery';
import './styles.css';

function App() {
  const [parks, setParks] = useState([]);
  const [detailsData, setDetailsData] = useState({})

  // Define an async function to query the API & JSONify the response  
  async function getData(url) {
      const res = await fetch(url)
      const { data } = await res.json()
      setParks(parks.concat(data))
  }

  // Query the API on component mount, and get 50 Parks.
  useEffect(() => {
      getData('https://developer.nps.gov/api/v1/parks?limit=50&start=0&api_key=UOdct2cZxW8G7nCXedCKcy7sofVSQiDbskbENcXg')
  }, [])

  return (
    <>
      {/* The Nav Bar */}
        <nav className="bg-gray-200 py-4 px-6 flex justify-between items-center">

          <div className="flex items-center"> 
            <Link to="/">
              <h2 className="text-lg font-bold text-gray-700 px-3">Parks & Rec</h2>
            </Link>
          </div>

          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search National Parks..."
              className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
            />
            <Link to="/search">
              <button className="bg-gray-300 text-gray-700 rounded-md py-2 px-4 ml-2 focus:outline-none">
                Search
              </button>
            </Link>
          </div>

        </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={
          <HomePage
            parks={parks}
            getData={getData}
            setDetailsData={setDetailsData}
          />}
        />
        <Route path="/search" element={<SearchPage setDetailsData={setDetailsData} />} />
        <Route path="/details" element={<DetailsPage {...detailsData} />} />
      </Routes>
      </>
  );
}

export default App;
