import { useState } from 'react'
import Card from '../Card'

export default function Gallery({ parks, refreshQueue, updateDetails }) {
    // Keep track of what gallery page the user is viewing
    const [currentPage, setCurrentPage] = useState(1)

    // Event handler for the next Page Button
    function getNextPage() {
        refreshQueue(`https://developer.nps.gov/api/v1/parks?limit=500&start=0&api_key=UOdct2cZxW8G7nCXedCKcy7sofVSQiDbskbENcXg&skip=${parks.length}`)
        setCurrentPage(currentPage + 1)
    }

    // Event handler for the Previous Page button
    function getPrevPage() {
        setCurrentPage(currentPage - 1)
    }


    // The default value of gallery content. What we see before the app finsihes querying the API
    let galleryContent = <p>National Parks are loading...</p>

    // Conditionally update the gallery content depending on the current page
    if (parks.length > 0 && currentPage > 1) {
        const nextPage = currentPage + 1
        galleryContent = parks
            .slice(currentPage * 20, nextPage * 20) // get the 20 images of the array we want to see
            .map((park, i) => <Card key={i} parkData={park} updateDetails={updateDetails} />) // map over the 20 images and render them in Card components
    } else if (parks.length > 0 && currentPage === 1) {
        galleryContent = parks
            .slice(0, 20) // get the first 20 parks when on the first page
            .map((park, i) => <Card key={i} parkData={park} updateDetails={updateDetails} />)
    }

    return (
        <>
            <div className="gallery">
                {galleryContent}
            </div>

            <div className='page-controls'>
                <button onClick={getPrevPage}>Previous Page</button>
                <button onClick={getNextPage}>Next Page</button>
            </div>
        </>
    )
}