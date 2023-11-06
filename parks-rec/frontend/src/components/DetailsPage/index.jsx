import ReviewSection from '../ReviewSection'


export default function Details({ images, fullName, description, weatherInfo, id }) {

    return (
        <>
            <div>
                <h1>{fullName}</h1>
                <p>{description}</p>
                <p>{weatherInfo}</p>
                {/* Conditionally render images based on their existence */}
                {images && images.length > 0 && <img src={images[0].url} alt={images[0].altText} />}
                {images && images.length > 1 && <img src={images[1].url} alt={images[1].altText} />}
                {images && images.length > 2 && <img src={images[2].url} alt={images[2].altText} />}
            </div>
            <div className="bg-white p-4 rounded shadow-md w-[93vw]">
                <ReviewSection parkId={id} />
            </div>
        </>
    )
}