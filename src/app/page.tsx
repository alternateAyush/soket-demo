'use client'
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";


const Home = () => {
  const router = useRouter();
  useEffect(()=>{
    router.replace('/home');
  })
  return (
    <div className='text-white'>Home</div>
  )
}

export default Home