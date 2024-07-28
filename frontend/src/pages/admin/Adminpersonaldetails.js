import React from 'react'
import { RiAccountPinBoxFill } from "react-icons/ri";

const personaldetails = () => {
  return (
    <div className="">
      <div >
          <div className="flex items-center mt-6 ml-10">
              <div className="w-40 h-40  bg-gray-400 rounded-full flex items-center justify-center text-white text-7xl font-bold">
                  A
              </div>
              <div className="flex flex-col px-8 ">
                  <p className="text-3xl font-bold"> WELCOME ADMIN</p>
                  <div className='flex'>
                  <RiAccountPinBoxFill />
                  <p>inbox</p>
                  </div>
                 
              </div>
          </div>
          <hr className=" border-2 border-black my-8 "></hr>
          <form action="" className="flex flex-col gap-5 ml-10">
              <div className="flex">
                  <label for="name" id="name" className="font-bold">Admin Name :</label>
                  <input type="text" placeholder="Were Sheila" className="w-1/2 py-2 px-4 ml-4 bg-gray-200 rounded-2xl "></input>
              </div>
            
              <div className="flex">
                  <label for="email" id="email" className="font-bold">Email :</label>
                  <input type="email" placeholder="weresh@gmail.com" className="w-1/2 py-2 px-4 ml-16 bg-gray-200 rounded-2xl"></input>
              </div>

              <div className="flex">
                  <label for="tel" id="tel" className="font-bold">Phone No. :</label>
                  <input type="tel" placeholder="07200344532" className="w-1/2 py-2 px-4 ml-10 bg-gray-200 rounded-2xl"></input>
              </div>
              
              <div className="flex">
                  <label for="agentid" id="agentid" className="font-bold">Admin ID :</label>
                  <input type="text" placeholder="AG001" className="w-1/2 py-2 px-4 ml-8 bg-gray-200 rounded-2xl"></input>
              </div>
              <input type="submit" value="SUBMIT" className="bg-green-600 font-semibold px-4 py-2 rounded-2xl w-1/2 mx-auto"></input>
          </form>
      </div>
</div>
  )
}

export default personaldetails