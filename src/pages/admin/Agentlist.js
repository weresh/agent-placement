
import React, { useState, useEffect } from 'react';

function Agentlist() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:5000/api/agents')
      .then(response => response.json())
      .then(data => setAgents(data))
      .catch(error => console.error('Error fetching agents:', error));
  }, []);

  const handleViewLocation = (location) => {
    if (location) {
      // Extract the place ID from the embed URL
      const placeIdMatch = location.match(/!1s([\w\d]+)!/);
      if (placeIdMatch && placeIdMatch[1]) {
        const placeId = placeIdMatch[1];
        // Open Google Maps in a new tab with the place ID
        window.open(`https://www.google.com/maps/place/?q=place_id:${placeId}`, '_blank');
      } else {
        // If no place ID found, open the maps with a search query
        const searchQuery = encodeURIComponent(location);
        window.open(`https://www.google.com/maps/search/?api=1&query=${searchQuery}`, '_blank');
      }
    }
  };

  return (
    <main className='bg-[#D9D9D9] min-h-screen p-3'>
      <div className='bg-white w-full p-3 border border-black rounded-md'>
        <h1 className='text-left text-xl md:text-2xl my-5'>AGENT LIST</h1>
       
        <div className='border border-black my-2 overflow-x-auto rounded-lg'>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-start border border-gray-400">Name</th>
                <th className="px-4 py-2 text-start border border-gray-400">Email</th>
                <th className="px-4 py-2 text-start border border-gray-400">Phone</th>
                <th className="px-4 py-2 text-start border border-gray-400">Personnel ID</th>
                <th className="px-4 py-2 text-start border border-gray-400">Account Type</th>
                <th className="px-4 py-2 text-start border border-gray-400">Location</th>
                <th className="px-4 py-2 text-start border border-gray-400">Live&nbsp;Locations</th>
              </tr>
            </thead>
            <tbody>
              {agents.map(agent => (
                <tr key={agent.personelid}>
                  <td className="px-4 py-2 border border-black">{`${agent.firstName} ${agent.lastName}`}</td>
                  <td className="px-4 py-2 border border-black">{agent.email}</td>
                  <td className="px-4 py-2 border border-black">{agent.phone}</td>
                  <td className="px-4 py-2 border border-black">{agent.personelid}</td>
                  <td className="px-4 py-2 border border-black">{agent.agentType}</td>
                  <td className="px-4 py-2 border border-black">
                    {agent.location ? (
                      <button
                        onClick={() => handleViewLocation(agent.location)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      >
                        View
                      </button>
                    ) : (
                      'NA'
                    )}
                  </td>
                  <td className="px-4 py-2 border border-black">
                    {agent.livelocations ? (
                      <button
                        onClick={() => handleViewLocation(agent.livelocations)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      >
                        View
                      </button>
                    ) : (
                      'NA'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Agentlist;