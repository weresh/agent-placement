// import React, { useEffect, useState } from 'react'

// const Accountsettings = () => {
//     const[formData, setFormdata] = useState({
//         email: '',
//         phone: '',
//         fname: '',
//         lname: '',
//         password: ''
//     });
   

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         const userData = JSON.parse(sessionStorage.getItem('user'));
//         if(!userData){
//             alert("Please login first")
//             return
//         }
//         console.log(userData);
//         // ebu login then usubmit hii form tuone. hizo fields zingine

//         // try {
//         //     const response= fetch('http://localhost:5000/api/user/accountsettings', {
//         //         method: 'PUT',
//         //         headers: {
//         //             'Content-Type': 'application/json'
//         //         },
//         //         body: JSON.stringify(formData)
//         //     })
//         //     if(response.ok){
//         //         console.log('account settings updated successfully', response)
//         //         alert("account settings updated successfully")
//         //     }
//         // } catch (error) {
//         //     console.log(error)
//         //     alert("An error occurred", error)
            
//         // }
//     }


//   return (
//     <div className="flex items-center justify-center">
//         <div className="bg-gray-300  mt-10 p-10 rounded-lg ">
//             <form action="" onSubmit={handleSubmit}>
//             <p className="text-6xl font-bold">ACCOUNT SETTINGS</p>
//                <div className='flex justify-between items-center'>
//                    <div className="flex flex-col  w-[48%]">
//                        <label  className="text-left font-semibold">Email address :</label>
//                        <input type="text" 
//                        onChange={(e) => setFormdata({...formData, email: e.target.value})} 
//                        className="border-2 border-black rounded-md outline-8 p-2  text-gray-500 bg-slate-100" 
//                        value='info@gmail.com'/>
//                    </div>
//                    <div className="flex flex-col my-3 w-[48%]">
//                        <label  className="text-left font-semibold">Phone no :</label>
//                        <input 
//                        onChange={(e) => setFormdata({...formData, phone: e.target.value})}
//                        className="border-2 border-black rounded-lg outline-8 p-2 text-gray-500 bg-slate-100"  value='+254742476290'/>
//                    </div>
//                </div>
//                <div className='flex justify-between items-center'>
//                    <div className="flex flex-col w-[48%]">
//                        <label className="text-left font-semibold">Agent first Name :</label>
//                        <input 
//                        onChange={(e)=> setFormdata({...formData, fname: e.target.value})}
//                         type="text" className="border-2 border-black rounded-lg outline-8 p-2 text-gray-500 bg-slate-100" />
//                    </div>
//                    <div className="flex flex-col w-[48%]">
//                        <label className="text-left font-semibold">Agent last Name :</label>
//                        <input onChange={(e)=> setFormdata({...formData, lname: e.target.value})}  type="text" className="border-2 border-black rounded-lg outline-8 p-2 text-gray-500 bg-slate-100"  value='Were'/>
//                    </div>
//                    <div className="flex flex-col my-3 w-[48%]">
//                        <label  className="text-left font-semibold">Password :</label>
//                        <input  
//                        onChange={(e)=> setFormdata({...formData, password: e.target.value})}
//                        className="border-2 border-black rounded-lg outline-8 p-2 text-gray-500 bg-slate-100"  value='Field/Desk'/>
//                    </div>
//                </div>
//                <button type='submit' className='border w-full rounded-2xl bg-green-600  text-lg text-white font-semibold py-3 my-3 cursor-pointer' >UPDATE</button>
//                <button className='float-left text-red-700 text-lg px-3 font-semibold'>CHANGE PASSWORD *</button>
//             </form>
//        </div>

//     </div>
//   )
// }

// export default Accountsettings
import React, { useEffect, useState } from 'react'

const Accountsettings = () => {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        fname: '',
        lname: '',
        password: ''
    });

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        if (userData) {
            setFormData({
                email: userData.email,
                phone: userData.phone,
                fname: userData.firstName,
                lname: userData.lastName,
                password: ''  
            });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = JSON.parse(sessionStorage.getItem('user'));
        if (!userData) {
            alert("Please login first")
            return
        }
        console.log(userData);

        try {
            const response = await fetch(`http://localhost:5000/api/user/accountsettings/${userData.personelid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                console.log('account settings updated successfully', response)
                alert("Account settings updated successfully")
                   // Update session storage with new data
                   const updatedUserData = {
                    ...userData,
                    email: formData.email,
                    phone: formData.phone,
                    firstName: formData.fname,
                    lastName: formData.lname,
                }
                sessionStorage.setItem('user', JSON.stringify(updatedUserData));
            }
        } catch (error) {
            console.log(error)
            alert("An error occurred", error)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className="bg-gray-300 mt-10 p-10 rounded-lg">
                <form onSubmit={handleSubmit}>
                    <p className="text-6xl font-bold">ACCOUNT SETTINGS</p>
                    <div className='flex justify-between items-center'>
                        <div className="flex flex-col w-[48%]">
                            <label className="text-left font-semibold">Email address :</label>
                            <input
                                type="text"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="border-2 border-black rounded-md outline-8 p-2 text-gray-500 bg-slate-100"
                                value={formData.email}
                            />
                        </div>
                        <div className="flex flex-col my-3 w-[48%]">
                            <label className="text-left font-semibold">Phone no :</label>
                            <input
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="border-2 border-black rounded-lg outline-8 p-2 text-gray-500 bg-slate-100"
                                value={formData.phone}
                            />
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className="flex flex-col w-[48%]">
                            <label className="text-left font-semibold">Admin first Name :</label>
                            <input
                                onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                                type="text"
                                className="border-2 border-black rounded-lg outline-8 p-2 text-gray-500 bg-slate-100"
                                value={formData.fname}
                            />
                        </div>
                        <div className="flex flex-col w-[48%]">
                            <label className="text-left font-semibold">Admin last Name :</label>
                            <input
                                onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                                type="text"
                                className="border-2 border-black rounded-lg outline-8 p-2 text-gray-500 bg-slate-100"
                                value={formData.lname}
                            />
                        </div>
                        <div className="flex flex-col my-3 w-[48%]">
                            <label className="text-left font-semibold">Password :</label>
                            <input
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                type="password"
                                className="border-2 border-black rounded-lg outline-8 p-2 text-gray-500 bg-slate-100"
                                value={formData.password}
                            />
                        </div>
                    </div>
                    <button type='submit' className='border w-full rounded-2xl bg-green-600 text-lg text-white font-semibold py-3 my-3 cursor-pointer'>UPDATE</button>
                    <button className='float-left text-red-700 text-lg px-3 font-semibold'>CHANGE PASSWORD *</button>
                </form>
            </div>
        </div>
    )
}

export default Accountsettings
