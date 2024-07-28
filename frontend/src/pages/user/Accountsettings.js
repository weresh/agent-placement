import React from 'react'

const Accountsettings = () => {
  return (
    <div className="flex items-center justify-center">
        <div className="bg-gray-300  mt-10 p-10 rounded-lg ">
            <form action="">
            <p className="text-6xl font-bold">ACCOUNT SETTINGS</p>
               <div className='flex justify-between items-center'>
                   <div className="flex flex-col  w-[48%]">
                       <label  className="text-left font-semibold">Email address :</label>
                       <input type="text" className="border-2 border-black rounded-md outline-8 p-2  text-gray-500 bg-slate-100" disabled value='info@gmail.com'/>
                   </div>
                   <div className="flex flex-col my-3 w-[48%]">
                       <label  className="text-left font-semibold">Phone no :</label>
                       <input  className="border-2 border-black rounded-lg outline-8 p-2 text-gray-500 bg-slate-100" disabled value='+254742476290'/>
                   </div>
               </div>
               <div className='flex justify-between items-center'>
                   <div className="flex flex-col w-[48%]">
                       <label className="text-left font-semibold">Agent Name :</label>
                       <input type="text" className="border-2 border-black rounded-lg outline-8 p-2 text-gray-500 bg-slate-100" disabled value='Were'/>
                   </div>
                   <div className="flex flex-col my-3 w-[48%]">
                       <label  className="text-left font-semibold">Category :</label>
                       <input  className="border-2 border-black rounded-lg outline-8 p-2 text-gray-500 bg-slate-100" disabled value='Field/Desk'/>
                   </div>
               </div>
               <button className='border w-full rounded-2xl bg-green-600  text-lg text-white font-semibold py-3 my-3 cursor-pointer' disabled>UPDATE</button>
               <button className='float-left text-red-700 text-lg px-3 font-semibold'>CHANGE PASSWORD *</button>
            </form>
       </div>

    </div>
  )
}

export default Accountsettings