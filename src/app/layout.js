import "../assets/scss/theme.scss";
import 'react-circular-progressbar/dist/styles.css';
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datetime/css/react-datetime.css";
import NavigationProvider from "@/contentApi/navigationProvider";
import './globals.css'
import { UserProvider } from '@/contentApi/UserContext'; // ✅ correct path

export const metadata = {
  title: "STREAM | Dashboard",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <SettingSideBarProvider> */}


        <NavigationProvider>
          {/* <UserProvider> */}
          {children}
          {/* </UserProvider> */}
        </NavigationProvider>

        {/* </SettingSideBarProvider> */}
        {/* <ThemeCustomizer /> */}
      </body>
    </html>
  );
}
