import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo.png'
import { GrMapLocation } from "react-icons/gr";
import { LuShip } from "react-icons/lu";
import { BsAirplaneEngines } from "react-icons/bs";
import { BiGridAlt, BiUser, BiUserCircle, BiGroup, BiNews, BiCog, BiInfoCircle, BiAlignLeft } from "react-icons/bi";

const linkItem1 = [
    {
        path:"/fleet/dashboard",
        name:"Dashboard",
        icon:<BiGridAlt/>
    },
    {
        path:"/fleet/map",
        name:"Map",
        icon:<GrMapLocation/>
    },
   
    {
        path:"/fleet/roles",
        name:"Roles",
        icon:<BiUser/>
    },

    {
        path:"/fleet/users",
        name:"Users",
        icon:<BiUserCircle/>
    },

    {
        path:"/fleet/personnel",
        name:"Personnel",
        icon:<BiGroup/>
    },
    
    {
        path:"/fleet/vessels",
        name:"Vessels",
        icon:<LuShip/>
    },
    {
        path:"/fleet/aircrafts",
        name:"Aircrafts",
        icon:<BsAirplaneEngines/>
    },

    {
        path:"/fleet/commercial-vessels",
        name:"Vessels-Commercial",
        icon:<LuShip/>
    },
    {
        path:"/fleet/commercial-aircrafts",
        name:"Aircrafts-Commercial",
        icon:<BsAirplaneEngines/>
    },

    {
        path:"/fleet/reports",
        name:"Reports",
        icon:<BiNews/>
    },
    {
        path:"/fleet/alerts",
        name:"Alerts",
        icon:<BiInfoCircle/>
    },

     
    {
        path:"/fleet/settings",
        name:"Settings",
        icon:<BiCog/>
    },
]








const Sidebar = () => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const [specificMenuItems1, setSpecificMenuItems1] = useState(["Map"]);

    useEffect(() => {
        // Retrieve the username from local storage
        const username = localStorage.getItem('user');

        // Update specificMenuItems1 based on the username
        if (username === "admin") {
            setSpecificMenuItems1(["Dashboard", "Map", "Roles", "Users", "Personnel"]);
        }
    }, []); // Empty dependency array means this effect runs once on mount

    const specificMenuItems2 = ["Vessels", "Aircrafts"];
const specificMenuItems3 = ["Vessels-Commercial", "Aircrafts-Commercial"];
const specificMenuItems4 = ["Reports", "Alerts"];
const specificMenuItems5 = ["Settings"];

const filteredLinkItems1 = linkItem1.filter(item => specificMenuItems1.includes(item.name));
const filteredLinkItems2 = linkItem1.filter(item => specificMenuItems2.includes(item.name));
const filteredLinkItems3 = linkItem1.filter(item => specificMenuItems3.includes(item.name));
const filteredLinkItems4 = linkItem1.filter(item => specificMenuItems4.includes(item.name));
const filteredLinkItems5 = linkItem1.filter(item => specificMenuItems5.includes(item.name));



    return (
        <div className="sidebar_container">
           

           <div style={{width: isOpen ? "280px" : "120px"}} className="sidebar">
              

              <div className="link_wrapper">
              <div className="logo_wrapper">
                   <div className="logo ">
                   <img src={Logo} alt="logo"  style={{
                        width: isOpen ? '30%' : '80px',
                        transition: 'width 0.3s ease',
                    }} />
                   </div>
              <span>Navigate</span>
                   
               </div>
               
              {filteredLinkItems1.map((item, index) => (
                   // Check the 'disabled' property and conditionally disable the menu item
                   !item.disabled ? (
                       <NavLink to={item.path} key={index} className={`link ${({ isActive }) => isActive ? "active" : ''}`} style={{ justifyContent: isOpen ? "start" : "center" }}>
                           <div className="icon">{item.icon}</div>
                           <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</h2>
                       </NavLink>
                   ) : (
                       // Render a disabled menu item
                       <div key={index} className="link disabled" style={{ justifyContent: isOpen ? "start" : "center" }}>
                           <div className="icon">{item.icon}</div>
                           <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</h2>
                       </div>
                   )
               ))}
              </div>

              <div className="link_wrapper2">
              {filteredLinkItems2.map((item, index) => (
                   // Check the 'disabled' property and conditionally disable the menu item
                   !item.disabled ? (
                       <NavLink to={item.path} key={index} className={`link ${({ isActive }) => isActive ? "active" : ''}`} style={{ justifyContent: isOpen ? "start" : "center" }}>
                           <div className="icon">{item.icon}</div>
                           <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</h2>
                       </NavLink>
                   ) : (
                       // Render a disabled menu item
                       <div key={index} className="link disabled" style={{ justifyContent: isOpen ? "start" : "center" }}>
                           <div className="icon">{item.icon}</div>
                           <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</h2>
                       </div>
                   )
               ))}
              </div>


              <div className="link_wrapper2">
              {filteredLinkItems3.map((item, index) => (
                   // Check the 'disabled' property and conditionally disable the menu item
                   !item.disabled ? (
                       <NavLink to={item.path} key={index} className={`link ${({ isActive }) => isActive ? "active" : ''}`} style={{ justifyContent: isOpen ? "start" : "center" }}>
                           <div className="icon">{item.icon}</div>
                           <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</h2>
                       </NavLink>
                   ) : (
                       // Render a disabled menu item
                       <div key={index} className="link disabled" style={{ justifyContent: isOpen ? "start" : "center" }}>
                           <div className="icon">{item.icon}</div>
                           <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</h2>
                       </div>
                   )
               ))}
              </div>


              <div className="link_wrapper2">
              {filteredLinkItems4.map((item, index) => (
                   // Check the 'disabled' property and conditionally disable the menu item
                   !item.disabled ? (
                       <NavLink to={item.path} key={index} className={`link ${({ isActive }) => isActive ? "active" : ''}`} style={{ justifyContent: isOpen ? "start" : "center" }}>
                           <div className="icon">{item.icon}</div>
                           <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</h2>
                       </NavLink>
                   ) : (
                       // Render a disabled menu item
                       <div key={index} className="link disabled" style={{ justifyContent: isOpen ? "start" : "center" }}>
                           <div className="icon">{item.icon}</div>
                           <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</h2>
                       </div>
                   )
               ))}
              </div>

              
              <div className="link_wrapper3">
              {filteredLinkItems5.map((item, index) => (
                   // Check the 'disabled' property and conditionally disable the menu item
                   !item.disabled ? (
                       <NavLink to={item.path} key={index} className={`link ${({ isActive }) => isActive ? "active" : ''}`} style={{ justifyContent: isOpen ? "start" : "center" }}>
                           <div className="icon">{item.icon}</div>
                           <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</h2>
                       </NavLink>
                   ) : (
                       // Render a disabled menu item
                       <div key={index} className="link disabled" style={{ justifyContent: isOpen ? "start" : "center" }}>
                           <div className="icon">{item.icon}</div>
                           <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</h2>
                       </div>
                   )
               ))}

              </div>
              
           </div>

           <div style={{marginLeft: isOpen ? "20px" : "10px"}} className="bars">
                       <BiAlignLeft onClick={toggle}/>
            </div>
        </div>
    );
};




export default Sidebar;