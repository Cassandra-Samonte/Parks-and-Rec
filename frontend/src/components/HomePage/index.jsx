import React from 'react';
import FooterSection from '../FooterSection'
import homeVideo from '../../assets/video.mp4'; 

export default function HomePage({ news }) {
    return (
      <>
        {/* Video */}
        <div className="relative overflow-hidden">
            <video autoPlay loop playsInline muted className="w-full" style={{ height: '90vh', objectFit: 'cover' }}>
                <source src={homeVideo} type="video/mp4" />
                {/* <source src="https://drive.google.com/uc?export=download&id=1fj03ZjDtdz_7bFeNcLoaQzSiiyaxoYEG" type="video/mp4" /> */}
            </video>
            {/* Overlay content */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold">Explore the Great Outdoors</h1>
            </div>
        </div>


        {/* News Articles */}
        <div className="pt-6 px-20 pb-20">
            <h1 className="text-left font-semibold text-lg pt-8">Latest News</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {/* Map over news array to create individual news article elements */}
                {news.slice(0, 8).map((article) => (
                    <div key={article.id} className="flex flex-col bg-white overflow-hidden shadow-lg">
                        <div className="w-full h-56 bg-white p-4 shadow-lg">
                            {/* Logical OR operator sets alt text to 'News image' if altText does not exist */}
                            <img src={article.image.url} alt={article.image.altText || 'News image'} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex-grow">
                            <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                            <button onClick={() => window.open(article.url, '_blank', 'noopener noreferrer')} className="mt-auto">
                                Read More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* <div className="pt-6 px-20">
            <h1 className="text-left font-semibold text-lg pt-8">Alerts</h1>
        </div> */}

        <FooterSection />
      </>
    );
}