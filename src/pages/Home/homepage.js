import React from 'react'

const homepage = () => {
  return (
    <div className='mt-14'>
          <div className="font-bold justify-around flex flex-col md:flex-row gap-4 bg-green-500 mb-3 ">
            <a href="/"><button>HOME</button></a>
            <a href="/contactus"><button> CONTACT US</button></a>
            <a href="/help"><button>HELP/SUPPORT</button></a>
            <a href="/login" className='border-2 border-black px-4 py-2 rounded-lg'><button>LOG IN</button></a>
            <a href="/register" className='border-2 border-black px-4 py-2 rounded-lg'><button>REGISTER</button></a>
        </div>
      <div>
        <img src="/images/home.png"  alt="hero" srcset="" />
      </div>
      <p className="bg-gray-400 text-center py-8">We aim to give you an experience worth every second of your time.  Here at the Child Care Agent  agency are ready to tackle issues regarding those who are most precious to us ;the future of our society . We are here to ensure that the Child Protective agents are to their best potential while handling cases. This is to as much benefit to you the agent and the community at large. We are hoping to implement this by proper procedural task assignment , location updates during field work and overall report generation at the end of a task completion.Agents , you play a crucial role in the development and empowerment of the children. You are the voice for those who don't have one or can't express themselves. This is also to your benefit in performance and work progress . To be better aquinted visit our site <a href="" class="text-blue-500">here.</a> . </p>
      <div className="bg-[#282323] flex py-10 justify-around text-center text-white">
            <div>
                <img src="/images/caring.png"   alt="caringhand" srcset="" />
                <p>CARING GUIDE</p>
            </div>
            <div>
                <img src="/images/helping.png"  alt="helpinghand" srcset="" />
                <p>HELPING HAND</p>
            </div>
            <div>
                <img src="/images/ally.png"  alt="ally" srcset="" />
                <p>AN ALLY</p>
            </div>
        </div>

    </div>
  )
}

export default homepage