'use client'
import React from 'react'

const LeadsViewHeader = () => {
    return (
        <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
            <a
                href="https://stream-lms-site.netlify.app/"
                className="btn btn-primary"
                target="_blank" // optional: open in new tab
                rel="noopener noreferrer"
            >
                <span>Go to LMS</span>
            </a>
        </div>
    )
}

export default LeadsViewHeader
