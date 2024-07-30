import React, { useState } from 'react';

const GuardianRegister = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/guardians/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone, email, address, password }),
    });
    if(response.ok){
    const data = await response.text();
        alert("Register successful");
    window.location.href='/login/guardian'
    }else{
        alert("An error occured creating account")
    }
  };

  return (
    <div className="flex items-center justify-center max-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 my-4 bg-[#286EDE] rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Register Guardians</h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-300 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Register
          </button>
          <p className="text-sm text-center text-gray-700">
            Already have an account?{' '}
            <a href="/login/guardian" className="text-blue-900 hover:text-blue-950 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default GuardianRegister;
