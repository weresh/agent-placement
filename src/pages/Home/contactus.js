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
                <div className='my-auto'>
                  <h1 className='text-xl font-bold'>GET IN CONTACT WITH US:</h1>
                  <p className='text-lg  font-bold'>Call:</p>
                  <p className='text-lg'>116/0720049070</p>
                  <p className='text-lg  font-bold'>Email:</p>
                  <p className='text-lg'>116@childlinekenya.co.ke</p>
                </div>
                
            </div>
        </div>
        

    </div>
  )
}

export default contactus