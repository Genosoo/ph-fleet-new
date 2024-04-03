import { Outlet } from "react-router-dom"  
import Navbar from "../components/navbar/Navbar"
import Sidebar from "../components/sidebar/Sidebar"
import { useFetchData } from "../context/FetchData"
import Loader from "../Loader"
import { useState, useEffect } from 'react';

export default function Layout() {
  const [loading, setLoading] = useState(true); // State to track loading status
  const fetchedData = useFetchData();

  
  useEffect(() => {
    if (fetchedData !== null) {
      setLoading(false); 
    }
  }, [fetchedData]);
  

  return (
   <>
    {loading ? (
    <Loader />
    ): (
      <div className="main_container">
      <Sidebar />
      <div className="content_container">
          <Navbar />
          <Outlet />
      </div>
  </div>
    )}
   </>
  )
}
