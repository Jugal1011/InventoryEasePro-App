import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import menu from "../../data/sidebar";
import { HiMenuAlt3 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import supply from "../../assets/supply-2.svg";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const goHome = () => {
    navigate("/");
  };

  const handleResize = () => {
    if (window.innerWidth < 600) {
      setIsOpen(false);
    }
  }
  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize()
  }, []);

  return (   
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "270px" : "60px" }}>
        <div className="top_section">
          <img
            src={supply}
            alt="Inventory"
            style={{ display: isOpen ? "" : "none", cursor: "pointer" }}
            onClick={goHome}
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
