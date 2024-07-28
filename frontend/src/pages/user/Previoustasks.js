import React from 'react';

function PreviousTasks() {
  const ptasks= [
    { caseid: 55763, reporttitle: 'check allocation', status: 'Completed', category:'Field', assignedon:'2024-04-15 08:11' },
    { caseid: 55766, reporttitle: 'home inspection', status: 'Completed', category:'Field', assignedon: '2024-04-18 11:11' },
    { caseid: 55769, reporttitle:'home inspection', status: 'Completed', category:'Field', assignedon: '2024-04-21 14:11' },
    { caseid: 55771, reporttitle: 'check allocation', status: 'Completed', category:'Desk', assignedon: '2024-04-23 16:11' },
    { caseid: 55772, reporttitle:'home visitation', status: 'Completed', category:'Field', assignedon: '2024-04-24 17:11' }
  ];
  
 
 

  return (
    <main className='bg-[#D9D9D9] min-h-screen p-3 '>
      <div className='bg-white  w-full p-3 border border-black  rounded-md'>
        <h1 className='text-left text-xl md:text-2xl my-5'>PREVIOUS TASKS</h1>
        <div className='border border-gray-700 my-2 overflow-x-auto  rounded-lg'>
          <button className='float-end py-8 p-3 flex items-center gap-2 text-[#BC3333] font-bold'>
            <span>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 15L3.75 8.75L5.5 6.9375L8.75 10.1875V0H11.25V10.1875L14.5 6.9375L16.25 8.75L10 15ZM2.5 20C1.8125 20 1.22417 19.7554 0.735 19.2662C0.245833 18.7771 0.000833333 18.1883 0 17.5V13.75H2.5V17.5H17.5V13.75H20V17.5C20 18.1875 19.7554 18.7762 19.2663 19.2662C18.7771 19.7562 18.1883 20.0008 17.5 20H2.5Z" fill="#BC3333"/>
              </svg>
            </span>
            EXPORT
          </button>
          <table className="w-full table-auto ">
            <thead>
              <tr className="">
               <th className="px-4 py-2 text-start border border-gray-400"> CASE ID</th>
		<th className="px-4 py-2 text-start border border-gray-400"> REPORT TITLE</th>
                <th className="px-4 py-2 text-start border border-gray-400 "><p>CATEGORY</p></th>
                <th className="px-4 py-2 text-start border border-gray-400">Status</th>
                <th className="px-4 py-2 text-start border border-gray-400">ASSIGNED ON</th>
              </tr>
            </thead>
            <tbody>
              {ptasks.map(tasks => (
                <tr key={tasks.id}>
                  <td className="px-4 py-2 border border-black">{tasks.caseid}</td>
                  <td className="px-4 py-2 border border-black ">{tasks.reporttitle}</td>
                  <td className="px-4 py-2 border border-black text-left">{tasks.category}</td>
                  <td className="px-4 py-2 border border-black">
                    <p className={`border p-1 rounded-xl text-green-500 border-green-600`}>
                      {tasks.status}
                    </p>
                  </td>
                  <td className="px-4 py-2 border border-black">{tasks.assignedon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-4">
          <span>1 row selected</span>
          <div>
            <button className="px-4 py-2 rounded-md">
                <span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.95395 8.54799L11.6206 14.548C11.7206 14.6172 11.8377 14.6577 11.9591 14.6652C12.0805 14.6726 12.2016 14.6467 12.3093 14.5903C12.4171 14.5339 12.5073 14.449 12.5703 14.345C12.6333 14.2409 12.6666 14.1216 12.6666 14V1.99999C12.6667 1.87831 12.6335 1.75893 12.5705 1.65478C12.5076 1.55064 12.4174 1.4657 12.3096 1.40918C12.2019 1.35265 12.0807 1.3267 11.9592 1.33413C11.8378 1.34156 11.7207 1.38209 11.6206 1.45133L2.95395 7.45133C2.86566 7.51295 2.79355 7.59498 2.74376 7.69045C2.69397 7.78591 2.66797 7.89199 2.66797 7.99966C2.66797 8.10733 2.69397 8.21341 2.74376 8.30888C2.79355 8.40434 2.86566 8.48637 2.95395 8.54799Z" fill="black"/>
                    </svg>
                </span>
            </button>

            <span className="mx-2">1-10 of 10</span>

            <button className="px-4 py-2 rounded-md">
              <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.69132 14.5907C3.79916 14.6468 3.92025 14.6725 4.04157 14.665C4.1629 14.6575 4.27989 14.617 4.37998 14.5481L13.0467 8.54806C13.1352 8.48671 13.2076 8.4048 13.2576 8.30936C13.3075 8.21393 13.3337 8.1078 13.3337 8.00006C13.3337 7.89232 13.3075 7.78619 13.2576 7.69076C13.2076 7.59532 13.1352 7.51341 13.0467 7.45206L4.37998 1.45206C4.27997 1.38286 4.16292 1.34233 4.04153 1.33487C3.92013 1.32742 3.79901 1.35331 3.69127 1.40975C3.58354 1.4662 3.49329 1.55104 3.43032 1.65509C3.36734 1.75914 3.33403 1.87843 3.33398 2.00006V14.0001C3.33396 14.1218 3.36725 14.2411 3.43024 14.3452C3.49323 14.4494 3.58352 14.5343 3.69132 14.5907Z" fill="black"/>
                  </svg>
              </span>
            </button>
          </div>
      </div>

      </div>
    </main>
  );
}

export default PreviousTasks;
