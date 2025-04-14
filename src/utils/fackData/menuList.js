export const menuList = [
    {
        id: 1,
        name: "dashboards",
        path: "/dashboard",
        icon: 'feather-bar-chart-2',
        dropdownMenu: [
           
        ]
    },
    // {
    //     id: 1,
    //     name: "reports",
    //     path: "#",
    //     icon: 'feather-cast',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "Sales Report",
    //             path: "/reports/sales",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 2,
    //             name: "Leads Report",
    //             path: "/reports/leads",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 3,
    //             name: "Project Report",
    //             path: "/reports/project",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 4,
    //             name: "Timesheets Report",
    //             path: "/reports/timesheets",
    //             subdropdownMenu: false
    //         },

    //     ]
    // },
    // {
    //     id: 2,
    //     name: "applications",
    //     path: '#',
    //     icon: 'feather-send',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "Chat",
    //             path: "/applications/chat",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 2,
    //             name: "Email",
    //             path: "/applications/email",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 3,
    //             name: "Tasks",
    //             path: "/applications/tasks",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 4,
    //             name: "Notes",
    //             path: "/applications/notes",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 5,
    //             name: "Storage",
    //             path: "/applications/storage",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 6,
    //             name: "Calendar",
    //             path: "/applications/calendar",
    //             subdropdownMenu: false
    //         },
    //     ]
    // },
    {
        id: 2,
        name: "Projects",
        path: "#",
        icon: 'feather-box',
        dropdownMenu: [
            {
                id: 1,
                name: "View Projects",
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
        id: 3,
        name: "Faciliies",
        path: "#",
        icon: 'feather-archive',
        dropdownMenu: [
            {
                id: 1,
                name: "View Facilities",
                path: "/facilities/view",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: " Create Facilities",
                path: "/facilities/create",
                subdropdownMenu: false
            },

        ],
    },
    {
        id: 4,
        name: "Blogs",
        path: "#",
        icon: 'feather-edit',
        dropdownMenu: [
            {
                id: 1,
                name: "View blogs",
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
        id: 5,
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
        id: 7,
        name: "Actions",
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
        name: "PBL",
        path: "#",
        icon: 'feather-clipboard',
        dropdownMenu: [
            {
                id: 1,
                name: "Projects",
                path: "/pbl/list",
                subdropdownMenu: false
            },
            {
                id: 2,
                name: "Projects View",
                path: "/pbl/view",
                subdropdownMenu: false
            },
            {
                id: 3,
                name: "Projects Create",
                path: "/pbl/create",
                subdropdownMenu: false
            }
        ]
    },
    // {
    //     id: 8,
    //     name: "widgets",
    //     path: "#",
    //     icon: 'feather-layout',
    //     dropdownMenu: [
    //         {
    //             id: 1,
    //             name: "Lists",
    //             path: "/widgets/lists",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 2,
    //             name: "Tables",
    //             path: "/widgets/tables",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 3,
    //             name: "Charts",
    //             path: "/widgets/charts",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 4,
    //             name: "Statistics",
    //             path: "/widgets/statistics",
    //             subdropdownMenu: false
    //         },
    //         {
    //             id: 5,
    //             name: "Miscellaneous",
    //             path: "/widgets/miscellaneous",
    //             subdropdownMenu: false
    //         },
    //     ]
    // },
    {
        id: 9,
        name: "Profile",
        path: "/settings/ganeral",
        icon: 'feather-user',
        dropdownMenu: [
        ]
    },
    {
        id: 10,
        name: "authentication",
        path: "#",
        icon: 'feather-power',
        dropdownMenu: [
            {
                id: 1,
                name: "login",
                path: "/authentication/login",
                subdropdownMenu: [
                    // {
                    //     id: 1,
                    //     name: "Cover",
                    //     path: "/authentication/login/cover",
                    // },
                    // {
                    //     id: 2,
                    //     name: "Minimal",
                    //     path: "/authentication/login/minimal",
                    // },
                    // {
                    //     id: 3,
                    //     name: "Creative",
                    //     path: "/authentication/login/creative",
                    // },
                ]
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
                    // {
                    //     id: 3,
                    //     name: "Creative",
                    //     path: "/authentication/register/creative",
                    // },
                ]
            },
            {
                id: 3,
                name: "Error 404",
                path: "/authentication/404",
                subdropdownMenu: [
                    // {
                    //     id: 1,
                    //     name: "Cover",
                    //     path: "/cover",
                    // },
                    // {
                    //     id: 2,
                    //     name: "Minimal",
                    //     path: "/authentication/404/minimal",
                    // },
                    // {
                    //     id: 3,
                    //     name: "Creative",
                    //     path: "/authentication/404/creative",
                    // },
                ]
            },
            {
                id: 4,
                name: "Reset Password",
                path: "/authentication/reset",
                subdropdownMenu: [
                    // {
                    //     id: 1,
                    //     name: "Cover",
                    //     path: "/authentication/reset/cover",
                    // },
                    // {
                    //     id: 2,
                    //     name: "Minimal",
                    //     path: "/authentication/reset/minimal",
                    // },
                    // {
                    //     id: 3,
                    //     name: "Creative",
                    //     path: "/authentication/reset/creative",
                    // },
                ]
            },
            {
                id: 5,
                name: "Verify OTP",
                path: "/authentication/verify",
                subdropdownMenu: [
                    // {
                    //     id: 1,
                    //     name: "Cover",
                    //     path: "/authentication/verify/cover",
                    // },
                    // {
                    //     id: 2,
                    //     name: "Minimal",
                    //     path: "/authentication/verify/minimal",
                    // },
                    // {
                    //     id: 3,
                    //     name: "Creative",
                    //     path: "/authentication/verify/creative",
                    // },
                ]
            },
            {
                id: 6,
                name: "Maintenance",
                path: "/authentication/maintenance",
                subdropdownMenu: [
                    // {
                    //     id: 1,
                    //     name: "Cover",
                    //     path: "/authentication",
                    // },
                    // {
                    //     id: 2,
                    //     name: "Minimal",
                    //     path: "/authentication/maintenance/minimal",
                    // },
                    // {
                    //     id: 3,
                    //     name: "Creative",
                    //     path: "/authentication/maintenance/creative",
                    // },
                ]
            },
        ]
    },
    
]
