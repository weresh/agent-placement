// import React , { useState, useEffect } from 'react'

// const Location = () => {

//     const [from, setFrom]=useState('')
//     const [destination, setDestination]=useState('')

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const agentlocation = {
//             from,
//             destination
//           };
//           console.log(agentlocation);
//           try {
//             const response = await fetch('http://localhost:3306/api/user/agentlocation', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json'
//               },
//               body: JSON.stringify(agentlocation)
//             });
        
//             if (response.ok) {
//               alert('Location sent successfully');
//               window.location.href = '/user/Location';
//             } else {
//               console.log('Registration failed', response);
//               alert('Location failed, Try again');
//             }
//           } catch (error) {
//             console.error('Error:', error);
//             alert('An error occurred');
//           }
//         };

//   return (
//     <div>
//         <div className="pl-6">
//             <p className="text-6xl font-bold">LOCATION</p>
//             <p className="text-2xl py-5">Turn on your location during work hours to show your daily field work evaluations.</p>
//             <label className="inline-flex items-center mb-5 cursor-pointer">
//                 <input type="checkbox" value="" className="sr-only peer"/>
//                 <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
//                 <span className="ms-3 text-lg font-medium text-gray-900">Allow Location viewing</span>
//             </label>
//             <hr className="w-full border-3 "></hr>
//             <p className="text-xl text-center font-semibold py-5">ROUTE</p>
            
//             <form onSubmit={handleSubmit}>
//               <div  className="flex flex-col items-center justify-around  md:flex-row">
//                   <div>
//                         <input 
//                         type="text" 
//                         placeholder="From"
//                         value={from}
//                         onChange={(e) => setFrom(e.target.value)}
//                         className="w-1/2 px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                         />
//                         <input type="text" placeholder="Enter your current location" className="bg-gray-200 pl-2 w-full py-2 my-3 rounded-md"></input>
//                         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31911.07847960325!2d36.69161647431641!3d-1.2394502999999935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f18f1be0c242b%3A0xa1437da794151da0!2sChildline%20Kenya%20(116)!5e0!3m2!1sen!2ske!4v1718053776548!5m2!1sen!2ske" width="300" height="300" style={{border:"0px"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
//                     </div>
//                     <div>
//                         <input 
//                         type="text" 
//                         placeholder="Destination"
//                         value={destination}
//                         onChange={(e) => setDestination(e.target.value)}
//                         className="w-1/2 px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                         />
//                         <input type="text" placeholder="Enter your destination location"  className="bg-gray-200 pl-2 w-full py-2 my-3 rounded-md"></input>
//                         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6325591303384!2d36.735433010985815!3d-1.3969164985840115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f057692a5a4bf%3A0x68a97ea7ec6a01b!2sLaiser%20hill%20estate!5e0!3m2!1sen!2ske!4v1718061568448!5m2!1sen!2ske" width="300" height="300" style={{border:"0px"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
//                     </div>

//               </div>
                

//                 <button type="submit" value="SUBMIT" className="bg-green-600 font-semibold px-4 py-2 my-3 rounded-2xl w-1/2 mx-auto">SUBMIT</button>
//            </form> 
             
//         </div>
//     </div>
//   )
// }

// export default Location
import React, { useState, useEffect } from 'react';
import toast, {Toaster} from 'react-hot-toast';


const Location = () => {
  const [isFieldWork, setIsFieldWork] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    const fetchUserLocation = async () => {
      const userData = JSON.parse(sessionStorage.getItem('user'));
      const userId = userData.personelid;

      try {
        const response = await fetch(`http://localhost:5000/api/user/location/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setCurrentLocation(data.location);
          toast.success('User location fetched successfully',{
            duration: 3000,
            position: 'top-right',
          });
        }
      } catch (error) {
        toast.error('Failed to fetch user location',{
          duration: 3000,
          position: 'top-right',
        });
        console.error('Error fetching user location:', error);
      }
    };

    fetchUserLocation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const userId = userData.personelid;

    const locationData = {
      personelid: userId,
      location: isFieldWork ? destination : currentLocation,
    };
    if (!locationData?.location) {
      toast.error('Please enter a valid location',{
        duration: 3000,
        position: 'top-right',
      });
      
    }

    try {
      const response = await fetch('http://localhost:5000/api/user/updateLocation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(locationData)
      });

      if (response.ok) {
        toast.success('Location updated successfully',{
          duration: 3000,
          position: 'top-right',
        });
        // alert('Location updated successfully');
      } else {
        toast.error('Failed to update location',{
          duration: 3000,
          position: 'top-right',
        });
        // alert('Failed to update location. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating location');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-3xl font-bold mb-6">Agent Location</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-2">
          <label className="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={isFieldWork}
              require
              onChange={(e) => setIsFieldWork(e.target.checked)}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              {isFieldWork ? "Field Work" : "Office Work"}
            </span>
          </label>
        </div>

        {isFieldWork ? (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="destination">
              Destination
            </label>
            <input
              id="destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your destination"
            />
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="map-url">
              Office Location
            </label>
            <input
              id="map-url"
              type="text"
              value={currentLocation}
              require
              onChange={(e) => setCurrentLocation(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter office location URL"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Location
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4"> Location</h3>
        <iframe
          src={isFieldWork ? destination : currentLocation}
          width="100%"
          height="300"
          style={{border:0}}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>
      </div>
      <Toaster />
    </div>
  );
};

export default Location;
