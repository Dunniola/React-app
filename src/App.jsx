import React from "react";
import Student from "./Pages/students";
import AddStudent from "./Pages/AddStudent";
import Updates from "./Pages/updates"

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element = {<Home/>}/>
        <Route path="student-details" element={<Student />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student/:id" element={<Updates />}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="Register" element={<Register/>}/>

        
        
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
