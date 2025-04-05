import Image from 'next/image'
import React, { Fragment } from 'react'
import { FiActivity, FiBell, FiChevronRight, FiDollarSign, FiLogOut, FiSettings, FiUser } from "react-icons/fi"

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const activePosition = ["Active", "Always", "Bussy", "Inactive", "Disabled", "Cutomization"]
const subscriptionsList = ["Plan", "Billings", "Referrals", "Payments", "Statements", "Subscriptions"]
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
                                <h6 className="text-dark mb-0">{userDetails.fname}<span className="badge bg-soft-success text-success ms-1">PRO</span></h6>
                                <span className="fs-12 fw-medium text-muted">{userDetails.email}</span>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <a href="#" className="dropdown-item" data-bs-toggle="dropdown">
                            <span className="hstack">
                                <i className="wd-10 ht-10 border border-2 border-gray-1 bg-success rounded-circle me-2"></i>
                                <span>Active</span>
                            </span>
                            <i className="ms-auto me-0"><FiChevronRight /></i>
                        </a>
                        <div className="dropdown-menu user-active">
                            {
                                activePosition.map((item, index) => {
                                    return (
                                        <Fragment key={index}>
                                            {index === activePosition.length - 1 && <div className="dropdown-divider"></div>}
                                            <a href="#" className="dropdown-item">
                                                <span className="hstack">
                                                    <i className={`wd-10 ht-10 border border-2 border-gray-1 rounded-circle me-2 ${getColor(item)}`}></i>
                                                    <span>{item}</span>
                                                </span>
                                            </a>
                                        </Fragment>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown">
                        <a href="#" className="dropdown-item" data-bs-toggle="dropdown">
                            <span className="hstack">
                                <i className=" me-2"><FiDollarSign /></i>
                                <span>Subscriptions</span>
                            </span>
                            <i className="ms-auto me-0"><FiChevronRight /></i>
                        </a>
                        <div className="dropdown-menu">
                            {
                                subscriptionsList.map((item, index) => {
                                    return (
                                        <Fragment key={index}>
                                            {index === activePosition.length - 1 && <div className="dropdown-divider"></div>}
                                            <a href="#" className="dropdown-item">
                                                <span className="hstack">
                                                    <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                                    <span>{item}</span>
                                                </span>
                                            </a>
                                        </Fragment>
                                    )
                                })
                            }

                        </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <a href="#" className="dropdown-item">
                        <i ><FiUser /></i>
                        <span>Profile Details</span>
                    </a>
                    <a href="#" className="dropdown-item">
                        <i ><FiActivity /></i>
                        <span>Activity Feed</span>
                    </a>
                    <a href="#" className="dropdown-item">
                        <i ><FiDollarSign /></i>
                        <span>Billing Details</span>
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
                    <a href="./auth-login-minimal.html" className="dropdown-item">
                        <i> <FiLogOut /></i>
                        <span>Logout</span>
                    </a>
                </div>
            </div>
        ))
}

export default ProfileModal

const getColor = (item) => {
    switch (item) {
        case "Always":
            return "always_clr"
        case "Bussy":
            return "bussy_clr"
        case "Inactive":
            return "inactive_clr"
        case "Disabled":
            return "disabled_clr"
        case "Cutomization":
            return "cutomization_clr"
        default:
            return "active-clr";
    }
}