import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

function Hompage() {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/category')
  }


  setTimeout(() => {
    navigate('/category')
  },1000)
  return (
    <>
    <div>Hompage</div>
      <Link to={'/product'}>Go to Product</Link>
      <NavLink>lkdnaskda.sn</NavLink>
      <div>

      <button  className='bg-black text-white border rounded' onClick={handleClick}>Go to Category</button>
      </div>
    
    </>
  )
}

export default Hompage