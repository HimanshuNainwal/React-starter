import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
   <header className='sticky	 top-0 w-full  bg-white p-2'>
    <div className='flex items-center justify-between'>
        

        <div className='flex items-center gap-4' >
        <img src='https://wforwoman.com/images/logo.png' className='w-24 mr-2'   /> 
          <NavLink to="/category/new-arrivals.html" className={`text-base font-bold mx-1  hover:text-rose-800 `}   >New Arrival </NavLink>
          <NavLink to="/category/anushka-picks.html" className={"text-base font-bold mx-1  hover:text-rose-800"}   > Anushka </NavLink>
          <NavLink to="/category/top-wear.html" className={"text-base font-bold mx-1  hover:text-rose-800"}   > Top Wear</NavLink>
        </div>

      <div>
        <img src='https://wforwoman.com/images/adibirla.jpg' className='w-12 mr-2'   /> 
        
      </div>


    </div>
   </header>
  )
}

export default Header