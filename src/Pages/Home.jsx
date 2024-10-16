import React from 'react'
import { Link } from "react-router-dom";

function Home() {
    



  return (
    <>   
     <div className='flex justify-between px-10 items-center bg-gray-200 pt-3 '>
      <h1 className='font-bold text-2xl mb-5 text-blue-800'>The Homepage</h1>
      <div>
      <Link to={"register"} className='bg-blue-500 text-white rounded-xl px-5 py-2 mb-5 mr-5 font-bold'>Register</Link>

      <Link to={"Login"} className='bg-blue-500 text-white rounded-xl px-5 py-2 mb-5 font-bold'>Login</Link>
      </div>
      

      
      </div> 
      <div className='place-content-center'>
      <h1 className='text-4xl font-bold text-center my-10  text-blue-800'>Welcome to the Student Page </h1>
  
      </div>

    </>
  )
}

export default Home