"use client"
import React, { useState } from "react";
import { insertDoc } from "@/api/methods";


const Registration = () => {
  const [warningMessage, setWarningMessage] = useState("");

  const [form, setForm] = useState({
    fname: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    password: "",
  })

  const [studentDetails, setStudentdetails] = useState({
    guardian_name: "",
    guardian_number: "",
    standard: "",
    unique_id: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({ ...prev, [name]: value }))

  }
  const handleStudentdetails = (e) => {
    const { name, value } = e.target

    setStudentdetails((prev) => ({ ...prev, [name]: value }))

  }
  const handleSubmit = async (e) => {
    console.log("Form data:", form);

    e.preventDefault()


    const result = await insertDoc("STREAM User",
      form,


    );
    const updatedForm = {
      ...studentDetails,
      unique_id: result.name,
    };
    // setStudentdetails((prev) => ({ ...prev, unique_id: result.name }))
    console.log("Student details:", updatedForm);

    const reslt = await insertDoc("Student",
      updatedForm,


    );
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const inputs = e.target.querySelectorAll("input, select");
  //   let isValid = true;

  //   inputs.forEach((input) => {
  //     if (input.hasAttribute("required") && !input.value.trim()) {
  //       isValid = false;
  //     }
  //   });

  //   if (!isValid) {
  //     setWarningMessage("Please fill out all required fields correctly.");
  //   } else {
  //     setWarningMessage("");
  //     alert("Registration successful!");
  //     // Add submission logic
  //   }
  // };

  const inputClass = "form-control border-0 shadow-sm rounded-2 bg-white";

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-10 p-5" style={{ backgroundColor: "#f6f7fc" }}>
          <div className="mb-4">
            <img
              src="/images/stream_logo.svg"
              alt="Logo"
              className="mb-4"
              style={{ height: "50px" }}
            />
          </div>

          {/* <h2 className="mb-4">Registration Form</h2> */}

          {warningMessage && (
            <div className="alert alert-warning" role="alert">
              {warningMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <h5>Personal Details</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Full Name*</label>
                <input type="text" className={inputClass} placeholder="Enter full name" name='fname' required onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label>Email*</label>
                <input type="email" className={inputClass} placeholder="Enter email" name='email' required onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label>School</label>
                <input type="text" className={inputClass} placeholder="Enter School Name" />
              </div>
              <div className="col-md-6 mb-3">
                <label>Class*</label>
                <input type="text" className={inputClass} placeholder="Enter Class" name='standard' required onChange={handleStudentdetails} />
              </div>
              <div className="col-md-3 mb-3">
                <label>Date of Birth*</label>
                <input type="date" className={inputClass} placeholder="dd-mm-yyyy" name='dob' required onChange={handleChange} />
              </div>
              <div className="col-md-3 mb-3">
                <label>Gender*</label>
                <select name="gender" className={inputClass} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label>Phone</label>
                <input type="text" className={inputClass} placeholder="Phone number" name='phone' onChange={(e) => {
                  setForm((prev) => ({ ...prev, phone: "+91" + e.target.value }))
                }} />
              </div>
              <div className="col-md-6 mb-3">
                <label>Guardian Name*</label>
                <input type="text" className={inputClass} placeholder="Enter Guardian Name" name='guardian_name' required onChange={handleStudentdetails} />
              </div>
              <div className="col-md-6 mb-3">
                <label>Guardian Phone Number*</label>
                <input type="text" className={inputClass} placeholder="Enter Guardian phone Number" name='guardian_number' required onChange={(e) => {
                  setStudentdetails((prev) => ({ ...prev, phone: "+91" + e.target.value }))
                }} />
              </div>
              <div className="col-md-6 mb-3">
                <label>Address*</label>
                <input type="text" className={inputClass} placeholder="Enter address" name='address' required onChange={handleChange} />
              </div>

            </div>




            <h5 className="mt-4">Educational Details</h5>
            <div className="row">

              <div className="col-md-2 mb-3">
                <label>State</label>
                <select className={inputClass} required>
                  <option value="">Select State</option>
                  <option>state 1</option>
                  <option>State 2</option>
                </select>
              </div>
              <div className="col-md-2 mb-3">
                <label>District</label>
                <select className={inputClass} required>
                  <option value="">Select District</option>
                  <option>DIST 1</option>
                  <option>DIST 2</option>
                  <option>DIST 3</option>
                </select>
              </div>
              <div className="col-md-2 mb-3">
                <label>BRC</label>
                <select className={inputClass} required>
                  <option value="">Select BRC</option>
                  <option>BRC 1</option>
                  <option>BRC 2</option>
                  <option>BRC 3</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label>School</label>
                <select className={inputClass} required>
                  <option value="">Select School</option>
                  <option>school 1</option>
                  <option>school 2</option>
                  <option>school 3</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label>Class</label>
                <select className={inputClass} required>
                  <option value="">Select Class</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
              </div>
            </div>

            <h5 className="mt-4">Login Details</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Password*</label>
                <input type="password" className={inputClass} placeholder="Enter password" required name="password" onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label>Confirm Password*</label>
                <input type="password" className={inputClass} placeholder="Re-type password" required />
              </div>
            </div>

            <button type="submit" className="btn btn-warning px-4 mt-3">
              Register
            </button>
          </form>
        </div>

        <div className="col-2" style={{ backgroundColor: "#f1c40f" }}></div>
      </div>
    </div>
  );
};

export default Registration;
