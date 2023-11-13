import React from 'react';
import whiteLogo from '../../assets/logowhite.png';
import background from '../../assets/background.jpg'; 

export default function FooterSection() {

  // Define the style object
  const footerStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat', 
    backgroundPosition: 'center', 
  };

  return (
        <>
            <div className="flex flex-col justify-center items-center p-36" style={footerStyle}>
                {/* <img src={whiteLogo} alt="Parks and Rec Logo" className="w-16 h-16 mb-4" /> */}
                <h1 className="text-white text-3xl font-bold">All Rights Reserved, &copy; 2023 Parks & Rec</h1>
            </div>
        </>
  );
}
