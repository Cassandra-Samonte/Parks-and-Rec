import Gallery from '../Gallery'
import FooterSection from '../FooterSection'
// import browseVideo from '../../assets/browse.mp4'; 
import './styles.css';



export default function ParksPage(props) {
    const videoUrl = 'https://parksrec.s3.us-west-1.amazonaws.com/browse.mp4';

    return (
        <>
            <div className="relative overflow-hidden">
                <video autoPlay loop playsInline muted className="w-full" style={{ height: '90vh', objectFit: 'cover' }}>
                    <source src={videoUrl} type="video/mp4" />
                </video>
                {/* Overlay content */}
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <h1 className="text-white text-4xl font-bold">Discover Your Next Adventure</h1>
                </div>
            </div>
            <Gallery
                parks={props.parks}
                refreshQueue={props.getData}
                updateDetails={props.setDetailsData}
                url={`https://developer.nps.gov/api/v1/parks?limit=500&start=0&api_key=UOdct2cZxW8G7nCXedCKcy7sofVSQiDbskbENcXg&skip=${props.parks.length}`}
            />    
            <FooterSection />
        </>
    );
}