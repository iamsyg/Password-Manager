import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className='flex justify-between items-center px-4 mycontainer py-5 h-14'>

        <div className="logo font-bold">Password Manager</div>
            
            <button className='text-white my-5 rounded-md flex justify-center items-center m-10'>
                <img className='invert h-10' src="icons/github-mark.svg" alt="" />
                <span className='font-bold px-2'>GitHub</span>
            </button>
        </div>
        
    </nav>
  )
}

export default Navbar
