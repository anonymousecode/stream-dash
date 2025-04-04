"use client";

import React, { useState } from "react";

const Page = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError(e.target.value !== password ? "Passwords do not match" : "");
  };

  const keralaDistricts = [
    "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha",
    "Kottayam", "Idukki", "Ernakulam", "Thrissur",
    "Palakkad", "Malappuram", "Kozhikode", "Wayanad",
    "Kannur", "Kasaragod"
  ];

  return (
    <main className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3 ">
      <div className="w-100" style={{ maxWidth: "900px" }}>
        <div className="text-center mb-4">
          <img
            src="/images/stream_logo.svg"
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "200px" }}
          />
        </div>

        <div className="card p-2 shadow">
        <h3 className="m-3 text-center">Register</h3>
          {/* Personal Details */}
          <fieldset className="mb-4 border p-3 rounded">
            <legend className="w-auto px-2">Personal Details</legend>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Full Name<span className="text-danger">*</span></label>
                <input type="text" className="form-control" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Date of Birth<span className="text-danger">*</span></label>
                <input type="date" className="form-control" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Gender<span className="text-danger">*</span></label>
                <select className="form-control" required>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone<span className="text-danger">*</span></label>
                <input type="tel" className="form-control" required />
              </div>
              <div className="col-12">
                <label className="form-label">Address<span className="text-danger">*</span></label>
                <textarea className="form-control" required></textarea>
              </div>
              <div className="col-12">
                <label className="form-label">Email<span className="text-danger">*</span></label>
                <input type="email" className="form-control" required />
              </div>
            </div>
          </fieldset>

          {/* Educational Details */}
          <fieldset className="mb-4 border p-3 rounded">
            <legend className="w-auto px-2">Work Details</legend>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Designation<span className="text-danger">*</span></label>
                <select className="form-control" required>
                  <option value="">Select Designation</option>
                  <option>SPD</option>
                  <option>SPO</option>
                  <option>DPC</option>
                  <option>DPO</option>
                  <option>BPC</option>
                  <option>STC</option>
                  <option>HOI</option>
                  <option>Project Coordinator</option>
                  <option>Mentor</option>
                  <option>Teacher</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">State</label>
                <input
                  type="text"
                  className="form-control"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">District</label>
                {state.trim().toLowerCase() === "kerala" ? (
                  <select className="form-control">
                    <option value="">Select District</option>
                    {keralaDistricts.map((district, index) => (
                      <option key={index} value={district}>{district}</option>
                    ))}
                  </select>
                ) : (
                  <input type="text" className="form-control" />
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">BRC</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </fieldset>

          {/* Login Details */}
          <fieldset className="mb-4 border p-3 rounded">
            <legend className="w-auto px-2">Login Details</legend>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Password<span className="text-danger">*</span></label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={handlePasswordChange} 
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Confirm Password<span className="text-danger">*</span></label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange} 
                  required
                />
                {error && <p className="text-danger mt-1">{error}</p>}
              </div>
            </div>
          </fieldset>

          <div className="m-3">
            <button className="btn btn-primary w-50 d-block mx-auto" disabled={error !== ""}>Create Account</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
