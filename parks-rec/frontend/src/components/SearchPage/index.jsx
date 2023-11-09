import { useState } from "react"
import Gallery from "../Gallery"
import searchVideo from '../../assets/search.mp4'; 


export default function SearchPage(props) {
    // Store search term and API data here
    const [query, setQuery] = useState('')
    const [queryResults, setQueryResults] = useState([])

    // Define an async function to query the API & JSONify the response
    async function getData(url, buttonName) {
        const res = await fetch(url)
        const { data } = await res.json() 
        if (buttonName === 'Next Page') {
            setQueryResults([...queryResults, ...data])
        } else {
            setQueryResults(data)
        }
    }

    function handleQuerySubmit(event) {
        // prevent the page reloading
        event.preventDefault()
        // send a request to the API with the query string 
        getData(`https://developer.nps.gov/api/v1/parks?limit=50&start=0&api_key=UOdct2cZxW8G7nCXedCKcy7sofVSQiDbskbENcXg&q=${query}`, event.target.innerText)
    }

    return (
            <>
            <div className="relative h-screen overflow-auto"> 
                <video autoPlay loop playsInline muted className="absolute w-full h-full object-cover">
                    <source src={searchVideo} type="video/mp4" />
                </video>

                {/* Overlay content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4"> 
                    <form onSubmit={handleQuerySubmit} className="text-center mb-8 bg-white bg-opacity-50 rounded-lg p-10"> 
                        <label htmlFor="search" className="block text-4xl font-bold text-white mb-4">Search National Parks</label> 
                        <input
                            className="p-2 w-3/4 md:w-1/2 rounded border border-gray-300 focus:outline-none focus:border-gray-500"
                            type="text" 
                            id="search" 
                            placeholder="Search National Parks..."
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <button
                            type="submit"
                            className="mx-1 px-4 py-2 text-gray-700 hover:text-white hover:bg-gray-800 bg-gray-300 rounded transition duration-200"
                        >
                            Search
                        </button>
                    </form>

                    <Gallery
                        parks={queryResults}
                        refreshQueue={getData}
                        url={`https://developer.nps.gov/api/v1/parks?limit=50&start=0&api_key=UOdct2cZxW8G7nCXedCKcy7sofVSQiDbskbENcXg&skip=${queryResults.length}`}
                        updateDetails={props.setDetailsData}
                    />
                </div>
            </div>
            </>

    )
}