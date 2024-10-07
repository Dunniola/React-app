import axios from 'axios'
import React, {useState  } from "react";
import { useNavigate } from 'react-router-dom';





function AddStudent() {
  const [name, setName] = useState("")
  const [phone, setPhone ] = useState ("")
  const [email, setEmail] = useState("")
  const [course, setCourse ] = useState ("")
  const navigate = useNavigate()

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
        name: name,
        course: course,
        email: email,
        phone: phone
    };

    
    const res = await axios.post("http://localhost:8000/api/add-student", obj);
    alert("student profile added successfully")
    if (res.data.data) { 
      // Clear the fields after a successful submission
      setName("");
      setCourse("");
      setEmail("");
      setPhone("");

      navigate("/")
      
  }
  
        
    
    
}
  
  
  return (
   <div className='grid place-content-center mt-40'>
    <form onSubmit={handleSubmit}>
      
      <label htmlFor="name" className='font-bold'>Student Name</label>
      <div className='w-'>
      <input type="text" placeholder= 'Name' value={name}name='name' onChange={(e) =>setName(e.target.value)}className='border-2 '  />
      </div>

      
      <label htmlFor="course" className='font-bold'>Student Course</label>
      <div>
      <input type="text" placeholder='Course'name='course'  value={course} onChange={(e) =>setCourse(e.target.value)} className='border-2' />
      </div>
      
      
      <label htmlFor="email" className='font-bold'>student Email</label>
      <div>
      <input type="email" placeholder='email'name='email' value={email}  onChange={(e) =>setEmail(e.target.value)} className='border-2' />
      </div>

      
      <label htmlFor="phone" className='font-bold'>student Phone</label>
      <div>
      <input type="number" placeholder= "Phone"name='phone' value={phone} onChange={(e) =>setPhone(e.target.value)} className='border-2' />
      </div>

      <div>
      <button className='bg-blue-400 rounded-lg px-4 py-2 font-bold mt-5 '> Save Profile </button>
      </div>
    </form>
   </div>
  )
}

export default AddStudent