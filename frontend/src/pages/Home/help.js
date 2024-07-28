import React from 'react'

const help = () => {
  return (
    <div className='max-w-5xl mx-auto mt-14'>
      <div className="font-bold justify-around flex flex-col md:flex-row gap-4 bg-gray-400 mb-3 ">
        <a href="/"><button>HOME</button></a>
        <a href="/contactus"><button> CONTACT US</button></a>
        <a href="/help"><button>HELP/SUPPORT</button></a>
        <a href="/login" className='border-2 border-black px-4 py-2 rounded-lg'><button>LOG IN</button></a>
        <a href="/register" className='border-2 border-black px-4 py-2 rounded-lg'><button>REGISTER</button></a>
      </div>
      <div>
        <img src="/images/help.png"  alt="help" srcset="" />
        <p class="text-center text-6xl font-extrabold py-8">How can we help you ?</p>
        <input type="text" class=" my-5 w-full bg-slate-700 py-3 pl-2 rounded-lg" placeholder="Enter keyword , topic or question"></input>
      </div>
      <div class="bg-[#D9D9D9] flex flex-row items-center justify-around py-16">
          <div>
              <img src="/images/eye.png"  alt="eye" srcset="" />
              <p>Getting Started</p>
          </div>
          <div>
              <img src="/images/topissues.png"  alt="topissues" srcset="" />
              <p>Top issues</p>
          </div>
          <div>
              <img src="/images/question.png"  alt="question" srcset="" />
              <p>Questions</p>
          </div>
          <div>
              <img src="/images/check.png"  alt="check" srcset="" />
              <p>TroubleShooting</p>
          </div>
      </div>
    </div>

  )
}

export default help