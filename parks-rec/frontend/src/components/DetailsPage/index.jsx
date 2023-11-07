import ReviewSection from '../ReviewSection'
import './styles.css';


export default function Details({ images, fullName, description, weatherInfo, id }) {

    return (
            <>
                <div>


                    <div className="relative overflow-hidden">
                        {images && images.length > 0 && (
                            <img
                                src={images[0].url}
                                alt={images[0].altText}
                                className="w-full object-cover" 
                                style={{ height: '90vh' }} 
                            />
                        )}

                        {/* Overlay content */}
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <h1 className="text-white text-4xl font-bold">{fullName}</h1>
                        </div>
                    </div>

                    <p>{description}</p>
                    <p>{weatherInfo}</p>

                </div>
                {/* Conditionally render images based on their existence */}
                {/* {images && images.length > 0 && <img src={images[0].url} alt={images[0].altText} />}
                {images && images.length > 1 && <img src={images[1].url} alt={images[1].altText} />}
                {images && images.length > 2 && <img src={images[2].url} alt={images[2].altText} />} */}

                <div className="bg-white p-4 rounded shadow-md w-[100vw]">
                    <ReviewSection parkId={id} />
                </div>
            
            </>
    )
}