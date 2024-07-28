import React from 'react'

const forgotpassword = () => {
  return (
    <div className="flex py-10 items-center justify-center  ">
        <div className="bg-gray-500 text-white p-8 rounded-md shadow-md w-full mx-2 max-w-lg">
            <div className="flex justify-center mb-6">
                <img src="/images/logo.png" className='bg-white rounded-full w-40'  alt="Logo" srcset="" />
            </div>
            <p className="font-bold text-center text-2xl pb-10">Forgot Password</p>
            <p className="font-bold text-base text-left  py-8">Enter your email address below</p>
            <input type="text" placeholder="Email address" className="bg-[#D9D9D9] w-full py-3 rounded-md text-sm pl-3 font-semibold"></input>
            <button className="bg-green-700 w-full my-8 py-2 rounded-md text-sm font-semibold">RESET</button>
            <p className="text-sm font-medium text-center pb-24">Go back to <a className="text-red-600">Login</a></p>
        </div>
    </div>
  )
}

export default forgotpassword