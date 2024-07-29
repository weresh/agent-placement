import React , { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Viewlocation = () => {

    const [place, setPlace] = useState(null);
    const navigate= useNavigate()
  
    useEffect(() => {
      const placeData = JSON.parse(sessionStorage.getItem('agentlocation'));
      if (placeData) {
        setPlace(placeData);
      }
      if(!placeData){
        navigate("/admin/viewlocation")
      }
  
    }, []);
  
    if (!place) {
      return <div>Loading...</div>;
    }

  return (
    <div className="pl-6">
        <p className="text-6xl font-bold">VIEW LOCATION</p>
        <p className="text-2xl py-5">Here's an overview of different agents going on field tasks</p>

        <hr className="w-full border-3 "></hr>
        <p className="text-xl text-center font-semibold py-5">AGENTS LOCATIONS</p>
        <div className="flex flex-col  md:flex-row items-center justify-around text-base font-semibold">
            <div>
                    <label for="from">AG001 :</label>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31911.07847960325!2d36.69161647431641!3d-1.2394502999999935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f18f1be0c242b%3A0xa1437da794151da0!2sChildline%20Kenya%20(116)!5e0!3m2!1sen!2ske!4v1718053776548!5m2!1sen!2ske" width="200" height="200" style={{border:"0px"}}  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div>
                    <label for="to">AG002 :</label>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.73032560685!2d36.90422764659571!3d-1.2073188304170142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3fc95de79873%3A0xe3ee13be37e6b234!2sGithurai!5e0!3m2!1sen!2ske!4v1719513660938!5m2!1sen!2ske" width="200" height="200"  style={{border:"0px"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div>
                    <label for="from">AG003 :</label>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31911.07847960325!2d36.69161647431641!3d-1.2394502999999935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f18f1be0c242b%3A0xa1437da794151da0!2sChildline%20Kenya%20(116)!5e0!3m2!1sen!2ske!4v1718053776548!5m2!1sen!2ske" width="200" height="200" style={{border:"0px"}}  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div>
                    <label for="to">AG004 :</label>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6325591303384!2d36.735433010985815!3d-1.3969164985840115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f057692a5a4bf%3A0x68a97ea7ec6a01b!2sLaiser%20hill%20estate!5e0!3m2!1sen!2ske!4v1718061568448!5m2!1sen!2ske" width="200" height="200" style={{border:"0px"}}  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className=" p-6 text-left rounded-lg w-full max-w-md">
                    <p><strong>From:</strong> {place.from}</p>
                    <p><strong>Destination:</strong> {place.destination}</p>
                    
                </div>
          </div> 
    </div>
  )
}

export default Viewlocation