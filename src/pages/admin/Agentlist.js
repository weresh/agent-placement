// import React, { useState, useEffect } from 'react';

// function Agentlist() {
//   const [agents, setAgents] = useState([]);
//   const [filter, setFilter] = useState('All');

//   useEffect(() => {
//     // Fetch data from the backend
//     fetch('http://localhost:5000/api/agents')
//       .then(response => response.json())
//       .then(data => setAgents(data))
//       .catch(error => console.error('Error fetching agents:', error));
//   }, []);

//   const filteredAgents = agents.filter(agent => {
//     if (filter === 'All') return true;
//     return agent.status === filter;
//   });

//   return (
//     <main className='bg-[#D9D9D9] min-h-screen p-3 '>
//       <div className='bg-white  w-full p-3 border border-black  rounded-md'>
//         <h1 className='text-left text-xl md:text-2xl my-5'>AGENT LIST</h1>
//         <div className='flex gap-3 font-bold ml-2'>
//           <p 
//             className={`pb-2 mx-4 md:px-7 cursor-pointer ${filter === 'All' ? 'border-b border-red-700' : ''}`}
//             onClick={() => setFilter('All')}
//           >ALL</p>
//           <p 
//             className={`pb-2 mx-4 md:px-7 cursor-pointer ${filter === 'Available' ? 'border-b border-red-700' : ''}`}
//             onClick={() => setFilter('Available')}
//           >AVAILABLE</p>
//           <p 
//             className={`pb-2 mx-4 md:px-7 cursor-pointer ${filter === 'Busy' ? 'border-b border-red-700' : ''}`}
//             onClick={() => setFilter('Busy')}
//           >BUSY</p>
//         </div>
//         <div className='border border-black my-2 overflow-x-auto rounded-lg '>
//           <button className='float-end my-10 p-3 flex items-center gap-2 text-[#BC3333] font-bold'>
//             <span>
//               <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M10 15L3.75 8.75L5.5 6.9375L8.75 10.1875V0H11.25V10.1875L14.5 6.9375L16.25 8.75L10 15ZM2.5 20C1.8125 20 1.22417 19.7554 0.735 19.2662C0.245833 18.7771 0.000833333 18.1883 0 17.5V13.75H2.5V17.5H17.5V13.75H20V17.5C20 18.1875 19.7554 18.7762 19.2663 19.2662C18.7771 19.7562 18.1883 20.0008 17.5 20H2.5Z" fill="#BC3333"/>
//               </svg>
//             </span>
//             EXPORT
//           </button>
//           <button className='float-end my-10 p-3 flex items-center gap-2 text-[#BC3333] font-bold'>
//             <span>
//               <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M0.535714 3.86719H14.4643C14.7602 3.86719 15 3.65733 15 3.39844V2.22656C15 1.96767 14.7602 1.75781 14.4643 1.75781H0.535714C0.239833 1.75781 0 1.96767 0 2.22656V3.39844C0 3.65733 0.239833 3.86719 0.535714 3.86719ZM0.535714 8.55469H14.4643C14.7602 8.55469 15 8.34483 15 8.08594V6.91406C15 6.65517 14.7602 6.44531 14.4643 6.44531H0.535714C0.239833 6.44531 0 6.65517 0 6.91406V8.08594C0 8.34483 0.239833 8.55469 0.535714 8.55469ZM0.535714 13.2422H14.4643C14.7602 13.2422 15 13.0323 15 12.7734V11.6016C15 11.3427 14.7602 11.1328 14.4643 11.1328H0.535714C0.239833 11.1328 0 11.3427 0 11.6016V12.7734C0 13.0323 0.239833 13.2422 0.535714 13.2422Z" fill="#BC3333"/>
//               </svg>
//             </span>
//             DENSITY
//           </button>
        
//           <table className="w-full table-auto">
//             <thead>
//               <tr className="">
//                 <th className="px-4 py-2 text-start border border-gray-400"> AGENT NAME</th>
//                 <th className="px-4 py-2 text-start border border-gray-400"> AGENT ID</th>
//                 <th className="px-4 py-2 text-start border border-gray-400 ">CATEGORY ON</th>
//                 <th className="px-4 py-2 text-start border border-gray-400">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredAgents.map(agent => (
//                 <tr key={agent.agentid}>
//                   <td className="px-4 py-2 border border-black">{agent.agentname}</td>
//                   <td className="px-4 py-2 border border-black">{agent.agentid}</td>
//                   <td className="px-4 py-2 border border-black">{agent.categoryon}</td>
//                   <td className="px-4 py-2 border border-black">
//                     <p className={`border p-1 rounded-xl ${agent.status === 'Available' ? 'border-green-600' : 'border-red-600'}`}>
//                       {agent.status}
//                     </p>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
        
//         <div className="flex justify-between mt-4">
//           <span>1 row selected</span>
//           <div>
//             <button className="px-4 py-2 rounded-md">
//                 <span>
//                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M2.95395 8.54799L11.6206 14.548C11.7206 14.6172 11.8377 14.6577 11.9591 14.6652C12.0805 14.6726 12.2016 14.6467 12.3093 14.5903C12.4171 14.5339 12.5073 14.449 12.5703 14.345C12.6333 14.2409 12.6666 14.1216 12.6666 14V1.99999C12.6667 1.87831 12.6335 1.75893 12.5705 1.65478C12.5076 1.55064 12.4174 1.4657 12.3096 1.40918C12.2019 1.35265 12.0807 1.3267 11.9592 1.33413C11.8378 1.34156 11.7207 1.38209 11.6206 1.45133L2.95395 7.45133C2.86566 7.51295 2.79355 7.59498 2.74376 7.69045C2.69397 7.78591 2.66797 7.89199 2.66797 7.99966C2.66797 8.10733 2.69397 8.21341 2.74376 8.30888C2.79355 8.40434 2.86566 8.48637 2.95395 8.54799Z" fill="black"/>
//                     </svg>
//                 </span>
//             </button>

//             <button className="px-4 py-2 rounded-md">
//                 <span>
//                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M13.046 7.45201L4.3794 1.45198C4.27935 1.38277 4.16225 1.34224 4.04083 1.33481C3.9194 1.32737 3.79822 1.35331 3.69048 1.40983C3.58273 1.46635 3.49256 1.55129 3.42955 1.65543C3.36654 1.75957 3.33329 1.8789 3.33333 2.00058V14C3.33329 14.1217 3.36654 14.241 3.42955 14.3452C3.49256 14.4493 3.58273 14.5343 3.69048 14.5908C3.79822 14.6473 3.9194 14.6733 4.04083 14.6658C4.16225 14.6583 4.27935 14.6178 4.3794 14.5486L13.046 8.5486C13.1343 8.48698 13.2064 8.40495 13.2562 8.30949C13.306 8.21402 13.332 8.10794 13.332 8.00027C13.332 7.8926 13.306 7.78652 13.2562 7.69105C13.2064 7.59559 13.1343 7.51356 13.046 7.45201Z" fill="black"/>
//                     </svg>
//                 </span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default Agentlist;
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
              </tr>
            </thead>
            <tbody>
              {agents.map(agent => (
                <tr key={agent.personelid}>
                  <td className="px-4 py-2 border border-black">{`${agent.firstName} ${agent.lastName}`}</td>
                  <td className="px-4 py-2 border border-black">{agent.email}</td>
                  <td className="px-4 py-2 border border-black">{agent.phone}</td>
                  <td className="px-4 py-2 border border-black">{agent.personelid}</td>
                  <td className="px-4 py-2 border border-black">{agent.accountType}</td>
                  <td className="px-4 py-2 border border-black">{agent.location || 'NA'}</td>
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