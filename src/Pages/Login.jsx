import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:8000/api/login", payload)
      .then((res) => {
        alert("success");

        console.log("Login successfully", res.data);
        navigate("/add-student");

        console.log("output", payload);

        const token = res.data.token;
        localStorage.setItem("token", token); // Store the token in local storage
      })

      .catch((err) => {
        alert("service error");
        console.log(err);
        setError("Invalid Email or Password ");
      });
  };

  return (
    <>
      <div className="grid place-content-center min-h-screen border-2 border-gray-300">
        <div className="">
          <h1 className="text-center font-bold text-2xl">Login Form</h1>
        </div>

        <form onSubmit={handleSubmit}>
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

          {error && <div className="text-red-500 font-bold">{error}</div>}

          <button
            type="submit"
            className="bg-blue-600 px-5 py-1 w-full text-white font-bold mt-2 rounded-xl"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
