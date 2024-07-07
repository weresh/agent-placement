import React from 'react'

const Completionreport = () => {
  return (
    <div className="flex  justify-center items-center">
          <div>
              <div className="max-w-6xl">
                  <p className="text-6xl font-bold text-center pb-6">Agent Case Completion</p>
                  <div className="flex justify-around ">
                      <div>
                          <label for="datestart" className="font-semibold">Date Started :</label>
                          <input type="date" className="bg-gray-200"></input>
                      </div>
                      <div>
                          <label for="datecompleted" className="font-semibold">Date Completed :</label>
                          <input type="date"  className="bg-gray-200"></input>
                      </div>
                  </div>
                  <div className="py-3 flex flex-col md:flex-row">
                      <label for="caseid" className="font-semibold">Case ID :</label>
                      <input type="text" className="bg-gray-200 "></input>
                      <label for="category" className="font-semibold">Category :</label>
                      <select id="category" className=" bg-gray-200">
                          <option value="select category">Select Category</option>
                          <option value="field">Field</option>
                          <option value="desk">Desk</option>
                      </select>
                      <label for="route" className="font-semibold">Route :</label>
                      <input type="text" className="bg-gray-200"></input>
                  </div>
                  <div  className="flex flex-col items-center">
                      <label for="title" class="font-semibold">Report title :</label>
                      <input type="text" class="bg-gray-200 w-3/4"></input>
                  </div>
                
                  <div className="flex flex-col items-center">
                      <label for="summary" className="py-4 font-semibold">Report Summary :</label>
                      <input type="text"  className="bg-gray-200 w-full h-[40vh]"></input>
                      <button className="bg-green-600 text-white font-bold py-2 px-11 rounded-lg my-4 ">GENERATE REPORT</button>
                  </div>                 
              </div>
          </div>
    </div>
  )
}

export default Completionreport