import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Adminreport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/completionreport')
      .then(response => response.json())
      .then(data => setReports(data))
      .catch(error => console.error('Error fetching reports:', error));
  }, []);
  console.log(reports)

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Case ID', 'Category', 'Route', 'Report Title', 'Date Started', 'Date Completed', 'Summary', 'Agent Name', 'Agent Email', 'Agent Phone']],
      body: reports.map(report => [
        report.case_id,
        report.category,
        report.route,
        report.report_title,
        new Date(report.date_started).toLocaleDateString(),
        new Date(report.date_completed).toLocaleDateString(),
        report.summary,
        `${report.firstName} ${report.lastName}`,
        report.email,
        report.phone
      ]),
    });
    doc.save('admin_report.pdf');
  };

  return (
    <div className="min-h-screen bg-white p-4 rounded-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Download Reports</h2>
      </div>
      
      <div className='border border-gray-400'>
        <div className="flex justify-end gap-2 mb-2">
          <button 
            className="flex items-center px-4 gap-1 py-2 text-[#BC3333] rounded-md"
            onClick={downloadPDF}
          >
            <span>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 15L3.75 8.75L5.5 6.9375L8.75 10.1875V0H11.25V10.1875L14.5 6.9375L16.25 8.75L10 15ZM2.5 20C1.8125 20 1.22417 19.7554 0.735 19.2662C0.245833 18.7771 0.000833333 18.1883 0 17.5V13.75H2.5V17.5H17.5V13.75H20V17.5C20 18.1875 19.7554 18.7762 19.2663 19.2662C18.7771 19.7562 18.1883 20.0008 17.5 20H2.5Z" fill="#BC3333"/>
              </svg>
            </span>
            EXPORT
          </button>
        </div>
        <div className="overflow-x-auto min-h-[40vh]">
          <table className="w-full px-3 table-auto">
            <thead>
              <tr className='text-sm text-gray-500'>
                <th className="px-4 py-2 text-start border-l border-gray-400">USER ID</th>
                <th className="px-4 py-2 text-start border-l border-gray-400">CATEGORY</th>
                <th className="px-4 py-2 text-start border-l border-gray-400">REPORT&nbsp;TITLE</th>
                <th className="px-4 py-2 text-start border-l border-gray-400 whitespace-nowrap">DATE STARTED</th>
                <th className="px-4 py-2 text-start border-l border-gray-400 whitespace-nowrap">DATE COMPLETED</th>
                <th className="px-4 py-2 text-start border-l border-gray-400">SUMMARY</th>
                <th className="px-4 py-2 text-start border-l border-gray-400 whitespace-nowrap">AGENT NAME</th>
                <th className="px-4 py-2 text-start border-l border-gray-400 whitespace-nowrap">AGENT EMAIL</th>
                <th className="px-4 py-2 text-start border-l border-gray-400 whitespace-nowrap">AGENT PHONE</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map(report => (
                  <tr key={report.id} className='border border-gray-400'>
                    <td className="px-4 py-2">{report.caseid}</td>
                    <td className="px-4 py-2">{report.category}</td>
                    <td className="px-4 py-2">{report.reporttitle}</td>
                    <td className="px-4 py-2">{new Date(report.datestarted).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{new Date(report.datecompleted).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{report.summary}</td>
                    <td className="px-4 py-2">{`${report.firstName} ${report.lastName}`}</td>
                    <td className="px-4 py-2">{report.email}</td>
                    <td className="px-4 py-2">{report.phone}</td>
                  </tr>
                ))
              ) : (
                <tr className='h-[50vh] bg-[#D9D9D9] border border-gray-400'>
                  <td colSpan="10" className="text-center">NO ROWS</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <div className='flex items-center gap-2'>
            <span className="mx-2">{`0-${reports.length} of ${reports.length}`}</span>
            <span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.95395 8.54812L11.6206 14.5481C11.7206 14.6173 11.8377 14.6578 11.9591 14.6653C12.0805 14.6728 12.2016 14.6469 12.3093 14.5904C12.4171 14.534 12.5073 14.4491 12.5703 14.3451C12.6333 14.241 12.6666 14.1217 12.6666 14.0001V2.00012C12.6667 1.87843 12.6335 1.75905 12.5705 1.6549C12.5076 1.55076 12.4174 1.46582 12.3096 1.4093C12.2019 1.35277 12.0807 1.32682 11.9592 1.33425C11.8378 1.34168 11.7207 1.38221 11.6206 1.45145L2.95395 7.45145C2.86566 7.51307 2.79355 7.5951 2.74376 7.69057C2.69397 7.78603 2.66797 7.89211 2.66797 7.99978C2.66797 8.10745 2.69397 8.21353 2.74376 8.309C2.79355 8.40446 2.86566 8.4865 2.95395 8.54812Z" fill="black"/>
              </svg>
            </span>
            <span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.69132 14.5906C3.79916 14.6467 3.92025 14.6724 4.04157 14.6648C4.1629 14.6573 4.27989 14.6169 4.37998 14.5479L13.0467 8.54794C13.1352 8.48658 13.2076 8.40468 13.2576 8.30924C13.3075 8.2138 13.3337 8.10767 13.3337 7.99994C13.3337 7.8922 13.3075 7.78607 13.2576 7.69063C13.2076 7.59519 13.1352 7.51329 13.0467 7.45194L4.37998 1.45194C4.27997 1.38273 4.16292 1.34221 4.04153 1.33475C3.92013 1.32729 3.79901 1.35319 3.69127 1.40963C3.58354 1.46607 3.49329 1.55091 3.43032 1.65496C3.36734 1.75902 3.33403 1.87831 3.33398 1.99994V13.9999C3.33396 14.1216 3.36725 14.241 3.43024 14.3451C3.49323 14.4492 3.58352 14.5341 3.69132 14.5906Z" fill="black"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminreport;