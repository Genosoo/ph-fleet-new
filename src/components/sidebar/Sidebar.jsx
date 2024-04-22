import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { linkItem1 } from './Link';
import {BiAlignLeft } from "react-icons/bi";
import { apiAccount } from '../../api/api_urls';

import axios from 'axios'
import Logo from '../../assets/logo.png'


const Sidebar = () => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const [specificMenuItems1, setSpecificMenuItems1] = useState(["Map", "Incidents", "Report In"]);
    const [specificMenuItems2, setSpecificMenuItems2] = useState("");
    const [specificMenuItems3, setSpecificMenuItems3] = useState("");
    const [specificMenuItems4, setSpecificMenuItems4] = useState("");
    const [specificMenuItems5, setSpecificMenuItems5] = useState("");
    const [specificMenuItems6, setSpecificMenuItems6] = useState("");
    const [accountData, setAccountData] = useState({});


    useEffect(() => {
        const fetchData = async () => {
          try {
            const accountResponse = await axios.get(apiAccount);
            const responseData = accountResponse.data.success
            console.log(responseData);
            setAccountData(responseData);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);


      useEffect(() => {
        // Check if accountData.groups is defined and has at least one item
        if (accountData.groups && accountData.groups.length > 0) {
            const userRole = accountData.roles[0];

            console.log('Hello!:',userRole)
    
            // Update specificMenuItems1 based on the user role
            if (userRole === "Administrator") {
                setSpecificMenuItems1(["Dashboard", "Map"]);
                setSpecificMenuItems2(["Report In",  "Reports", "Alerts", "Incidents"]);
                setSpecificMenuItems3(["Roles", "Users"]);
                setSpecificMenuItems4(["Personnel", "Offices", "Vessels", "Aircrafts", "Vehicles"]);
                setSpecificMenuItems5(["Other Vessels", "Other Aircrafts", "Other Vehicles", "Other Offices", "Other Personnel"]);
                setSpecificMenuItems6(["Settings"]);
            } else if (userRole === "OP Viewer") {
                setSpecificMenuItems1(["Dashboard", "Map"]);
            } else if (userRole === "Personnel") {
                setSpecificMenuItems1([ "Map", "Report In", "Incidents"]);
            } else{
                setSpecificMenuItems1([ "Map"]);
            }
        }
    }, [accountData]);
    
    const filteredLinkItems1 = linkItem1.filter(item => specificMenuItems1.includes(item.name));
    const filteredLinkItems2 = linkItem1.filter(item => specificMenuItems2.includes(item.name));
    const filteredLinkItems3 = linkItem1.filter(item => specificMenuItems3.includes(item.name));
    const filteredLinkItems4 = linkItem1.filter(item => specificMenuItems4.includes(item.name));
    const filteredLinkItems5 = linkItem1.filter(item => specificMenuItems5.includes(item.name));
    const filteredLinkItems6 = linkItem1.filter(item => specificMenuItems6.includes(item.name));



    return (
        <div className="sidebar_container">
           <div 
             style={{width: isOpen ? "210px" : "100px"}} 
             className="sidebar"
            >
              <div className="link_wrapper">
                <div className="logo_wrapper">
                    <div className="logo ">
                        <img 
                            src={Logo}
                            alt="logo"  
                            style={{ width: isOpen ? '100%' : '80px', transition: 'width 0.3s ease'}} 
                        />
                    </div>
                    <p >Navigate</p>
                </div>
               
               {filteredLinkItems1.map((item, index) => (
                <div key={index}>
                    {item.disabled ? (
                        <div 
                        className="link disabled" 
                        style={{ justifyContent: isOpen ? "start" : "center" }}>
                            <div className="icon">{item.icon}</div>
                            <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</h2>
                        </div>
                    ) : (
                        <NavLink to={item.path} className={`link ${({ isActive }) => isActive ? "active" : ''}`} style={{ justifyContent: isOpen ? "start" : "center" }}>
                            <div className="icon">{item.icon}</div>
                            <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</h2>
                        </NavLink>
                    )}
                </div>
            ))}
              </div>

              <div  className={`link_wrapper2 ${filteredLinkItems2.length === 0 ? "border-none" : ""}`}>
                    {filteredLinkItems2.map((item, index) => (
                        // Check the 'disabled' property and conditionally disable the menu item
                        item.disabled ? (
                            <div key={index} className="link disabled" style={{ justifyContent: isOpen ? "start" : "center" }}>
                                <div className="icon">{item.icon}</div>
                                <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</h2>
                            </div>
                        ) : (
                            // Render an active NavLink
                            <NavLink to={item.path} key={index} className={`link ${({ isActive }) => isActive ? "active" : ''}`} style={{ justifyContent: isOpen ? "start" : "center" }}>
                                <div className="icon">{item.icon}</div>
                                <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</h2>
                            </NavLink>
                        )
                    ))}
                </div>


                <div className={`link_wrapper2 ${filteredLinkItems3.length === 0 ? "border-none" : ""}`}>
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


              <div  className={`link_wrapper2 ${filteredLinkItems4.length === 0 ? "border-none" : ""}`}>
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

              
              <div className={`link_wrapper3 ${filteredLinkItems5.length === 0 ? "border-none" : ""}`}>
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

              <div  className={`link_wrapper3 ${filteredLinkItems6.length === 0 ? "border-none" : ""}`}>
              {filteredLinkItems6.map((item, index) => (
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

           <div style={{marginLeft: isOpen ? "0" : "10px"}} className="bars">
                       <BiAlignLeft onClick={toggle}/>
            </div>
        </div>
    );
};




export default Sidebar;