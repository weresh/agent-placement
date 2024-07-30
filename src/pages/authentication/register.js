import React, { useState } from 'react';

const Register = () => {
const [accountType, setAccountType] = useState('account');
const [firstName, setFirstName]=useState('')
const [lastName, setLastName]=useState('')
const [email, setEmail]=useState('')
const [phone, setPhone]=useState('')
const [personelid, setPersonelid]=useState('')
const [password, setPassword]=useState('')
const [confirmPassword, setConfirmPassword]=useState('')

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  if (!accountType) {
    alert("Please select a account type");
    return;
  }

  const user = {
    accountType,
    firstName,
    lastName,
    personelid,
    email,
    phone,
    password
  };
  console.log(user);
  try {
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      alert('User registered successfully');
      window.location.href = '/login';
    } else {
      console.log('Registration failed', response);
      alert('Registration failed, Try again');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred');
  }
};


  return (
    <div className="min-h-screen flex py-10 items-center justify-center bg-gray-100">
      <div className="bg-[#286ede] text-white p-8 rounded-md shadow-md w-full mx-2 max-w-lg">
        <div className="flex justify-center mb-6">
            <img src="/images/logo.png" className='bg-white rounded-full w-40'  alt="Logo" srcset="" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form  onSubmit={handleSubmit}>
          <div className="mb-4"> 
            <p className='text-sm text-black text-left'>Enter your details below to get started</p>
            <label className="block text-gray-300 text-left mb-1">Account type</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="accountType"
                  value="admin"
                  checked={accountType === 'admin'}
                  onChange={(e) => setAccountType(e.target.value)} 
                  className="form-radio text-red-600 w-4 h-4" 
                />
                <span className="ml-2">Admin</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="radio"
                  required 
                  name="accountType" 
                  value="agent" 
                  checked={accountType === 'agent'}
                  onChange={(e) => setAccountType(e.target.value)}
                  className="form-radio text-red-600 w-4 h-4" 
                />
                <span className="ml-2">Agent</span>
              </label>
            </div>
          </div>
          
          <div className="flex mb-4 space-x-4">
            <input 
              type="text" 
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-1/2 px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input 
              type="text" 
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)} 
              className="w-1/2 px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-4">
            <input 
              type="email"
              required 
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input 
              type="tel"
              required 
              placeholder="+254"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} 
              className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-4">
            <input 
              type="text"
              required 
              placeholder="PersonelID"
              value={personelid}
              onChange={(e) => setPersonelid(e.target.value)}
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
          <div className="mb-4">
            <input 
              type="password"
              required 
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input 
              type="checkbox"
              className="form-checkbox text-red-600 w-10 h-10 md:w-4 md:h-4" 
            />
            <span className="ml-2 text-gray-300 text-sm">By registering, I agree to Childcare Agency <a href="#" className="underline text-[#ff5c5c]">Terms and Conditions</a></span>
          </div>
          <button 
            type="submit" 
            className="w-full bg-green-600 font-semibold text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            CREATE ACCOUNT
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account? <a href="/login" className="underline text-[#ff5c5c]">Log in</a>
        </p>
        <div className="mb-4">
                <p className='text-md text-black py-2'>Login as <a href='/register/guardian'
                className='text-white hover:underline'>
                Guardian</a>
                </p>
            </div>
      </div>
    </div>
  );
};

export default Register;
