import { Link } from 'react-router-dom'

export default function Card({ parkData, updateDetails }) {

    // Declare variable
    let firstImage; 
    //  Check if .images exists and if there is at least one image
    if (parkData.images && parkData.images[0]) {
        // If an image exists, assign the first image to <img> tag and display first image
        firstImage = <img 
                src={parkData.images[0].url} 
                alt={parkData.images[0].altText} 
                title={parkData.images[0].title} 
            />;
    } else {
        // If there are no images, return 'No image available'
        firstImage = <p>No image available</p>;
    }
    

    return (
        <>
            <Link
                to={"/details"}
                onClick={() => { updateDetails(parkData) }}
            >                
                <figcaption>
                    <h1>{parkData.fullName}</h1>
                    <p>{parkData.description}</p>
                    <div>
                        {firstImage}
                    </div>
                </figcaption>
            </Link>
        </>
    );
}
