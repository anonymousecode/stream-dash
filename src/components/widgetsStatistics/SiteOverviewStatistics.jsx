"use client"

import React, { useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { crmStatisticsData } from '@/utils/fackData/crmStatisticsData'
import getIcon from '@/utils/getIcon'
import Link from 'next/link'

const SiteOverviewStatistics = ({ generalDetails }) => {


    const titles = {
        'students': 'Students',
        'school': 'Schools',
        'projects_ongoing': 'Ongoing Projects',
        'projects_completed': 'Completed Projects',

    }
    const icons = {
        students: "feather-users",
        school: "fa-building",
        projects_ongoing: "feather-map-pin",
        projects_completed: "feather-clipboard"

    }



    const [modalContent, setModalContent] = useState(null)

    const handleCardClick = (rawTitle) => {
        const title = rawTitle?.trim().toLowerCase()

        if (title.includes('student')) {
            setModalContent({
                title: 'Student Info',
                message: 'Total number of enrolled students: 5.5L+',
            })
        } else if (title.includes('school')) {
            setModalContent({
                title: 'School Info',
                message: 'Total number of schools: 54',
            })
        } else if (title.includes('district')) {
            setModalContent({
                title: 'District Info',
                message: 'Districts: Alappuzha, Ernakulam, Kannur, Palakkad',
            })
        } else if (title.includes('project')) {
            setModalContent({
                title: 'Project Info',
                message: 'Total number of projects: 100+',
            })
        } else {
            setModalContent(null)
        }
    }

    const handleClose = () => setModalContent(null)

    return (
        <>
            {
                // crmStatisticsData.map(({ students, school, projects_ongoing, }) => {
                //     const normalizedTitle = title?.trim().toLowerCase()
                //     const isClickable = ['student', 'school', 'district', 'project'].some(keyword =>
                //         normalizedTitle.includes(keyword)
                //     )

               generalDetails && generalDetails.map((items, id) => (
                    // const normalizedTitle = titles[items.title]?.trim().toLowerCase()
                    // const isClickable = ['student', 'school', 'district', 'project'].some(keyword =>
                    //     normalizedTitle.includes(keyword)
                    // )

                    // return (
                    <div key={id} className="col-xxl-3 col-md-6">
                        <div
                            className="card stretch stretch-full short-info-card"
                        // style={{ cursor: isClickable ? 'pointer' : 'default' }}
                        // onClick={() => isClickable && handleCardClick(titles.items.title)}
                        >
                            <div className="card-body">
                                <div className="d-flex align-items-start justify-content-between mb-4">
                                    <div className="d-flex gap-4 align-items-center">
                                        <div className="avatar-text avatar-lg bg-gray-200 icon">
                                            {React.cloneElement(getIcon(icons[items.title]), { size: "16" })}
                                        </div>
                                        <div>
                                            <div className="fs-4 fw-bold text-dark">
                                                {/* <span className="counter">{completed_number ? completed_number + "/" : ""}</span> */}
                                                <span className="counter">{items.value}</span>
                                            </div>
                                            <h3 className="fs-13 fw-semibold text-truncate-1-line">{titles[items.title]}</h3>
                                        </div>
                                    </div>
                                    <Link href="#" className="lh-1">
                                        <FiMoreVertical className='fs-16' />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                )
                // )
            }

            {modalContent && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalContent.title}</h5>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <p>{modalContent.message}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SiteOverviewStatistics
