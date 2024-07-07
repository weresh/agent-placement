import React from 'react'

function verification () {
  return (
    <div className="min-h-screen flex py-10 items-center justify-center bg-gray-100">
        <div className="bg-gray-500 text-white p-8 rounded-md shadow-md w-full mx-2 max-w-lg">
            <div  className="flex justify-center mb-6">
                <img src="/images/logo.png" className='bg-white rounded-full w-40'  alt="Logo" srcset="" />
            </div>
            <h2 className="text-2xl font-semibold text-center mb-6">Verify your phone number</h2>
            <p className='text-black'>Provide the phone number that was used during registration</p>
            <form action= "">
            <div className="flex flex-col my-3 min-w-full">
                    <label  className="text-left">Phone no</label>
                    <input  className="rounded-lg text-black bg-white p-2" defaultValue='+254'/>
                </div>
            </form>
            <button className='bg-green-600 text-white border font-semibold float-left mt-4 min-w-full my-3 px-6 py-2 rounded-lg'>
                REQUEST OTP
            </button>
        </div>
    </div>
      
    
  )
}

export default verification 