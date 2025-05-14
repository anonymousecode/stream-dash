'use client'
import useBootstrapUtils from '@/hooks/useBootstrapUtils'
import { usePathname } from 'next/navigation'
import React from 'react'
import { UserProvider } from '@/contentApi/UserContext'

const layout = ({ children }) => {
    const pathName = usePathname()
    useBootstrapUtils(pathName)

    return (
        <>
            {/* <UserProvider> */}
            {children}
            {/* </UserProvider> */}
        </>
    )
}

export default layout