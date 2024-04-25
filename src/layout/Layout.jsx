import { Outlet } from "react-router-dom"  
import Navbar from "../components/navbar/Navbar"
import Sidebar from "../components/sidebar/Sidebar"
import DataProvider from "../context/DataProvider"
import RefreshData from "../RefreshData"

export default function Layout() {
  return (
    <DataProvider>
    <div className="main_container">
    <RefreshData />

        <Sidebar />
        <div className="content_container">
            <Navbar />
            <Outlet />
        </div>
    </div>
    </DataProvider>
  )
}
