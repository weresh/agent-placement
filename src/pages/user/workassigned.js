import React, { useEffect, useState } from 'react';

function Workassigned() {
  const [work, setWork] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem('user'));
      const userId = userData.personelid;

      const response = await fetch(`http://localhost:5000/api/tasks/agent/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setWork(data.map(task => ({
        caseid: task.id,
        reporttitle: task.title,
        reportdescription: task.description,
        status: task.status,
        category: task.type,
        assignedon: new Date(task.created_at).toLocaleString()
      })));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please try again later.');
      setLoading(false);
    }
  };

  const updateStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }

      // Refresh the task list after updating
      await fetchTasks();
    } catch (err) {
      console.error('Error updating task status:', err);
      setError('Failed to update task status. Please try again.');
    }
  };

  const filteredWork = work.filter(works => {
    if (filter === 'All') return true;
    return works.status === filter;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className='bg-[#D9D9D9] min-h-screen p-3 '>
      <div className='bg-white w-full p-3 border border-black rounded-md'>
        <h1 className='text-left text-3xl md:text-2xl my-5 font-bold'>WORK ASSIGNED</h1>
        <div className='flex gap-3 font-bold ml-2'>
          <p 
            className={`pb-2 mx-4 md:px-7 cursor-pointer ${filter === 'All' ? 'border-b border-red-700' : ''}`}
            onClick={() => setFilter('All')}
          >ALL</p>
          <p 
            className={`pb-2 mx-4 md:px-7 cursor-pointer ${filter === 'Completed' ? 'border-b border-red-700' : ''}`}
            onClick={() => setFilter('Completed')}
          >COMPLETED</p>
          <p 
            className={`pb-2 mx-4 md:px-7 cursor-pointer ${filter === 'Pending' ? 'border-b border-red-700' : ''}`}
            onClick={() => setFilter('Pending')}
          >PENDING</p>
          <p 
            className={`pb-2 mx-4 md:px-7 cursor-pointer ${filter === 'In Progress' ? 'border-b border-red-700' : ''}`}
            onClick={() => setFilter('In Progress')}
          >IN PROGRESS</p>
        </div>
        <div className='border border-black my-2 overflow-x-auto rounded-lg'>
          <button className='float-end my-10 p-3 flex items-center gap-2 text-[#BC3333] font-bold'>
            <span>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 15L3.75 8.75L5.5 6.9375L8.75 10.1875V0H11.25V10.1875L14.5 6.9375L16.25 8.75L10 15ZM2.5 20C1.8125 20 1.22417 19.7554 0.735 19.2662C0.245833 18.7771 0.000833333 18.1883 0 17.5V13.75H2.5V17.5H17.5V13.75H20V17.5C20 18.1875 19.7554 18.7762 19.2663 19.2662C18.7771 19.7562 18.1883 20.0008 17.5 20H2.5Z" fill="#BC3333"/>
              </svg>
            </span>
            EXPORT
          </button>
          
          <table className="w-full table-auto">
            <thead>
              <tr className="">
                <th className="px-4 py-2 text-start border border-gray-400 whitespace-nowrap">CASE ID</th>
                <th className="px-4 py-2 text-start border border-gray-400 whitespace-nowrap">REPORT TITLE</th>
                <th className="px-4 py-2 text-start border border-gray-400">DESCRIPTION</th>
                <th className="px-4 py-2 text-start border border-gray-400"><p>CATEGORY</p></th>
                <th className="px-4 py-2 text-start border border-gray-400">STATUS</th>
                <th className="px-4 py-2 text-start border border-gray-400 whitespace-nowrap">ASSIGNED ON</th>
                <th className="px-4 py-2 text-start border border-gray-400">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredWork.map(works => (
                <tr key={works.caseid}>
                  <td className="px-4 py-2 border border-black">{works.caseid}</td>
                  <td className="px-4 py-2 border border-black">{works.reporttitle}</td>
                  <td className="px-4 py-2 border border-black">{works.reportdescription}</td>
                  <td className="px-4 py-2 border border-black">{works.category}</td>
                  <td className="px-4 py-2 border border-black">
                    <p className={`border whitespace-nowrap p-1 rounded-xl ${works.status === 'Completed' ? 'border-green-600' : 'border-red-600'}`}>
                      {works.status}
                    </p>
                  </td>
                  <td className="px-4 py-2 border border-black">{works.assignedon}</td>
                  <td className="px-4 py-2 border border-black">
                    <select 
                      className="border rounded p-1"
                      value={works.status}
                      onChange={(e) => updateStatus(works.caseid, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
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

export default Workassigned;