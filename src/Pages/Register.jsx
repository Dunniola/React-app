import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const register = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:8000/api/register", register)
      .then((res) => {
        console.log("Login successfully", res.data);
        navigate("/Login");

        // console.log("output", payload)
      })
      .catch((err) => {
        console.log(
          "Error in registration",
          err.response ? err.response.data : err.message
        );
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="my-2 mt-5 grid place-content-center min-h-screen">
          <div>
            <label htmlFor="" className="font-bold">
              Name:
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className="border-2 w-full py-1 px-1 rounded-xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="my-2 mt-5">
            <label htmlFor="" className="font-bold">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="border-2 w-full py-1 px-1 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-2">
            <label htmlFor="" className="font-bold">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="border-2 w-full py-1 px-1 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <span
            className="relative bottom-10 left-[15rem] cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "🙈"}
          </span>

          <button
            type="submit"
            className="bg-blue-600 px-5 py-1 w-full text-white font-bold mt-2 rounded-xl"
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
}

export default Register;
