import { useState } from 'react'
import Card from '../Card'

export default function Gallery({ parks, refreshQueue, updateDetails, url }) {
    // Keep track of what gallery page the user is viewing
    const [currentPage, setCurrentPage] = useState(1)

    // Event handler for the next Page Button
    function getNextPage(event) {
        refreshQueue(url, event.target.innerText)
        setCurrentPage(currentPage + 1)
    }

    // Event handler for the Previous Page button
    function getPrevPage() {
        setCurrentPage(currentPage - 1)
    }


    // The default value of gallery content. What we see before the app finsihes querying the API
    let galleryContent = ""

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
            <div className="flex justify-center p-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                {galleryContent}
            </div>
            </div>

            <div className="pb-16">
                <button className="bg-gray-300" onClick={getPrevPage}>Previous Page</button>
                <button className="bg-gray-300" onClick={getNextPage}>Next Page</button>
            </div>
        </>
    );
}