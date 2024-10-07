import axios from 'axios';
import {React, useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import toast  from "react-hot-toast";
import {  useEffect} from "react";
import  {FaPlus, FaTrash} from "react-icons/fa";





function students() {
  const[data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
 

 
 

  

  const getData = async () => {
    setLoading(true);
    const res = await axios.get("http://localhost:8000/api/students");
    
    


    if (res.data.status === "success") {
      setData(res.data.data)
      
      
    }else{
      console.error("Error fetching data: ", error.message);
      toast.error("could not fetch data")
    }
    setLoading(false);

  }

  useEffect(() =>{
    getData();
  }, []);




  const handleEdit =  async(id) =>{
    const res = await axios.get(`http://localhost:8000/api/students/${id}`);
  
    console.log(res.data.data)
    
  }
  


  const handleDelete = async (id) =>{

    const res = await axios.delete(`http://localhost:8000/api/students/${id}`)
    console.log(id)
    if (res.data.status === "success") {
      alert("deleted")
     
      setData(data.filter(student => student.id !== id));

  }
}


  return (
    <>
    <div className="container ">
      <div className='flex justify-between mt-5 px-10 items-center'>
      <h1 className='font-bold text-2xl mb-5'>Form Details</h1>
      <Link to={"add-student"} className='bg-blue-500 text-white rounded-xl px-5 py-2 mb-5'>Add Student</Link>
  
      </div>

      {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='py-4 px-3 border border-gray-300 rounded mb-4'> 

            {data && data.length > 0 ? (
              data.map((i) => (
                <ul key={i?.id} className='mt-5 mb-10 border-2 flex font-bold text-2xl px-5 py-5 items-end justify-between '>
                  <div>
                  <li className='mt-2'>{i?.name} </li>
                  <li className='mt-2'>{i?.course}</li>
                  <li className='mt-2'>{i?.email}</li>
                  <li className='mt-2'>{i.Phone}</li>
                  </div>

                  <div className='flex gap-5'>

                    
                  <div onClick={()=>handleEdit(i.id)}>
                  <Link to={`/edit-student/${i.id}`}>
                    <FaPlus className='text-lg rounded-full border-2 '/>
                    </Link>
                   
                  </div>
                  <div onClick={() => handleDelete(i.id)}>
                    <FaTrash className='text-lg rounded-full border-2 '/>
                   
                    </div>
                  </div>
                  

                </ul>
              ))
            ) : (
              <p>No student data available</p>
            )}
          </div>
        )}



   </div>
   
    </>
  )
}

export default students