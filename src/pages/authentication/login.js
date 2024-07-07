import React, { useState } from 'react';

const Login = () => {
const [username, setUsername]=useState('')
const [password, setPassword]=useState('')
const [remember, setRemember] = useState(false);

const handleSubmit = (e) => {
  e.preventDefault();

};

  return (
    <div>
        <div className="min-h-screen flex py-10 items-center justify-center bg-gray-100">
        <div className="bg-[#286ede] text-white p-8 rounded-md shadow-md w-full mx-2 max-w-lg">
            <div className="flex justify-center mb-6">
                <img src="/images/logo.png" className='bg-white rounded-full w-40'  alt="Logo" srcset="" />
            </div>
            <h2 className="text-xl font-semibold text-center mb-4">Welcome Back</h2>

            <form>
            <div className="mb-4">
                <p className='text-sm text-black '>Don&apos;t have an account yet? <a href='/register'
                className='text-red-600 hover:underline'>
                Register</a>
                </p>
                <p className='text-sm'>or</p>
                <a href='/verification' className='text-red-600 text-sm hover:underline'>Activate your account</a>
            </div>
            
            
            <div className="mb-4">
                <input 
                type="text"
                required 
                placeholder="Email address / Phone no / Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
            </div>
            <div className="mb-4">
                <input 
                type="password"
                required 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
            </div>
            
            <button 
                type="submit" 
                className="w-full bg-green-600 font-semibold text-white py-2 my-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
                LOG IN
            </button>

            <div className="mb-4 flex items-center">
                <input 
                type="checkbox"
                required
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)} 
                className="form-checkbox text-red-600 w-4 h-4" 
                />
                <div className="mx-2 w-full text-gray-300 text-sm flex flex-wrap justify-between"><span>Remember me</span> <a href="" className="underline text-[#ff5c5c]">Forgot Password?</a></div>
            </div>
            </form>
        </div>
        </div>
    </div>
    
  );
};

export default Login;
