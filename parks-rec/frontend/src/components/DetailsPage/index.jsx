export default function Details({ fullName, description, images, weatherInfo }) {
    return (
        <div>
            <img src={images.url} alt={images.altText}/>
            <h1>{fullName}</h1>
            <p>{description}</p>
            <p>{weatherInfo}</p>
        </div>
    )
}
