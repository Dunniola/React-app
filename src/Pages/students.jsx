import axios from "axios";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

function students() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    setLoading(true);
    const res = await axios.get("http://localhost:8000/api/students");

    if (res.data.status === "success") {
      setData(res.data.data);
    } else {
      console.error("Error fetching data: ", error.message);
      toast.error("could not fetch data");
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = async (id) => {
    const res = await axios.get(`http://localhost:8000/api/students/${id}`);

    console.log(res.data.data);
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:8000/api/students/${id}`);
    console.log(id);
    if (res.data.status === "success") {
      alert("deleted");

      setData(data.filter((student) => student.id !== id));
    }
  };
  const handleLogout = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log("Token before logout:", token); //

      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");

      // Redirect to login page
      navigate("/Login");
    } catch (error) {
      console.error("Logout error");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <div className="container ">
        <div className="mx-10 my-5 grid place-content-end">
          <button
            className=" bg-blue-600 px-5 py-1 rounded-md text-white font-bold "
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="py-4 px-3 border border-gray-300 rounded mb-4">
            {data && data.length > 0 ? (
              data.map((i) => (
                <ul
                  key={i?.id}
                  className="mt-5 mb-10 border-2 flex font-bold text-2xl px-5 py-5 items-end justify-between "
                >
                  <div>
                    <li className="mt-2">{i?.name} </li>
                    <li className="mt-2">{i?.course}</li>
                    <li className="mt-2">{i?.email}</li>
                    <li className="mt-2">{i.Phone}</li>
                  </div>

                  <div className="flex gap-5">
                    <div onClick={() => handleEdit(i.id)}>
                      <Link to={`/edit-student/${i.id}`}>
                        <FaPlus className="text-lg rounded-full border-2 " />
                      </Link>
                    </div>
                    <div onClick={() => handleDelete(i.id)}>
                      <FaTrash className="text-lg rounded-full border-2 cursor-pointer" />
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
  );
}

export default students;
