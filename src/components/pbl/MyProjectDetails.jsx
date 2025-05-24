"use client";
import { useEffect, useState } from "react";
import { get_data } from "@/api/methods";
import React from "react";
import Link from "next/link";
import IdeaDevelopment from "./IdeaDevelopment";
import FirstReview from "./FirstReview";
import PlanningPhase from "./Planning";
import SecondReview from "./SecondReview";
import Execution from "./Execution";
import ThirdReview from "./ThirdReview";
import FinalPresentation from "./FinalPresentation";
import Roadmap from "./RoadMap";

// const MyProjectDetails = ({ project, onBack }) => {
const MyProjectDetails = ({ projectId }) => {

  const [project, setProjects] = useState({});

  useEffect(() => {

    get_data("Project", ["name", "title", "description", "attach_image", "starting_date", "completed_date", "brc_name", "district_name", "project_category_name", "current_phase"], [["name", "=", projectId]]).then((data) => {
      setProjects(data[0]);
      console.log(data[0])
      console.log(data[1])

    });

  }, []);

  if (!project) {
    return <div className="container mt-5">No project selected.</div>;
  }


  const phaseRoutes = [
    "idea-development",
    "first-review",
    "planning",
    "second-review",
    "execution",
    "third-review",
    "presentation",
  ];


  const phaseComponentsMap = {
    "Idea Development": IdeaDevelopment,
    "First Review": FirstReview,
    "Planning": PlanningPhase,
    "Second Review": SecondReview,
    "Execution": Execution,
    "Third Review": ThirdReview,
    "Final Presentation": FinalPresentation,

    // map all your phase labels to components
  };

  const PhaseComponent = phaseComponentsMap[project.current_phase] || (() => <div>Select a phase</div>);

  return (
    <div className="container mt-5">
      {/* <button className="btn btn-secondary mb-3" onClick={onBack}>
        ← Back to Projects
      </button> */}

      <div className="card p-4" style={{ backgroundColor: "#fff", border: "1px solid #ccc" }}>
        <h2 className="fw-bold mb-4" style={{ color: "#333" }}>
          {project.title}
        </h2>

        {/* Space for the project image */}
        <div className="mb-4">
          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="img-fluid rounded"
              style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }}
            />
          )}
        </div>

        <div className="mb-3">
          <p style={{ color: "#333" }}><strong>Project Goal:</strong> {project.goal}</p>
          <p style={{ color: "#333" }}><strong>Task:</strong> {project.task}</p>
          <p style={{ color: "#333" }}><strong>School:</strong> {project.school}</p>
          <p style={{ color: "#333" }}><strong>BRC:</strong> {project.brc_name}</p>
          <p style={{ color: "#333" }}><strong>District:</strong> {project.district_name}</p>
          <p style={{ color: "#333" }}><strong>Category:</strong> {project.project_category_name}</p>
        </div>

        <div className="my-5">
          <h5 className="fw-bold" style={{ color: "#333" }}>Description</h5>
          <div
            className="ql-editor read-mode"
            dangerouslySetInnerHTML={{ __html: project.description }}
            style={{ color: "#333" }}
          />
        </div>

        <hr className="my-4" style={{ borderColor: "#F4B400" }} />

        {/* <h4 style={{ color: "#333" }} className="mb-4">Phases</h4> */}
        <div className="row g-3">
          {/* {phaseRoutes.map((route, i) => (
            <div key={route} className="col-md-3">
              <Link
                href={`/pbl/${route}`}
                className="btn"
                style={{
                  backgroundColor: "#F4B400",
                  color: "#fff",
                  border: "none",
                  fontWeight: "bold",
                  padding: "15px 30px",
                  fontSize: "16px",
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#d79e00";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#F4B400";
                }}
              >
                Phase {i + 1}
              <Link href={`/pbl/${route}/${project.name}`} >
                Phase {i + 1}
              </Link>

            </div>
          ))} */}
          <Roadmap currentPhase={project.current_phase} />
          <PhaseComponent projectId={project.name} />
        </div>
      </div>
    </div>
  );
};

export default MyProjectDetails;
