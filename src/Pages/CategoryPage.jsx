import React from 'react'
import { useNavigate } from 'react-router'

function CategoryPage() {
  const navigate = useNavigate()
  return (
    <div>CategoryPage



<button  className='bg-black text-white border rounded' onClick={() => navigate('/')}>back to home</button>
    </div>
  )
}

export default CategoryPage