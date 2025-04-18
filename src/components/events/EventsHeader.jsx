'use client'
import React from 'react'

const EventsHeader = () => {
    return (
        <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
            <a
                href="/events/create"
                className="btn btn-primary"
                rel="noopener noreferrer"
            >
                <span>Add Event</span>
            </a>
        </div>
    )
}

export default EventsHeader
