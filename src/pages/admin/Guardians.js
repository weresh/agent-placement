
import React, { useState, useEffect } from 'react';

function Guardians() {
  const [guardians, setGuardians] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:5000/api/guardians')
      .then(response => response.json())
      .then(data => setGuardians(data))
      .catch(error => console.error('Error fetching guardians:', error));
  }, []);


  return (
    <main className='bg-[#D9D9D9] min-h-screen p-3'>
      <div className='bg-white w-full p-3 border border-black rounded-md'>
        <h1 className='text-left text-xl md:text-2xl my-5'>GUARDIANS LIST</h1>
       
        <div className='border border-black my-2 overflow-x-auto rounded-lg'>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-start border border-gray-400">ID</th>
                <th className="px-4 py-2 text-start border border-gray-400">Name</th>
                <th className="px-4 py-2 text-start border border-gray-400">Phone</th>
                <th className="px-4 py-2 text-start border border-gray-400">Email</th>
                <th className="px-4 py-2 text-start border border-gray-400">Address</th>
              </tr>
            </thead>
            <tbody>
              {guardians.map(guardian => (
                <tr key={guardian.id}>
                  <td className="px-4 py-2 border border-black">{`${guardian.id}`}</td>
                  <td className="px-4 py-2 border border-black">{`${guardian.name}`}</td>
                  <td className="px-4 py-2 border border-black">{guardian.phone}</td>
                  <td className="px-4 py-2 border border-black">{guardian.email}</td>
                  <td className="px-4 py-2 border border-black">{guardian.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Guardians;