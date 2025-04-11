import Link from 'next/link'
import React from 'react'
import { FiBell, FiCheck, FiX } from 'react-icons/fi'

const notificationsList = [
    {
        id: 1,
        src: "/images/avatar/2.png",
        time: "2",
        titleFirst: "Malanie Hanvey",
        titleSecond: "We should talk about that at lunch!"
    },
    {
        id: 3,
        src: "/images/avatar/3.png",
        time: "36",
        titleFirst: "Valentine Maton",
        titleSecond: "You can download the latest invoices now."
    },
    {
        id: 4,
        src: "/images/avatar/4.png",
        time: "53",
        titleFirst: "Archie Cantones",
        titleSecond: "Don't forget to pickup Jeremy after school!"
    },

]
const NotificationsModal = ({ Notifications }) => {
    return (
        <div className="dropdown nxl-h-item">
            <div className="nxl-head-link me-3" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside">
                <FiBell size={20} />
                <span className="badge bg-danger nxl-h-badge">3</span>
            </div>
            <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-notifications-menu">
                <div className="d-flex justify-content-between align-items-center notifications-head">
                    <h6 className="fw-bold text-dark mb-0">Notifications</h6>
                    <Link href="#" className="fs-11 text-success text-end ms-auto" data-toggle="tooltip" data-title="Make as Read">
                        <FiCheck size={16} />
                        <span>Make as Read</span>
                    </Link>
                </div>
                {
                    Notifications && Notifications.map(({ id, creation, message, level, level_id }) => <Card key={id} creation={creation} message={message} level={level} />)
                }

                <div className="text-center notifications-footer">
                    <Link href="#" className="fs-13 fw-semibold text-dark">All Notifications</Link>
                </div>
            </div>
        </div>
    )
}

export default NotificationsModal

function timeAgo(datetimeStr) {
    const createdAt = new Date(datetimeStr);
    const now = new Date();
    const diffInSeconds = Math.floor((now - createdAt) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else {
        const weeks = Math.floor(diffInSeconds / 604800);
        return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    }
}


const Card = ({ key, creation, message, level }) => {
    return (
        <div className="notifications-item">
            {/* <img src={src} alt="" className="rounded me-3 border" /> */}
            <div className="notifications-desc">
                {/* <Link href="#" className="font-body text-truncate-2-line"> <span className="fw-semibold text-dark">{titleFirst}</span> {titleSecond}</Link> */}
                <Link href="#" className="font-body text-truncate-2-line"> {message}</Link>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="notifications-date text-muted border-bottom border-bottom-dashed">{timeAgo(creation)}</div>
                    <div className="d-flex align-items-center float-end gap-2">
                        <span className="d-block wd-8 ht-8 rounded-circle bg-gray-300" data-toggle="tooltip" data-title="Make as Read"></span>
                        <span className="text-danger" data-toggle="tooltip" data-title="Remove"> <FiX className="fs-12" /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}