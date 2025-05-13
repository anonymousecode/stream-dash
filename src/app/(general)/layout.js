'use client'
import { usePathname } from "next/navigation";
import Header from "@/components/shared/header/Header";
import NavigationManu from "@/components/shared/navigationMenu/NavigationMenu";
import SupportDetails from "@/components/supportDetails";
import dynamic from "next/dynamic";
import useBootstrapUtils from "@/hooks/useBootstrapUtils";
// import { UserProvider } from "@/contentApi/UserContext";

// const useBootstrapUtils = dynamic(() => import('@/hooks/useBootstrapUtils'), { ssr: false })

const layout = ({ children }) => {
    const pathName = usePathname()
    useBootstrapUtils(pathName)

    return (
        <>
            <Header />
            <NavigationManu />
            {/* <UserProvider>
                <div className="nxl-content">
                    {children}
                </div>
            </UserProvider> */}
            <main className="nxl-container">
                <div className="nxl-content">
                    {children}
                </div>
            </main>
            <SupportDetails />
        </>
    )
}

export default layout