import React from 'react'
import { useLocation } from 'react-router'

function Product() {

    const location = useLocation()

    console.log('location',location);


  return (
    <div>Product</div>
  )
}

export default Product