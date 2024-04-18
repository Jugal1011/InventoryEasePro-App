import React, { useState } from "react";
import "./Sidebar.scss";
import menu from "../../data/sidebar"
import { HiMenuAlt3 } from "react-icons/hi";
import { BsShop } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
const Sidebar = ({children}) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "250px" : "60px" }}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
            <BsShop 
                size={40}
                onClick={goHome}    
            />
          </div>
          <div className="bars" style={{ marginLeft: isOpen ? "160px" : "0px"}}>
            <HiMenuAlt3
              onClick={toggle} 
            />
          </div>
        </div>
        <div>
            {menu.map((item,index)=>{
                return <SidebarItem key={index} item={item} isOpen={isOpen}/>
            })}
        </div>
      </div>
      <main
      style={{
          paddingLeft: isOpen ? "250px" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
