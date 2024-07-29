import React from 'react'

const contactus = () => {
  return (
    <div className='mt-14'>
          <div className="font-bold justify-around flex flex-col md:flex-row gap-4 bg-green-500 mb-3">
            <a href="/"><button>HOME</button></a>
            <a href="/contactus"><button> CONTACT US</button></a>
            <a href="/help"><button>HELP/SUPPORT</button></a>
            <a href="/login" className='border-2 border-black px-4 py-2 rounded-lg'><button>LOG IN</button></a>
            <a href="/register" className='border-2 border-black px-4 py-2 rounded-lg'><button>REGISTER</button></a>
          </div>

        <div className="flex justify-center items-center">   
            <div className="max-w-4xl bg-gray-400 flex flex-col md:flex-row rounded-lg">
                <img src="/images/contactus.png" className='p-8' alt="contactus" srcset="" />
                <form className="p-5 my-auto">
                    <label for="text">Full Name :</label>
                    <input type="text" className="w-full bg-gray-300 rounded-md"></input>
                    <label for="Email" >Email:</label>
                    <input type="email" className="w-full bg-gray-300 rounded-md" placeholder="muhonja@gmail.com"></input>
                    <label>Message:</label>
                    <input type="text" className="w-full h-24 bg-gray-300 rounded-md"></input>
                    <button onClick={() => {alert('Request submitted. Response will be sent on email')}} type="submit" value="SUBMIT" className="bg-green-600 font-semibold px-4 py-2 my-3 rounded-2xl w-1/2 mx-auto">SUBMIT</button>
                </form>
                
            </div>
        </div>
        

    </div>
  )
}

export default contactus