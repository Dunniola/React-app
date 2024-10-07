import {React, useState, useEffect }from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';





function updates() {
    const { id } = useParams();
    const [name, setName] = useState("")
  const [phone, setPhone ] = useState ("")
  const [email, setEmail] = useState("")
  const [course, setCourse ] = useState ("")
    const navigate = useNavigate()

  useEffect(() => {
    const fetchStudentData = async () => {
      
        const res = await axios.get(`http://localhost:8000/api/students/${id}`);
        if (res.data.status === 'success') {
          const student = res.data.data;
          setName(student.name);
          setPhone(student.Phone);
          setEmail(student.email);
          setCourse(student.course);
          console.log(res.data.data)
        }else{
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [id]); 


  


  const handleUpdated = async (e) =>{
    e.preventDefault();
    const updatedStudent = {
        name,
        phone,
        email,
        course,
      };
  
    
        const res = await axios.put(`http://localhost:8000/api/students/${id}`, updatedStudent);
        if (res.data.status === 'success') {
          // Optionally redirect or notify user
          navigate("/")
          console.log(res.data.data)
          
        }else{
    
        console.error("Error updating student:", error);
      }

    
}


  return (
    <>
    <div className='mt-40 grid place-content-center min-h-100 mx-20 '>
    <form onSubmit={handleUpdated}>
      
      <label className="font-bold " htmlFor="name">Student Name</label>
      <div>
      <input type="text" placeholder= 'Name' value={name}name='name' onChange={(e) =>setName(e.target.value)}className='border-2 mt-2  px-3 py-2'   />
      </div>

      
      <label className="font-bold" htmlFor="course" >Student Course</label>
      <div className=''>
      <input type="text" placeholder='Course'name='course'  value={course} onChange={(e) =>setCourse(e.target.value)} className='border-2 px-3 py-2' />
      </div>
      
      
      <label  className="font-bold" htmlFor="email">Student Email</label>
      <div>
      <input type="email" placeholder='email'name='email' value={email}  onChange={(e) =>setEmail(e.target.value)} className='border-2 px-3 py-2' />
      </div>

      
      <label className="font-bold"  htmlFor="phone">Student Phone</label>
      <div>
      <input type="number" placeholder= "Phone"name='phone' value={phone} onChange={(e) =>setPhone(e.target.value)} className='border-2 px-3 py-2' />
      </div>

      <div>
      <button className='bg-blue-400 rounded-xl px-4 py-2  font-bold mt-5'> Update Profile </button>
      </div>

    </form>
    </div>
    </>
  )
}

export default updates