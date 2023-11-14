import React from 'react';
import background from '../../assets/background.jpg'; 

export default function FooterSection() {

  // Define a style object
  const footerStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat', 
    backgroundPosition: 'center', 
  };

  return (
        <>
            {/* Style attribute takes footerStyle object  */}
            <div className="flex flex-col justify-center items-center p-36" style={footerStyle}>
                <h1 className="text-white text-3xl font-bold">All Rights Reserved, &copy; 2023 Parks & Rec</h1>
            </div>
        </>
  );
}
