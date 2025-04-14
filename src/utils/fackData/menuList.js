export const menuList = [
    {
        id: 0,
        name: "dashboards",
        path: "/dashboard",
        icon: 'feather-bar-chart-2',
        dropdownMenu: [
           
        ]
    },
    {
        id: 1,
        name: "Projects",
        path: "#",
        icon: 'feather-box',
        dropdownMenu: [
            {
                id: 1,
                name: "Manage Projects",
                path: "/projects/view",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: " Create Projects",
                path: "/projects/create",
                subdropdownMenu: false
            },

        ],
    },
    {
        id: 2,
        name: "Faciliies",
        path: "#",
        icon: 'feather-archive',
        dropdownMenu: [
            {
                id: 1,
                name: "Manage Facilities",
                path: "/facilities/view",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: "Create Facilities",
                path: "/facilities/create",
                subdropdownMenu: false
            },

        ],
    },
    {
        id: 3,
        name: "Blogs",
        path: "#",
        icon: 'feather-edit',
        dropdownMenu: [
            {
                id: 1,
                name: "Manage blogs",
                path: "/blogs/view",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: " Create blogs",
                path: "/blogs/create",
                subdropdownMenu: false
            }
        ]
    },
    {
        id: 4,
        name: "LMS",
        path: "#",
        icon: 'feather-book',
        dropdownMenu: [
            {
                id: 1,
                name: "Overview",
                path: "/facilities/view",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: "View Certificates",
                path: "/facilities/create",
                subdropdownMenu: false
            },
            {
                id: 3,
                name: "View Courses",
                path: "/facilities/create",
                subdropdownMenu: false
            },
            {
                id: 4,
                name: "Manage Courses",
                path: "/facilities/create",
                subdropdownMenu: false
            },

        ],
    },
    {
        id: 5,
        name: "Events",
        path: "#",
        icon: 'feather-calendar',
        dropdownMenu: [
            {
                id: 1,
                name: "View Events",
                path: "/events/view",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: "Create Events",
                path: "/events/create",
                subdropdownMenu: false
            },
            {
                id: 3,
                name: "Manage Events",
                path: "/events/create",
                subdropdownMenu: false
            }
        ]
    },
    {
        id: 6,
        name: "PBL",
        path: "#",
        icon: 'feather-clipboard',
        dropdownMenu: [
            {
                id: 1,
                name: "Manage proposal",
                path: "/pbl/view",
                subdropdownMenu: false
            },
            {
                id: 3,
                name: "Create Proposal",
                path: "/pbl/create",
                subdropdownMenu: false
            }
        ]
    },
    {
        id: 7,
        name: "actions",
        path: "#",
        icon: 'feather-zap',
        dropdownMenu: [
            {
                id: 1,
                name: "Leads",
                path: "/leads/list",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: "Leads View",
                path: "/leads/view",
                subdropdownMenu: false
            },
            {
                id: 3,
                name: "Leads Create",
                path: "/leads/create",
                subdropdownMenu: false
            }
        ]
    },
    {
        id: 8,
        name: "Profile",
        path: "/settings/ganeral",
        icon: 'feather-user',
        dropdownMenu: [
        ]
    },
    {
        id: 9,
        name: "Logout",
        path: "/",
        icon: 'feather-power',
        dropdownMenu: []
    },
    {
        id: 9,
        name: "Develop",
        path: "#",
        icon: 'feather-code',
        dropdownMenu: [
            {
                id: 1,
                name: "login",
                path: "/authentication/login",
                subdropdownMenu: [
                ]
            },
            {
                id: 1,
                name: "Lists",
                path: "/widgets/lists",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: "Tables",
                path: "/widgets/tables",
                subdropdownMenu: false
            },
            {
                id: 3,
                name: "Charts",
                path: "/widgets/charts",
                subdropdownMenu: false
            },
            {
                id: 4,
                name: "Statistics",
                path: "/widgets/statistics",
                subdropdownMenu: false
            },
            {
                id: 5,
                name: "Miscellaneous",
                path: "/widgets/miscellaneous",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: "register",
                path: "#",
                subdropdownMenu: [
                    {
                        id: 1,
                        name: "User Registration",
                        path: "/authentication/user-register",
                    },
                    {
                        id: 2,
                        name: "Student Registration",
                        path: "/authentication/student-register",
                    },
                ]
            },
            {
                id: 3,
                name: "Error 404",
                path: "/authentication/404",
                subdropdownMenu: [
                ]
            },
            {
                id: 4,
                name: "Reset Password",
                path: "/authentication/reset",
                subdropdownMenu: [
                ]
            },
            {
                id: 5,
                name: "Verify OTP",
                path: "/authentication/verify",
                subdropdownMenu: [
                ]
            },
            {
                id: 6,
                name: "Maintenance",
                path: "/authentication/maintenance",
                subdropdownMenu: [
                ]
            },
            {
                id: 1,
                name: "Chat",
                path: "/applications/chat",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: "Email",
                path: "/applications/email",
                subdropdownMenu: false
            },
            {
                id: 3,
                name: "Tasks",
                path: "/applications/tasks",
                subdropdownMenu: false
            },
            {
                id: 4,
                name: "Notes",
                path: "/applications/notes",
                subdropdownMenu: false
            },
            {
                id: 5,
                name: "Storage",
                path: "/applications/storage",
                subdropdownMenu: false
            },
            {
                id: 6,
                name: "Calendar",
                path: "/applications/calendar",
                subdropdownMenu: false
            },
            {
                id: 1,
                name: "Sales Report",
                path: "/reports/sales",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: "Leads Report",
                path: "/reports/leads",
                subdropdownMenu: false
            },
            {
                id: 3,
                name: "Project Report",
                path: "/reports/project",
                subdropdownMenu: false
            },
            {
                id: 4,
                name: "Timesheets Report",
                path: "/reports/timesheets",
                subdropdownMenu: false
            },
        ]
    },
    
]
