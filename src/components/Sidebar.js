import React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react';
import { FaUserCircle, FaGrin, FaLocationArrow, FaRegHourglass, FaRegFolderOpen, FaRegFilePdf } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import { IoMdArrowDropleft } from "react-icons/io";
import { MdOutlineArrowDropUp } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";


import { NavLink } from 'react-router-dom';
function Navbar() {
    
    const [ showNav, setShowNav ] = useState(false)
    const [showReportsDropdown, setShowReportsDropdown] = useState(false);

    const showNavBar=()=>{
        setShowNav(!showNav)
    }

   
    
     const toggleReportsDropdown = () => {
        setShowReportsDropdown(!showReportsDropdown);
      };
      


     // node initialization
     const menuRef = useRef();

     // Listens to clicks and scrolls outside, or navlink click the menu to close it
     const handleOutsideClick = useCallback(
        (e) => {
          if (showNav && !menuRef.current.contains(e.target)) {
            setShowNav(false);
          }
        },
        [showNav, menuRef]
      );
      
      const handleScroll = useCallback(() => {
        setShowNav(false);
      }, []);
 
     useEffect(() => {
         if (showNav) {
             document.addEventListener("mousedown", handleOutsideClick);
             window.addEventListener("scroll", handleScroll);
         } else {
             document.removeEventListener("mousedown", handleOutsideClick);
             window.removeEventListener("scroll", handleScroll);
         }
 
         return () => {
             document.removeEventListener("mousedown", handleOutsideClick);
             window.removeEventListener("scroll", handleScroll);
         };
     }, [showNav, handleOutsideClick, handleScroll]);

  return (
    <div className='md:static absolute z-10' ref={menuRef}>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" onClick={showNavBar} aria-controls="logo-sidebar" type="button" className={`${showNav ? "hidden" : "inline-flex"} z-10 re items-center  p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200`}>
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>

          <aside id="logo-sidebar" className={`top-0 left-0 z-40 w-80  h-screen transition-transform ${showNav ? 'block' : 'hidden'} md:block`} aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-[#000] ">
                <div className="flex justify-between
                 gap-2 items-center ps-2.5 mb-8 ">
                    <div className='flex'>
                      <FaUserCircle className='text-white mr-2' size={32} />
                            <div className='text-white text-left'>
                                    <span className="self-center text-2xl font-semibold whitespace-nowrap">Agent Name</span>
                                    <p>AGENT</p>
                                    <span className='flex items-center  gap-2'>Welcome
                                    <TbReload className='text-white' size={16}/>
                                    </span>
                            </div>
                    </div>
                    <IoMdArrowDropleft size={32} color='white' />
                </div>

                <ul className="space-y-5 font-medium navlinks">

                    <li>
                        <NavLink to='/user/personaldetails' className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-[#E3B820] group">
                            <FaGrin size={32} color='white'/>
                            <span className="ms-3 text-md md:text-lg text-white ">PERSONAL DETAILS</span>
                        </NavLink>
                    </li>

                    <li className='flex flex-col items-center'>
                        <NavLink to='/user/location' className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-[#E3B820] group">
                            <FaLocationArrow size={32} color='white'/>
                            <span className="ms-3 text-md md:text-lg text-white">LOCATION</span>
                        </NavLink>
                    </li>

			        <li className='flex flex-col items-center'>
                        <NavLink to='/user/workassigned' className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-[#E3B820] group">
                            <FaRegHourglass size={32} color='white'/>
                            <span className="ms-3 text-md md:text-lg text-white">WORK ASSIGNED</span>
                        </NavLink>
                    </li>

                
                    <li className='flex flex-col items-center'>
                        <NavLink to='/user/reports/Completionreport' className="flex justify-between items-center w-full p-2 text-gray-900 rounded-lg  hover:bg-[#E3B820] group">
                           <div className='flex gap-2'>
                           <FaRegFilePdf size={32} color='white'/>
                                    <span className="ms-3 text-md md:text-lg text-white">REPORTS</span>
                           </div>
                          <MdOutlineArrowDropUp size={32} onClick={toggleReportsDropdown} className={`ml-2 ${showReportsDropdown ? 'rotate-0': "-rotate-90" } `} color='white'/>
                        </NavLink>
                        {showReportsDropdown && (
                            <ul className='text-white  font-oswald  w-40 text-left mt-2'>
                                <li onClick={()=>{console.log('')}} className='hover:bg-[#E3B820] p-2 rounded-md cursor-pointer'><NavLink to="/user/reports/completionreport">Completion Report</NavLink></li>
                                {/* <li onClick={()=>{console.log('')}} className='hover:bg-[#E3B820] p-2 rounded-md cursor-pointer'><NavLink to="/user/reports/downloadreports">Download Report</NavLink></li>     */}
                            </ul>
                        )}
                    </li>
                    <li>
                        <NavLink to='/user/previoustasks' className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-[#E3B820] group">
                            <FaRegFolderOpen size={32} color='white'/>
                            <span className="ms-3 text-md md:text-lg text-white">PREVIOUS TASKS</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/user/accountsettings' className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-[#E3B820] group">
                            <IoMdSettings size={32} color='white'/>
                            <span className="ms-3 text-md md:text-lg text-white">ACCOUNT SETTINGS</span>
                        </NavLink>
                    </li>
                   
                </ul>
                <NavLink to='/login' className='text-white uppercase bg-[#BC3333} w-18 p-6 text-center'>logout </NavLink>
                </div>
                
            </aside>
    </div>
  )
}

export default Navbar