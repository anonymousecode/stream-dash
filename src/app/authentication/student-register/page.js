"use client";

import React, { useState } from "react";

const Page = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (formSubmitted) validatePasswords(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (formSubmitted) validatePasswords(password, e.target.value);
  };

  const validatePasswords = (pass, confirmPass) => {
    if (!pass || !confirmPass) {
      setError("Both password fields are required.");
    } else if (pass !== confirmPass) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    validatePasswords(password, confirmPassword);

    if (!error && password && confirmPassword && password === confirmPassword) {
      // Perform submit logic here
      alert("Form submitted successfully!");
    }
  };

  const keralaDistricts = [
    "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha",
    "Kottayam", "Idukki", "Ernakulam", "Thrissur",
    "Palakkad", "Malappuram", "Kozhikode", "Wayanad",
    "Kannur", "Kasaragod"
  ];

  return (
    <main className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <div className="w-100" style={{ maxWidth: "900px" }}>
        <div className="text-center mb-4">
          <img
            src="/images/stream_logo.svg"
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "200px" }}
          />
        </div>

        <form className="card p-2 shadow" onSubmit={handleSubmit}>
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
                <label className="form-label">Phone</label>
                <input type="tel" className="form-control" />
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
            <legend className="w-auto px-2">Educational Details</legend>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Class</label>
                <select className="form-control">
                  <option value="">Select Class</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">School</label>
                <input type="text" className="form-control" />
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
                <label className="form-label">
                  Password<span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Confirm Password<span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {error && <p className="text-danger mt-1">{error}</p>}
              </div>
            </div>
          </fieldset>

          <div className="m-3">
            <button className="btn btn-primary w-50 d-block mx-auto" disabled={error !== ""}>Create Account</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Page;
