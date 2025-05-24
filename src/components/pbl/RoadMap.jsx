import React from "react";

const phases = [
    { id: 1, label: "Problem Identification", color: "primary" },
    { id: 2, label: "Idea Development", color: "primary" },
    { id: 3, label: "First Review", color: "primary" },
    { id: 4, label: "Planning", color: "warning" },
    { id: 5, label: "Second Review", color: "primary" },
    { id: 6, label: "Execution", color: "primary" },
    { id: 7, label: "Third Review", color: "primary" },
    { id: 8, label: "Final Presentation", color: "warning" },
];

export default function Roadmap({ currentPhase }) {

    const currentPhaseId =
        phases.find((phase) => phase.label === currentPhase)?.id || 0;



    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Project Roadmap</h2>
            <div className="d-flex justify-content-center align-items-center">
                {phases.map((phase, index) => {
                    const isPast = phase.id < currentPhaseId;
                    const isCurrent = phase.id === currentPhaseId;
                    const isFuture = phase.id > currentPhaseId;
                    const backgroundColor = isPast
                        ? "#6c757d" // gray
                        : isCurrent
                            ? "red" // red
                            : "var(--bs-primary)";
                    return (
                        <React.Fragment key={phase.id}>
                            <div className="text-center">
                                <div
                                    className={`rounded-circle d-flex align-items-center justify-content-center mb-2 mx-2`}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        backgroundColor: backgroundColor,
                                        color: "white"
                                    }}
                                >
                                    {phase.id}
                                </div>
                                <div
                                    className={`fw-medium ${isPast
                                        ? "text-secondary"
                                        : isCurrent
                                            ? "text-danger"
                                            : "text-primary"
                                        }`}
                                >
                                    {phase.label}
                                </div>
                            </div>

                            {index < phases.length - 1 && (
                                <div
                                    style={{
                                        width: "40px",
                                        height: "4px",
                                        backgroundColor: "#ced4da",
                                        margin: "0 10px",
                                    }}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}
