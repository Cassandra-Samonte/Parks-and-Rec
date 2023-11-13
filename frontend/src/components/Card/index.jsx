import { Link } from 'react-router-dom'

export default function Card({ parkData, updateDetails }) {

    // Declare variable
    let firstImage; 
    //  Check if .images exists and if there is at least one image
    if (parkData.images && parkData.images[0]) {
        // If an image exists, assign the first image to <img> tag and display first image
        firstImage = <img 
                className="w-80 h-60 m-1 mt-1 object-cover group-hover:opacity-50 transition-opacity duration-300 shadow-lg p-2"
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
            <Link to={"/details"} onClick={() => { updateDetails(parkData) }}>  
                <figure className="w-140 h-80 relative group shadow-lg bg-white p-3 hover:scale-105 bg-opacity-30">              
                        <div>
                            {firstImage}
                        </div>
                    <figcation>
                        <h4 className="text-center">
                            {parkData.name}
                        </h4>
                        <p className="text-center">
                            {parkData.designation}
                        </p>
                    </figcation>
                </figure>
            </Link>
        </>
    );
}