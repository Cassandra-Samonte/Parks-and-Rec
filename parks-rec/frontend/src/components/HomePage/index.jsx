import React from 'react';
import myVideo from '../../assets/video.mp4'; 

export default function HomePage({ news }) {
    return (
      <>
        <div className="relative overflow-hidden">
        {/* Hero video */}
        <video 
            autoPlay 
            loop 
            playsInline 
            muted
            className="w-full"
            style={{ height: '90vh', objectFit: 'cover' }}
        >
            <source src={myVideo} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        {/* Overlay content */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold">Welcome to Parks & Rec</h1>
        </div>
        </div>


        {/* News Articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {news.filter(article => article.image && article.image.url).slice(0, 4).map((article) => (
            <a href={article.url} key={article.id} target="_blank" rel="noopener noreferrer" className="block bg-white shadow-md overflow-hidden">
              <div className="w-full h-48">
                <img src={article.image.url} alt={article.image.altText || 'News image'} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                <p className="text-gray-700 text-sm">{article.abstract}</p>
              </div>
            </a>
          ))}
        </div>
      </>
    );
}
