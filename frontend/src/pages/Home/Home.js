import React from "react";
import { BsShop } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/inv-img.png";
import supply from "../../assets/supply.svg";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";
// import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between ">
        <div className="logo-div">
          <img src={supply} alt="Inventory" />
          <span>InventoryEasePro</span>
        </div>

        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/app/register-user">Register</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/app/login-user">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/app/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/* HERO SECTION */}
      <section className="container hero">
        <div className="hero-text">
          <h2>Welcome to InventoryEasePro</h2>
          <p>
            Say goodbye to tedious manual tracking. InventoryEasePro automates
            and streamlines your inventory processes, saving you time and
            reducing errors.
          </p>
          <p>
            InventoryEasePro is your ultimate solution for seamless and
            efficient inventory management. Designed to cater to businesses of
            all sizes, our intuitive platform simplifies the complexities of
            tracking, managing, and optimizing your stock.
          </p>
          <p>
            Inventory system to control and manage proucts in the warehouse in
            realtime and integrated to make it easier to develop your business.
          </p>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Inventory" />
        </div>
      </section>
    </div>
  );
};

export default Home;
