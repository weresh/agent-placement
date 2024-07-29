import React, { useEffect, useState } from 'react'

const Accountsettings = () => {
    const[formData, setFormdata] = useState({
        email: '',
        phone: '',
        name: '',
        password: ''
    });
   

    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = JSON.parse(sessionStorage.getItem('user'));
        if(!userData){
            alert("Please login first")
            return
        }

        try {
            const response= fetch('http://localhost:5000/api/user/accountsettings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if(response.ok){
                console.log('account settings updated successfully', response)
                alert("account settings updated successfully")
            }
        } catch (error) {
            console.log(error)
            alert("An error occurred", error)
            
        }
    }


  return (
    <div className="flex items-center justify-center">
        <div className="bg-gray-300  mt-10 p-10 rounded-lg ">
            <form action="" onSubmit={handleSubmit}>
            <p className="text-6xl font-bold">ACCOUNT SETTINGS</p>
               <div className='flex justify-between items-center'>
                   <div className="flex flex-col  w-[48%]">
                       <label  className="text-left font-semibold">Email address :</label>
                       <input type="text" 
                       onChange={(e) => setFormdata({...formData, email: e.target.value})} 
                       className="border-2 border-black rounded-md outline-8 p-2  text-gray-500 bg-slate-100" 
                       value='info@gmail.com'/>
                   </div>
                   <div className="flex flex-col my-3 w-[48%]">
                       <label  className="text-left font-semibold">Phone no :</label>
                       <input 
                       onChange={(e) => setFormdata({...formData, phone: e.target.value})}
                       className="border-2 border-black rounded-lg outline-8 p-2 text-gray-500 bg-slate-100"  value='+254742476290'/>
                   </div>
               </div>
               <div className='flex justify-between items-center'>
                   <div className="flex flex-col w-[48%]">
                       <label className="text-left font-semibold">Agent Name :</label>
                       <input type="text" className="border-2 border-black rounded-lg outline-8 p-2 text-gray-500 bg-slate-100" disabled value='Were'/>
                   </div>
                   <div className="flex flex-col my-3 w-[48%]">
                       <label  className="text-left font-semibold">Password :</label>
                       <input  
                       onChange={(e)=> setFormdata({...formData, password: e.target.value})}
                       className="border-2 border-black rounded-lg outline-8 p-2 text-gray-500 bg-slate-100"  value='Field/Desk'/>
                   </div>
               </div>
               <button type='submit' className='border w-full rounded-2xl bg-green-600  text-lg text-white font-semibold py-3 my-3 cursor-pointer' disabled>UPDATE</button>
               <button className='float-left text-red-700 text-lg px-3 font-semibold'>CHANGE PASSWORD *</button>
            </form>
       </div>

    </div>
  )
}

export default Accountsettings