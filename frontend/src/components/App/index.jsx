import { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import whiteLogo from '../../assets/logowhite.png'; 
import HomePage from '../HomePage'
import ParksPage from '../ParksPage'
import DetailsPage from '../DetailsPage'
import SearchPage from '../SearchPage'
import AuthFormPage from '../AuthFormPage'
import './styles.css';

function App() {
  const [parks, setParks] = useState([]);
  const [detailsData, setDetailsData] = useState({})
  const [news, setNews] = useState([]);  
  // Initialize login status as false
  const [isLoggedIn, setIsLoggedIn] = useState(false);

// Fetch PARK data from API
  async function getData(url) {
    // Fetch request from URL 
      const res = await fetch(url)
      // Extract 'data' from JSON response
      const { data } = await res.json()
      // Update parks state with fetched data
      setParks(parks.concat(data))
  }

  // Query the API on component mount, and get 50 Parks.
  useEffect(() => {
      getData('https://developer.nps.gov/api/v1/parks?limit=50&start=0&api_key=UOdct2cZxW8G7nCXedCKcy7sofVSQiDbskbENcXg')
  }, [])

// Fetch NEWS data from API
  async function getNewsData(url) {
    const res = await fetch(url);          
    const { data } = await res.json();
    // To filter only the news articles with images:
    const newsWithImages = data.filter(
      // check if image exists, if null - article will not be included
      // if image exists and url exists include article 
      article => article.image && article.image.url 
    );
    // Update news state with filtered data
    setNews(newsWithImages); 
  }

    // Query the API on component mount, fetch news data
    useEffect(() => {
      getNewsData('https://developer.nps.gov/api/v1/newsreleases/?limit=50&start=0&api_key=UOdct2cZxW8G7nCXedCKcy7sofVSQiDbskbENcXg')
    }, [])

    // Check for a user token when the app loads
    useEffect(() => {
      // Retrieve user token from localStorage
      const token = localStorage.getItem('userToken');
      if (token) {
        // Update login status if token exists
        setIsLoggedIn(true);
      }
    }, []);

    // handleLogout function clears token from localStorage and updates the isLoggedIn state
    const handleLogout = () => {
      // remove token from localStorage
      localStorage.removeItem('userToken');
      // update login status to 'logged out'
      setIsLoggedIn(false);
    };


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
              <button className="bg-white bg-opacity-50 text-white rounded-md py-2 px-2 ml-2 focus:outline-none min-w-max">
                US National Parks
              </button>
            </Link>
            <Link to="/search">
              <button className="bg-white bg-opacity-50 text-white rounded-md py-2 px-4 ml-2 focus:outline-none">
                Search
              </button>
            </Link>

          {/* Render the Sign Up/Login or Logout button based on isLoggedIn state */}
            {/* Ternary conditional operator checks isLoggedIn state */}
            {/* Logical NOT operator inverts truthiness of isLoggedIn state */}
            {!isLoggedIn ? (
              <>
                {/* Show Sign Up only if not logged in */}
                <Link to="/auth/signup">
                  <button className="bg-white bg-opacity-50 text-white rounded-md py-2 px-4 ml-2 focus:outline-none min-w-max">
                    Sign Up
                  </button>              
                </Link>
                {/* Show Log In only if not logged in */}
                <Link to="/auth/login">
                  <button className="bg-white bg-opacity-50 text-white rounded-md py-2 px-4 ml-2 focus:outline-none min-w-max">
                    Log In
                  </button>
                </Link>
              </>
            ) : (
              // Show Log Out if logged in
              <button onClick={handleLogout} className="bg-white bg-opacity-50 text-white rounded-md py-2 px-4 ml-2 focus:outline-none min-w-max">
                Log Out
              </button>
            )}
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
        <Route path="/auth/:formType" element={<AuthFormPage setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
      </>
  )
}

export default App;