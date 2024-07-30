import React , { useState, useEffect } from 'react';
import { RiAccountPinBoxFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const Personaldetails = () => {

    const [user, setUser] = useState(null);
    const navigate= useNavigate()
  
    useEffect(() => {
      const userData = JSON.parse(sessionStorage.getItem('user'));
      if (userData) {
        setUser(userData);
      }
      if(!userData){
        navigate("/login")
      }
  
    }, []);
  
    if (!user) {
      return <div>Loading...</div>;
    }

  return (
    <div className="">
      <div >
          <div className="flex items-center mt-6 ml-10">
              <div className="w-40 h-40  bg-gray-400 rounded-full flex items-center justify-center text-white text-7xl font-bold">
                  W
              </div>
              <div className="flex flex-col px-8 ">
                  <p className="text-3xl font-bold"> WELCOME {user.firstName}</p>
                  <div className='flex'>
                  <RiAccountPinBoxFill />
                  <p>inbox</p>
                  </div>
              </div>
          </div>
          <hr className=" border-2 border-black my-8 "></hr>
          <div  className=" p-6 text-left rounded-lg w-full max-w-md">
            <p><strong>Firstname:</strong> {user.firstName}</p>
            <p><strong>Lastname:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone No:</strong> {user.phone}</p>
            <p><strong>Agent ID:</strong> {user.personelid}</p>
            <div className="flex">
                <label for="category" className="font-bold">Category :</label>
                <select id="category" className="w-1/4 bg-gray-200 py-2 px-4 ml-10 rounded-lg">
                    <option value="select category">Select Category</option>
                    <option value="field">Field</option>
                    <option value="desk">Desk</option>
                </select>
            </div>
             
          </div>
      </div>
</div>
  )
}

export default Personaldetails