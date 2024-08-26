// import React, { useState, useEffect } from 'react';
// import toast, { Toaster } from 'react-hot-toast';


// const Inbox = () => {
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState('All');
//   const [agents, setAgents] = useState([]);
//   const [selectedAgents, setSelectedAgents] = useState({});

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/tasks');
//         if (response.ok) {
//           const data = await response.json();
//           setTasks(data);
//           const initialSelectedAgents = {};
//           data.forEach(task => {
//             initialSelectedAgents[task.id] = task.assigned_agent || '';
//           });
//           setSelectedAgents(initialSelectedAgents);
//         } else {
//           console.error('Failed to fetch tasks');
//         }
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     const fetchAgents = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/agents');
//         if (response.ok) {
//           const data = await response.json();
//           setAgents(data);
//         } else {
//           console.error('Failed to fetch agents');
//         }
//       } catch (error) {
//         console.error('Error fetching agents:', error);
//       }
//     };

//     fetchTasks();
//     fetchAgents();
//   }, []);

//   const filteredTasks = tasks.filter(task => {
//     if (filter === 'All') return true;
//     return task.status === filter;
//   });

//   const handleAgentChange = (taskId, agentId) => {
//     setSelectedAgents(prev => ({ ...prev, [taskId]: agentId }));
//   };

//   const handleUpdate = async () => {
//     // confirmation
//     if (!window.confirm('Are you sure you want to update the tasks?')) return;
//     try {
//       const response = await fetch('http://localhost:5000/api/tasks/update', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(selectedAgents),
//       });
//       if (response.ok) {
//         console.log('Tasks updated successfully');
//         toast.success('Tasks updated successfully',{
//           position: 'top-center',
//           durations: 3000
//         })
//       } else {
//         throw new Error('Failed to update tasks');
//       }
//     } catch (error) {

//       toast.error('Error updating tasks',{
//         position: 'top-center',
//         durations: 3000
//       })
//       console.error('Error updating tasks:', error);
//     }
//   };

//   const handleDelete = async (taskId) => {
//     // confirmation
//     if (!window.confirm('Are you sure you want to delete this task?')) return;
//     try {
//       const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         setTasks(tasks.filter(task => task.id !== taskId));
//         console.log('Task deleted successfully');
//       } else {
//         console.error('Failed to delete task');
//       }
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   return (
//     <main className='bg-[#D9D9D9] min-h-screen p-3'>
//       <div className='bg-white w-full p-3 border border-black rounded-md'>
//         <h1 className='text-left text-xl md:text-2xl my-5'>INBOX</h1>
//         <div className='flex gap-3 font-bold ml-2'>
//           <p
//             className={`pb-2 mx-4 md:px-7 cursor-pointer ${filter === 'All' ? 'border-b border-red-700' : ''}`}
//             onClick={() => setFilter('All')}
//           >ALL</p>
//           <p
//             className={`pb-2 mx-4 md:px-7 cursor-pointer ${filter === 'Pending' ? 'border-b border-red-700' : ''}`}
//             onClick={() => setFilter('Pending')}
//           >PENDING</p>
//           <p
//             className={`pb-2 mx-4 md:px-7 cursor-pointer ${filter === 'In Progress' ? 'border-b border-red-700' : ''}`}
//             onClick={() => setFilter('In Progress')}
//           >IN PROGRESS</p>
//           <p
//             className={`pb-2 mx-4 md:px-7 cursor-pointer ${filter === 'Completed' ? 'border-b border-red-700' : ''}`}
//             onClick={() => setFilter('Completed')}
//           >COMPLETED</p>
//         </div>
//         <div className='border border-black my-2 overflow-x-auto rounded-lg'>
//           <button className='float-end my-10 p-3 flex items-center gap-2 text-[#BC3333] font-bold'>
//             <span>
//               <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M10 15L3.75 8.75L5.5 6.9375L8.75 10.1875V0H11.25V10.1875L14.5 6.9375L16.25 8.75L10 15ZM2.5 20C1.8125 20 1.22417 19.7554 0.735 19.2662C0.245833 18.7771 0.000833333 18.1883 0 17.5V13.75H2.5V17.5H17.5V13.75H20V17.5C20 18.1875 19.7554 18.7762 19.2663 19.2662C18.7771 19.7562 18.1883 20.0008 17.5 20H2.5Z" fill="#BC3333"/>
//               </svg>
//             </span>
//             EXPORT
//           </button>
//           <button 
//             onClick={handleUpdate}
//             className='float-end my-10 p-3 flex items-center gap-2 bg-[#BC3333] text-white font-bold rounded'
//           >
//             UPDATE CHANGES
//           </button>
//           <table className="w-full table-auto">
            // <thead>
            //   <tr>
            //     <th className="px-4 py-2 text-start border border-gray-400">ID</th>
            //     <th className="px-4 py-2 text-start border border-gray-400">TITLE</th>
            //     <th className="px-4 py-2 text-start border border-gray-400">DESCRIPTION</th>
            //     <th className="px-4 py-2 text-start border border-gray-400">STATUS</th>
            //     <th className="px-4 py-2 text-start border border-gray-400 whitespace-nowrap">ASSIGNED AGENT</th>
            //     <th className="px-4 py-2 text-start border border-gray-400 whitespace-nowrap">SUBMITTED BY</th>
            //     <th className="px-4 py-2 text-start border border-gray-400">TYPE</th>
            //     <th className="px-4 py-2 text-start border border-gray-400 whitespace-nowrap">CREATED AT</th>
            //     <th className="px-4 py-2 text-start border border-gray-400">ACTIONS</th>
            //   </tr>
            // </thead>
            // <tbody>
            //   {filteredTasks.map(task => (
            //     <tr key={task.id}>
            //       <td className="px-4 py-2 border border-black">{task.id}</td>
            //       <td className="px-4 py-2 border border-black">{task.title}</td>
            //       <td className="px-4 py-2 border border-black">{task.description}</td>
            //       <td className="px-4 py-2 border border-black">
            //         <p className={`border p-1 rounded-xl ${task.status === 'Completed' ? 'border-green-600' : 'border-red-600'}`}>
            //           {task.status}
            //         </p>
            //       </td>
            //       <td className="px-4 py-2 border border-black">
            //         <select 
            //           value={selectedAgents[task.id] || ''}
            //           onChange={(e) => handleAgentChange(task.id, e.target.value)}
            //           className="w-full p-2 border rounded"
            //         >
            //           <option value="">Select Agent</option>
            //           {agents.map(agent => (
            //             <option key={agent.personelid} value={agent.personelid}>
            //               {agent.firstName} {agent.lastName}
            //             </option>
            //           ))}
            //         </select>
            //       </td>
            //       <td className="px-4 py-2 border border-black">{task.submitted_by}</td>
            //       <td className="px-4 py-2 border border-black">{task.type}</td>
            //       <td className="px-4 py-2 border border-black">{new Date(task.created_at).toLocaleString()}</td>
            //       <td className="px-4 py-2 border border-black">
            //         <button
            //           onClick={() => handleDelete(task.id)}
            //           className="bg-red-500 text-white px-2 py-1 rounded"
            //         >
            //           Delete
            //         </button>
            //       </td>
            //     </tr>
            //   ))}
            // </tbody>
//           </table>
//         </div>
//         <Toaster/>
//       </div>
//     </main>
//   );
// };

// export default Inbox;

import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Inbox = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [agents, setAgents] = useState([]);
  const [selectedAgents, setSelectedAgents] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tasks');
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
          const initialSelectedAgents = {};
          data.forEach(task => {
            initialSelectedAgents[task.id] = task.assigned_agent || '';
          });
          setSelectedAgents(initialSelectedAgents);
        } else {
          console.error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const fetchAgents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/agents');
        if (response.ok) {
          const data = await response.json();
          setAgents(data);
        } else {
          console.error('Failed to fetch agents');
        }
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchTasks();
    fetchAgents();
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  // const handleAgentChange = (taskId, agentId) => {
  //   setSelectedAgents(prev => ({ ...prev, [taskId]: agentId }));
  // };

  const handleAgentChange = async (taskId, agentId) => {
    setSelectedAgents(prev => ({ ...prev, [taskId]: agentId }));
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agentId }),
      });
      if(!response.ok) {
        throw new Error('Failed to assign agent');
      }
        toast.success('Agent assigned successfully', {
          position: 'top-center',
          duration: 3000
        });
        const guardianData= await response.json()
        

        await notifyGuardian(guardianData)
      
    } catch (error) {
      toast.error('Error assigning agent', {
        position: 'top-center',
        duration: 3000
      });
      console.error('Error assigning agent:', error);
    }
  };

  const notifyGuardian=async (guardianData)=>{
    // console.log();
    const {guardian}=guardianData;
    try {
    const {email, name}= guardian;
    console.log(email, name);
      const response= await fetch('https://mailing-server-six.vercel.app/api/guardians/notify', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({email, name})
      })
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to send notification to guardian')      
      }
      toast.success('Notification sent successfully', {
        position: 'top-center',
        duration: 3000
      });
    } catch (error) {
      toast.error('Error sending notification to guardian', {
        position: 'top-center',
        duration: 3000
      });
      console.error('Error sending notification to guardian:', error);
    }
  }


  

  // const handleUpdate = async () => {
  //   if (!window.confirm('Are you sure you want to update the tasks?')) return;
  //   try {
  //     const response = await fetch('http://localhost:5000/api/tasks/update', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(selectedAgents),
  //     });
  //     if (response.ok) {
  //       console.log('Tasks updated successfully');
  //       toast.success('Tasks updated successfully', {
  //         position: 'top-center',
  //         duration: 3000
  //       });
  //     } else {
  //       throw new Error('Failed to update tasks');
  //     }
  //   } catch (error) {
  //     toast.error('Error updating tasks', {
  //       position: 'top-center',
  //       duration: 3000
  //     });
  //     console.error('Error updating tasks:', error);
  //   }
  // };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== taskId));
        console.log('Task deleted successfully');
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title to the PDF
    doc.setFontSize(18);
    doc.text('Tasks Report', 14, 22);
    
    // Define the columns for the table
    const columns = [
      { header: 'ID', dataKey: 'id' },
      { header: 'Title', dataKey: 'title' },
      { header: 'Description', dataKey: 'description' },
      { header: 'Status', dataKey: 'status' },
      { header: 'Assigned Agent', dataKey: 'assigned_agent' },
      { header: 'Submitted By', dataKey: 'submitted_by' },
      { header: 'Type', dataKey: 'type' },
      { header: 'Created At', dataKey: 'created_at' }
    ];
    
    // Prepare the data for the table
    const data = filteredTasks.map(task => ({
      ...task,
      assigned_agent: agents.find(agent => agent.personelid === selectedAgents[task.id])?.firstName || '',
      created_at: new Date(task.created_at).toLocaleString()
    }));
    
    // Generate the table
    doc.autoTable({
      columns: columns,
      body: data,
      startY: 30,
      styles: { fontSize: 8, cellPadding: 1.5, overflow: 'linebreak' },
      columnStyles: { description: { cellWidth: 30 } }
    });
    
    // Save the PDF
    doc.save('tasks_report.pdf');
  };

  return (
    <main className='bg-[#D9D9D9] min-h-screen p-3'>
      <div className='bg-white w-full p-3 border border-black rounded-md'>
        <h1 className='text-left text-xl md:text-2xl my-5'>INBOX</h1>
        <div className='flex gap-3 font-bold ml-2'>
          <p
            className={`pb-2 mx-4 md:px-7 cursor-pointer ${filter === 'All' ? 'border-b border-red-700' : ''}`}
            onClick={() => setFilter('All')}
          >ALL</p>
          <p
            className={`pb-2 mx-4 md:px-7 cursor-pointer ${filter === 'Pending' ? 'border-b border-red-700' : ''}`}
            onClick={() => setFilter('Pending')}
          >PENDING</p>
          <p
            className={`pb-2 mx-4 md:px-7 cursor-pointer ${filter === 'In Progress' ? 'border-b border-red-700' : ''}`}
            onClick={() => setFilter('In Progress')}
          >IN PROGRESS</p>
          <p
            className={`pb-2 mx-4 md:px-7 cursor-pointer ${filter === 'Completed' ? 'border-b border-red-700' : ''}`}
            onClick={() => setFilter('Completed')}
          >COMPLETED</p>
        </div>
        <div className='border border-black my-2 overflow-x-auto rounded-lg'>
          <button 
            onClick={exportToPDF}
            className='float-end my-10 p-3 flex items-center gap-2 text-[#BC3333] font-bold'
          >
            <span>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 15L3.75 8.75L5.5 6.9375L8.75 10.1875V0H11.25V10.1875L14.5 6.9375L16.25 8.75L10 15ZM2.5 20C1.8125 20 1.22417 19.7554 0.735 19.2662C0.245833 18.7771 0.000833333 18.1883 0 17.5V13.75H2.5V17.5H17.5V13.75H20V17.5C20 18.1875 19.7554 18.7762 19.2663 19.2662C18.7771 19.7562 18.1883 20.0008 17.5 20H2.5Z" fill="#BC3333"/>
              </svg>
            </span>
            EXPORT
          </button>
          {/* <button 
            onClick={handleUpdate}
            className='float-end my-10 p-3 flex items-center gap-2 bg-[#BC3333] text-white font-bold rounded'
          >
            UPDATE CHANGES
          </button> */}
          <table className="w-full table-auto">
          <thead>
              <tr>
                <th className="px-4 py-2 text-start border border-gray-400">ID</th>
                <th className="px-4 py-2 text-start border border-gray-400">TITLE</th>
                <th className="px-4 py-2 text-start border border-gray-400">DESCRIPTION</th>
                <th className="px-4 py-2 text-start border border-gray-400">STATUS</th>
                <th className="px-4 py-2 text-start border border-gray-400 whitespace-nowrap">ASSIGNED AGENT</th>
                <th className="px-4 py-2 text-start border border-gray-400 whitespace-nowrap">SUBMITTED BY</th>
                <th className="px-4 py-2 text-start border border-gray-400">TYPE</th>
                <th className="px-4 py-2 text-start border border-gray-400 whitespace-nowrap">CREATED AT</th>
                <th className="px-4 py-2 text-start border border-gray-400">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task.id}>
                  <td className="px-4 py-2 border border-black">{task.id}</td>
                  <td className="px-4 py-2 border border-black">{task.title}</td>
                  <td className="px-4 py-2 border border-black">{task.description}</td>
                  <td className="px-4 py-2 border border-black">
                    <p className={`border p-1 rounded-xl ${task.status === 'Completed' ? 'border-green-600' : 'border-red-600'}`}>
                      {task.status}
                    </p>
                  </td>
                  <td className="px-4 py-2 border border-black">
                    <select 
                      value={selectedAgents[task.id] || ''}
                      onChange={(e) => handleAgentChange(task.id, e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select Agent</option>
                      {agents.map(agent => (
                        <option key={agent.personelid} value={agent.personelid}>
                          {agent.firstName} {agent.lastName}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 border border-black">{task.submitted_by}</td>
                  <td className="px-4 py-2 border border-black">{task.type}</td>
                  <td className="px-4 py-2 border border-black">{new Date(task.created_at).toLocaleString()}</td>
                  <td className="px-4 py-2 border border-black">
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Toaster/>
      </div>
    </main>
  );
};

export default Inbox;