import ReviewSection from '../ReviewSection';
import FooterSection from '../FooterSection'
import './styles.css';

export default function Details({
  images, fullName, description, weatherInfo, id, directionsInfo, operatingHours, addresses, contacts, entranceFees, entrancePasses
}) {
  let contactElements = contacts.phoneNumbers.length > 0 ? contacts.phoneNumbers.map((phone, index) => (
    <p key={index} className="text-gray-800">{phone.type}: {phone.phoneNumber}</p>
  )) : <p className="text-gray-500">No phone information available</p>;

  let emailElements = contacts.emailAddresses.length > 0 ? contacts.emailAddresses.map((email, index) => (
    <p key={index} className="text-gray-800">Email: {email.emailAddress}</p>
  )) : <p className="text-gray-500">No email information available</p>;

  let entranceFeesElement = entranceFees.length > 0 ? entranceFees.map((fee, index) => (
    <div key={index} className="mb-4">
      <p className="text-gray-800 font-bold">{fee.title}: ${fee.cost}</p>
      {/* <p className="text-gray-600">{fee.description}</p> */}
    </div>
  )) : <p className="text-gray-500">No entrance fee information available</p>;

  let entrancePassesElement = entrancePasses.length > 0 ? entrancePasses.map((pass, index) => (
    <div key={index} className="mb-4">
      <p className="text-gray-800 font-bold">{pass.title}: ${pass.cost}</p>
      {/* <p className="text-gray-600">{pass.description}</p> */}
    </div>
  )) : <p className="text-gray-500">No entrance pass information available</p>;

  // Initialize map URL with default value
  let mapUrl = "https://maps.google.com/maps?q=Earth&z=3&output=embed";

  // Check if addresses array exists and has at least one address
  if (addresses.length > 0) {
    // Save the full address string to variable
    const fullAddress = `${addresses[0].line1}, ${addresses[0].city}, ${addresses[0].stateCode}, ${addresses[0].postalCode}`;
    // Use JavaScript function to encode full address to pass it through URL
    const encodedAddress = encodeURIComponent(fullAddress);
    // Generate new map based on encoded address
    mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&output=embed`;
  }

  return (
      <>
        {/* Display first image as header */}
        <div className="relative overflow-hidden">
          {images && images.length > 0 && (
            <img
              src={images[0].url}
              alt={images[0].altText}
              className="w-full object-cover"
              style={{ height:'80vh' }} 
            />
          )}

          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col">
            <div className="flex justify-center items-end h-full pb-10">
              <h1 className="text-white text-4xl font-bold">{fullName}</h1>
            </div>

            <div className="p-4">
              <figure className="bg-white bg-opacity-60 p-7 rounded shadow-lg mx-auto max-w-2xl">
                <figcaption className="text-gray-800 text-xl">
                  <p>{description}</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="px-10 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column Content */}
            <div>
              <div className="px-10 my-4">
                <h1 className="text-2xl font-bold mb-4">Plan Your Visit</h1>
                <div className="bg-white p-4 rounded shadow-md">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="font-semibold text-left">Directions:</td>
                        <td className="text-justify">{directionsInfo}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold text-left">Weather:</td>
                        <td className="text-justify">{weatherInfo}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold text-left">Address:</td>
                        <td>{addresses[0].line1} {addresses[0].city}, {addresses[0].stateCode} {addresses[0].postalCode}</td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </div>

              <div className="px-10 my-4">
                <h1 className="text-2xl font-bold mb-4">Operating Hours</h1>
                <div className="bg-white p-4 rounded shadow-md">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="font-semibold" colSpan="2">{operatingHours[0].description}</td>
                      </tr>
                      {Object.entries(operatingHours[0].standardHours).map(([day, hours], index) => (
                        <tr key={index}>
                          <td className="font-semibold capitalize">{day}:</td>
                          <td>{hours}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column Content */}
            <div>
              {/* Contact Information Section */}
                <div className="px-10 my-4">
                  <h1 className="text-2xl font-bold mb-4">Contact Information</h1>
                  <div className="bg-white p-4 rounded shadow-md">
                    <table className="w-full">
                      <tbody>
                        {contactElements}
                        {emailElements}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Entrance Fees Section */}
                <div className="px-10 my-4">
                  <h1 className="text-2xl font-bold mb-4">Entrance Fees</h1>
                  <div className="bg-white p-4 rounded shadow-md">
                    <table className="w-full">
                      <tbody>
                        {entranceFeesElement}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Entrance Passes Section */}
                <div className="px-10 my-4">
                  <h1 className="text-2xl font-bold mb-4">Entrance Passes</h1>
                  <div className="bg-white p-4 rounded shadow-md">
                    <table className="w-full">
                      <tbody>
                        {entrancePassesElement}
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>

          </div>
        </div>

        {/* Review Section */}
        <div className="p-10">
          <div className="bg-white p-4 rounded shadow-lg w-full max-w-screen-lg mx-auto">
            <ReviewSection parkId={id} />
          </div>
        </div>

        {/* Map Section */}
        <div className="px-10 my-4 pb-10">
          <div className="bg-white p-4 rounded shadow-md">
            <iframe
              src={mapUrl}
              width="100%"
              height="400"
              frameBorder="0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Park Map"
            ></iframe>
          </div>
        </div>

        <FooterSection />

      </>
  );
}