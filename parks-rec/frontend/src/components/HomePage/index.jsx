import React from 'react';
import homeVideo from '../../assets/video.mp4'; 

export default function HomePage({ news }) {
    return (
      <>
        {/* Video */}
        <div className="relative overflow-hidden">
            <video autoPlay loop playsInline muted className="w-full" style={{ height: '90vh', objectFit: 'cover' }}>
                <source src={homeVideo} type="video/mp4" />
            </video>
            {/* Overlay content */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold">Explore the Great Outdoors</h1>
            </div>
        </div>


        {/* News Articles */}
        <div className="p-10">
            <h1 className="text-left font-semibold text-lg pt-8">Latest News</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {news.filter(article => article.image && article.image.url).slice(0, 4).map((article) => (
                    <div key={article.id} className="block bg-white overflow-hidden">
                        <div className="w-full h-2/4 relative group shadow-lg bg-white p-4 bg-opacity-30">
                            <img src={article.image.url} alt={article.image.altText || 'News image'} className="w-full h-full object-cover" />
    
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                                <button onClick={() => window.open(article.url, '_blank', 'noopener noreferrer')} >
                                    Read More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </>
    );
}
