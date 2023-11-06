import Gallery from '../Gallery'

export default function HomePage(props) {
    return (
        <>
            <h1>Browse National Parks Below!</h1>

            <Gallery
                parks={props.parks}
                refreshQueue={props.getData}
                updateDetails={props.setDetailsData}
                url={`https://developer.nps.gov/api/v1/parks?limit=500&start=0&api_key=UOdct2cZxW8G7nCXedCKcy7sofVSQiDbskbENcXg&skip=${props.parks.length}`}
            />
        </>
    )
}
