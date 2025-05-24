"use client";

import React, { useState, useEffect } from "react";
import MyProjectDetails from "./MyProjectDetails";
import { get_data } from '@/api/methods';
import Link from "next/link";
const dummyProjects = [
  {
    name: "project-1",
    title: "Solar Energy System",
    description: "Harnessing solar power for homes.",
    attach_image: "/images/projects/solar.jpg",
    start_date: "2023-01-01",
    end_date: "2024-12-31",
    goal: "Promote renewable energy",
    task: "Install and monitor solar panels",
    school: "Green Valley High",
    brc: "BRC-1",
    district: "District A",
    category: "Energy",
  },
  {
    name: "project-2",
    title: "Smart Irrigation",
    description: "Optimizing water use with sensors.",
    attach_image: "/images/projects/irrigation.jpg",
    start_date: "2025-01-01",
    end_date: "2026-01-01",
    goal: "Efficient irrigation system",
    task: "Deploy IoT-based sensors",
    school: "Riverdale School",
    brc: "BRC-2",
    district: "District B",
    category: "Agriculture",
  },
  {
    name: "project-3",
    title: "AI Healthcare Diagnostic",
    description: "Developing AI models for diagnosing diseases.",
    attach_image: "/images/projects/ai_healthcare.jpg",
    start_date: "2024-03-01",
    end_date: "2025-03-01",
    goal: "Improve healthcare diagnostics using AI",
    task: "Train AI models for disease prediction",
    school: "Tech Innovators High",
    brc: "BRC-3",
    district: "District C",
    category: "Healthcare",
  },
  {
    name: "project-4",
    title: "Smart City Traffic Management",
    description: "Using IoT to optimize traffic flow.",
    attach_image: "/images/projects/smart_traffic.jpg",
    start_date: "2024-06-01",
    end_date: "2025-06-01",
    goal: "Reduce traffic congestion",
    task: "Install smart sensors and AI-based management systems",
    school: "City High School",
    brc: "BRC-4",
    district: "District D",
    category: "Technology",
  },
  {
    name: "project-5",
    title: "Recycling for the Future",
    description: "Promoting sustainable recycling practices.",
    attach_image: "/images/projects/recycling.jpg",
    start_date: "2023-09-01",
    end_date: "2024-09-01",
    goal: "Reduce waste and promote recycling",
    task: "Implement a community-wide recycling program",
    school: "Eco School",
    brc: "BRC-5",
    district: "District E",
    category: "Environment",
  },
  {
    name: "project-6",
    title: "Virtual Reality Education",
    description: "Using VR technology to enhance education.",
    attach_image: "/images/projects/vr_education.jpg",
    start_date: "2025-02-01",
    end_date: "2026-02-01",
    goal: "Revolutionize education using VR",
    task: "Develop VR-based educational modules",
    school: "Future Learning Academy",
    brc: "BRC-6",
    district: "District F",
    category: "Education",
  },
  {
    name: "project-7",
    title: "Water Purification System",
    description: "Developing a sustainable water filtration system.",
    attach_image: "/images/projects/water_purification.jpg",
    start_date: "2023-07-01",
    end_date: "2024-07-01",
    goal: "Ensure clean water access",
    task: "Design and implement a low-cost water filter",
    school: "Green Earth High",
    brc: "BRC-7",
    district: "District G",
    category: "Environment",
  },
  {
    name: "project-8",
    title: "Electric Vehicle Charging Stations",
    description: "Building infrastructure for electric vehicles.",
    attach_image: "/images/projects/ev_charging.jpg",
    start_date: "2024-05-01",
    end_date: "2025-05-01",
    goal: "Promote electric vehicle adoption",
    task: "Install EV charging stations",
    school: "Sustainable Transport School",
    brc: "BRC-8",
    district: "District H",
    category: "Sustainability",
  },
  {
    name: "project-9",
    title: "Blockchain for Supply Chain",
    description: "Using blockchain technology to improve supply chains.",
    attach_image: "/images/projects/blockchain_supply_chain.jpg",
    start_date: "2024-09-01",
    end_date: "2025-09-01",
    goal: "Increase transparency in supply chains",
    task: "Implement blockchain for tracking goods",
    school: "Tech Innovators Academy",
    brc: "BRC-9",
    district: "District I",
    category: "Technology",
  },
  {
    name: "project-10",
    title: "Green Urban Farming",
    description: "Sustainable urban farming using greenhouses.",
    attach_image: "/images/projects/urban_farming.jpg",
    start_date: "2025-04-01",
    end_date: "2026-04-01",
    goal: "Increase local food production",
    task: "Establish urban farms with greenhouses",
    school: "City Garden High",
    brc: "BRC-10",
    district: "District J",
    category: "Agriculture",
  },
  {
    name: "project-11",
    title: "AI-Powered Language Translator",
    description: "Creating an AI language translator app.",
    attach_image: "/images/projects/ai_translator.jpg",
    start_date: "2023-10-01",
    end_date: "2024-10-01",
    goal: "Break down language barriers",
    task: "Develop AI-powered translation software",
    school: "Global Communication Academy",
    brc: "BRC-11",
    district: "District K",
    category: "Technology",
  },
  {
    name: "project-12",
    title: "Sustainable Fashion Initiative",
    description: "Creating eco-friendly clothing.",
    attach_image: "/images/projects/sustainable_fashion.jpg",
    start_date: "2025-06-01",
    end_date: "2026-06-01",
    goal: "Promote sustainable fashion",
    task: "Design and produce eco-friendly clothing lines",
    school: "Fashion Forward High",
    brc: "BRC-12",
    district: "District L",
    category: "Fashion",
  },
];

const MyProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("ongoing"); // Default filter to "ongoing"
  const [projects, setProjects] = useState([]); // State to hold the projects data

  // Paginate the projects (6 per page)
  const projectsPerPage = 6;
  const filteredProjects = projects.filter((project) => {
    // const isOngoing = new Date(project.starting_date) <= new Date() && new Date(project.completed_date) >= new Date();
    const isOngoing = new Date(project.starting_date) <= new Date() && project.completed_date == null;
    if (filter === "ongoing") return isOngoing;
    return !isOngoing; // If not ongoing, it's considered completed
  });
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);


  useEffect(() => {
    get_data("Project", ["name", "title", "description", "attach_image", "starting_date", "completed_date", "brc_name", "district_name", "project_category_name", "current_phase"], "").then((data) => {
      setProjects(data);
      console.log(data[0])
      console.log(data[1])

    });

  }, []);

  return (
    <div className="container mt-5">
      {!selectedProject ? (
        <>
          <h2>My Projects</h2>
          <div className="d-flex justify-content-center mb-3">
            <button
              onClick={() => setFilter("ongoing")}
              className={`btn ${filter === "ongoing" ? "btn-active" : "btn-light"}`}
              style={{
                backgroundColor: filter === "ongoing" ? "#F4B400" : "white", // Active: #F4B400, Inactive: white
                color: filter === "ongoing" ? "white" : "#F4B400", // White text for active, yellow for inactive
                border: filter === "ongoing" ? "1px solid #F4B400" : "1px solid #ddd", // Border color for active and inactive
                margin: "0 10px",
              }}
            >
              Ongoing
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`btn ${filter === "completed" ? "btn-active" : "btn-light"}`}
              style={{
                backgroundColor: filter === "completed" ? "#F4B400" : "white", // Active: #F4B400, Inactive: white
                color: filter === "completed" ? "white" : "#F4B400", // White text for active, yellow for inactive
                border: filter === "completed" ? "1px solid #F4B400" : "1px solid #ddd", // Border color for active and inactive
                margin: "0 10px",
              }}
            >
              Completed
            </button>
          </div>
          <div className="row">
            {currentProjects.map((project) => (
              <div key={project.name} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={project.attach_image}
                    className="card-img-top"
                    alt={project.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{project.title}</h5>
                    <p className="card-text">{project.description}</p>
                    <Link href={`/pbl/project-details/${project.name}`} >
                      <button
                        className="btn btn-primary"
                      // onClick={() => setSelectedProject(project)}
                      >
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination with custom buttons */}
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-outline-dark mx-1"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`btn mx-1 ${currentPage === index + 1 ? "btn-warning" : "btn-light"}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="btn btn-outline-dark mx-1"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </>
      ) : (
        <MyProjectDetails project={selectedProject} onBack={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default MyProjects;
