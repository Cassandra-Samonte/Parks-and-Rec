import { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import whiteLogo from '../../assets/logowhite.png'; 
import HomePage from '../HomePage'
import ParksPage from '../ParksPage'
import DetailsPage from '../DetailsPage'
import SearchPage from '../SearchPage'
import './styles.css';

function App() {
  const [parks, setParks] = useState([]);
  const [detailsData, setDetailsData] = useState({})
  const [news, setNews] = useState([]);

// Getting PARK data from API
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

// Getting NEWS data from API
  async function getNewsData(url) {
    const res = await fetch(url);          
    const { data } = await res.json();    
    const newsWithImages = data.filter(
      article => article.image && article.image.url 
    );
    setNews(newsWithImages); 
  }

    // Query the API on component mount, and get 50 Parks.
    useEffect(() => {
      getNewsData('https://developer.nps.gov/api/v1/newsreleases/?limit=50&start=0&api_key=UOdct2cZxW8G7nCXedCKcy7sofVSQiDbskbENcXg')
    }, [])


  return (
    <>
      {/* Nav Bar */}
      <nav className="absolute top-0 left-0 w-full bg-transparent py-4 px-6 flex justify-between items-center z-10">

        <div className="flex justify-between items-center w-full">
          <div className="w-full absolute inset-0 flex justify-center pt-3 pointer-events-none">
            <img src={whiteLogo} alt="Parks and Rec Logo" className="w-18 h-19 pointer-events-auto" />
          </div>

            <Link to="/">
              <h2 className="text-lg font-bold text-white px-3">Parks & Rec</h2>
            </Link>
        </div>
         
          <div className="flex items-center">
            <Link to="/parks">
              <button className="bg-white bg-opacity-50 text-gray-700 rounded-md py-2 px-2 ml-2 focus:outline-none min-w-max">
                US National Parks
              </button>
            </Link>
            <Link to="/search">
              <button className="bg-white bg-opacity-50 text-gray-700 rounded-md py-2 px-4 ml-2 focus:outline-none">
                Search
              </button>
            </Link>
        </div>

      </nav>

      {/* Routes */}
      <Routes>        
        <Route path="/parks" element={
          <ParksPage
            parks={parks}
            getData={getData}
            setDetailsData={setDetailsData}
          />}
        />
        <Route path="/" element={ <HomePage news={news} />} />
        <Route path="/search" element={<SearchPage setDetailsData={setDetailsData} />} />
        <Route path="/details" element={<DetailsPage {...detailsData} />} />
      </Routes>
      </>
  );
}

export default App;
