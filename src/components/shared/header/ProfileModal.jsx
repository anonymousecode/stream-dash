import Image from 'next/image'
import React, { Fragment } from 'react'
import { FiActivity, FiBell, FiChevronRight, FiClipboard, FiDollarSign, FiFolder, FiLogOut, FiSettings, FiUser, FiZap } from "react-icons/fi"

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const ProfileModal = ({ userDetails }) => {
    return (
        userDetails && (
            <div className="dropdown nxl-h-item">
                <a href="#" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside">
                    {userDetails?.user_image ? (
                        <Image width={40} height={40} src={`${apiBaseUrl}${userDetails?.user_image}`} alt="user-image" className="img-fluid user-avtar me-0" />
                    ) : (
                        <div className="skeleton-loader" style={{ width: 40, height: 40, backgroundColor: '#ccc', borderRadius: '50%' }} />)}
                </a>
                <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown">
                    <div className="dropdown-header">
                        <div className="d-flex align-items-center">
                            {console.log("Final image URL:", `${apiBaseUrl}${userDetails?.user_image}`)}
                            {userDetails?.user_image ? (
                                <Image width={40} height={40} src={`${apiBaseUrl}${userDetails?.user_image}`} alt="user-image" className="img-fluid user-avtar" />
                            ) : (
                                <div className="skeleton-loader" style={{ width: 40, height: 40, backgroundColor: '#ccc', borderRadius: '50%' }} />)}
                            <div>
                                {/* <h6 className="text-dark mb-0">{userDetails.fname}<span className="badge bg-soft-success text-success ms-1">PRO</span></h6> */}
                                <span className="fs-12 fw-medium text-muted">{userDetails.email}</span>
                            </div>
                        </div>
                    </div>
            
                    <a href="#" className="dropdown-item">
                        <i ><FiUser /></i>
                        <span>My Profile</span>
                    </a>
                    <a href="#" className="dropdown-item">
                        <i ><FiClipboard /></i>
                        <span>Projects</span>
                    </a>
                    <a href="#" className="dropdown-item">
                        <i ><FiZap /></i>
                        <span>Actions</span>
                    </a>
                    <a href="#" className="dropdown-item">
                        <i><FiBell /></i>
                        <span>Notifications</span>
                    </a>
                    <a href="#" className="dropdown-item">
                        <i><FiSettings /></i>
                        <span>Account Settings</span>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a href="/" className="dropdown-item">
                        <i> <FiLogOut /></i>
                        <span>Logout</span>
                    </a>
                </div>
            </div>
        ))
}

export default ProfileModal
