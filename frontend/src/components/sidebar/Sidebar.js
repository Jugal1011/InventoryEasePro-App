import React, { useState } from "react";
import "./Sidebar.scss";
import menu from "../../data/sidebar"
import { HiMenuAlt3 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import supply from "../../assets/supply-2.svg";

const Sidebar = ({ children }) => {
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
      <div className="sidebar" style={{ width: isOpen ? "270px" : "60px" }}>
        <div className="top_section">
          <img
            src={supply}
            alt="Inventory"
            style={{ display: isOpen ? "" : "none" }}
          />
          <span className="logo-text" style={{ display: isOpen ? "" : "none" }}>
            InventoryEasePro
          </span>
          <div className="bars">
            <HiMenuAlt3 onClick={toggle} />
          </div>
        </div>
        <div>
          {menu.map((item, index) => {
            return <SidebarItem key={index} item={item} isOpen={isOpen} />;
          })}
        </div>
      </div>
      <main
        style={{
          paddingLeft: isOpen ? "270px" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
