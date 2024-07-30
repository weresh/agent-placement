import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginGuardians = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate= useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/guardians/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('guardian', JSON.stringify(data.guardian));
        navigate('/guardian/dashboard');
        // alert('Login successful');
      } else {
        alert('Invalid email or password');
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-[#286EDE] rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login Guardians</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Login
          </button>

          {/* donst have account */}
          <p className="text-sm text-center text-gray-100">Don't have an account? <a href="/register/guardian" className="text-blue-900 hover:text-blue-950">Sign up</a></p>

        </form>
      </div>
    </div>
  );
};

export default LoginGuardians;
