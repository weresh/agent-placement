// import React , { useState } from 'react'
// import toast, { Toaster } from 'react-hot-toast';

// const Completionreport = () => {

//     const [formData, setFormData] = useState({
//         datestarted: '',
//         datecompleted: '',
//         caseid: '',
//         category: '',
//         route: '',
//         reporttitle: '',
//         summary: '',
//       });
    
//       const [message, setMessage] = useState('');
    
//       const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevData => ({
//           ...prevData,
//           [name]: value
//         }));
//       };
    
//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//           const response = await fetch('http://localhost:3306/api/completionreport', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//           });
    
//           toast.success('Report submitted successfully',{
//             duration: 3000,
//             position: 'top-center',
//           });
//           if (response.ok) {
//             setMessage('Thank you for your cooperation!');
//             setFormData({
//                 datestarted: '',
//                 datecompleted: '',
//                 caseid: '',
//                 category: '',
//                 route: '',
//                 reporttitle: '',
//                 summary: '',
//             });
//           } else {
//             throw new Error('Failed to submit report');
//           }
//         } catch (error) {
//           toast.error('Failed to submit report. Please try again.',{
//             duration: 3000,
//             position: 'top-center',
//           })
//           setMessage('Failed to submit report. Please try again.');
//         }
//       };
    

//   return (
//     <div className="flex  justify-center items-center">
//           <div>
//             {message && (
//             <div className={`mb-4 p-2 rounded ${message.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
//             {message}
//             </div>
//             )}
//               <form onSubmit={handleSubmit} className="max-w-6xl">
//                   <p className="text-6xl font-bold text-center pb-6">Agent Case Completion</p>
//                   <div className="flex justify-around ">
//                       <div>
//                           <label for="datestart" className="font-semibold">Date Started :</label>
//                             <input
//                             type="date"
//                             id="datestarted"
//                             name="datestarted"
//                             value={formData.datestarted}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                       <div>
//                           <label for="datecompleted" className="font-semibold">Date Completed :</label>
//                           <input
//                             type="date"
//                             id="datecompleted"
//                             name="datecompleted"
//                             value={formData.datecompleted}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                   </div>
//                   <div className="py-3 flex flex-col md:flex-row">
//                       <label for="caseid" className="font-semibold">Case ID :</label>
//                       <input
//                             type="text"
//                             id="caseid"
//                             name="caseid"
//                             value={formData.caseid}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                       <label for="category" className="font-semibold">Category :</label>
//                       <select id="category"  value={formData.category}
//                             onChange={handleChange}
//                             required className=" bg-gray-200">
//                           <option value="select category">Select Category</option>
//                           <option value="field">Field</option>
//                           <option value="desk">Desk</option>
//                       </select>
//                       <label for="route" className="font-semibold">Route :</label>
//                       <input
//                             type="text"
//                             id="route"
//                             name="route"
//                             value={formData.route}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                   </div>
//                   <div  className="flex flex-col items-center">
//                       <label for="title" class="font-semibold">Report title :</label>
//                       <input
//                             type="text"
//                             id="reporttitle"
//                             name="reporttitle"
//                             value={formData.reporttitle}
//                             onChange={handleChange}
//                             required
//                             class="bg-gray-200 w-3/4"
//                         />
//                   </div>
                
//                   <div className="flex flex-col items-center">
//                       <label for="summary" className="py-4 font-semibold">Report Summary :</label>
//                       <input
//                             type="text"
//                             id="summary"
//                             name="summary"
//                             value={formData.summary}
//                             onChange={handleChange}
//                             required
//                             className="bg-gray-200 w-full h-[40vh]"
//                         />
                     
//                   </div>                 
//                   <button className="bg-green-600 text-white font-bold py-2 px-11 rounded-lg my-4 ">GENERATE REPORT</button>
//               </form>
//           </div>
//     </div>
//   )
// }

// export default Completionreport

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const CompletionReport = () => {
  const [formData, setFormData] = useState({
    datestarted: '',
    datecompleted: '',
    caseid: '',
    category: '',
    reporttitle: '',
    summary: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(sessionStorage.getItem('user'));
      const userId = userData.personelid;
      const response = await fetch(`http://localhost:5000/api/completionreport/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Report submitted successfully', {
          duration: 3000,
          position: 'top-center',
        });
        setMessage('Thank you for your cooperation!');
        setFormData({
          datestarted: '',
          datecompleted: '',
          caseid: '',
          category: '',
          reporttitle: '',
          summary: '',
        });
      } else {
        throw new Error('Failed to submit report');
      }
    } catch (error) {
      toast.error('Failed to submit report. Please try again.', {
        duration: 3000,
        position: 'top-center',
      });
      setMessage('Failed to submit report. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        {message && (
          <div className={`mb-4 p-2 rounded ${message.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center mb-6">Agent Case Completion</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="datestarted" className="block font-semibold mb-2">Date Started:</label>
              <input
                type="date"
                id="datestarted"
                name="datestarted"
                value={formData.datestarted}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="datecompleted" className="block font-semibold mb-2">Date Completed:</label>
              <input
                type="date"
                id="datecompleted"
                name="datecompleted"
                value={formData.datecompleted}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="caseid" className="block font-semibold mb-2">Case ID:</label>
              <input
                type="text"
                id="caseid"
                name="caseid"
                value={formData.caseid}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="category" className="block font-semibold mb-2">Category:</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select Category</option>
                <option value="Field">Field</option>
                <option value="Desk">Desk</option>
              </select>
            </div>
          </div>
        
          <div className="mb-4">
            <label htmlFor="reporttitle" className="block font-semibold mb-2">Report Title:</label>
            <input
              type="text"
              id="reporttitle"
              name="reporttitle"
              value={formData.reporttitle}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="summary" className="block font-semibold mb-2">Report Summary:</label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white font-bold py-2 rounded-md hover:bg-green-700 transition duration-300">
            Submit Report
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default CompletionReport;
