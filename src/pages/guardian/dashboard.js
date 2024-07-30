import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Fieldwork');
  const [submittedBy, setSubmittedBy] = useState(() => {
    const guardian = JSON.parse(sessionStorage.getItem('guardian'));
    return guardian ? guardian.id : '';
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, submitted_by: submittedBy, type }),
      });
      if (response.ok) {
        alert('Task submitted successfully');
        // crear form
        setTitle('');
        setDescription('');
        setType('Fieldwork');

        navigate('/guardian/dashboard');

        // Optionally redirect or clear form
      } else {
        alert('Failed to submit task');
      }
    } catch (error) {
      console.error('Error submitting task:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <select
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            >
              <option value="home inspections">Home Inspections</option>
              <option value="home visitation">Home Visitation</option>
              <option value="Placement Services">Placement Services</option>
              <option value="Child Protection">Child protection investigations</option>
              <option value="Crisis Interventions">Crisis Interventions</option>
              <option value="Other">Other</option>
            </select>
          </div>
        
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            >
              <option value="Fieldwork">Fieldwork</option>
              <option value="Desk Work">Desk Work</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Submit Request
          </button>
        </form>
      </div>
      <button onClick={() => navigate('/login')} className='w-44 py-2 my-4 float-left text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-blue-200'> Logout</button>
    </div>
  );
};

export default Dashboard;
