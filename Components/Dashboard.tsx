/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { Dropdown } from "react-bootstrap";
import style from './Dashbord.module.css';
const Dashboard = () => {
  return (
    <div>
      <div className={`${style.dashboardBG} p-3`}>
        <h3 className="bg-primary text-white p-2"><Link href="/">ড্যাশবোর্ড</Link></h3>
        <div className={`${style.dashboard} d-flex flex-column lh-lg`}>
           {/* --------- dropdown for Create / assign ----------- */}
           <Dropdown className="my-1">
            <Dropdown.Toggle id="dropdown-basic">
              নতুন তৈরি
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href={"/User/CreateUser"}>ইউজার তৈরী</Dropdown.Item>
              <Dropdown.Item href={"/Shop/CreateShop"}>দোকান তৈরি</Dropdown.Item>
              <Dropdown.Item href={"/Home/CreateHome"}>ঘর তৈরি</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Link href="/User/ShopOwner">
            <a> দোকান ভাড়াটিয়ার তালিকা</a>
          </Link>
          <Link href="/User/HomeOwner">ঘর ভাড়াটিয়ার তালিকা</Link>
          {/* --------- dropdown for income ----------- */}
          <Dropdown className="my-1">
            <Dropdown.Toggle id="dropdown-basic">
             আয় / Payment
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${style.maxHeightScroll}`}>
              <Dropdown.Item href={"/Payments/ShoshanDevDaho"}>শশ্মান দাহ</Dropdown.Item>
              <Dropdown.Item href={"/Payments/ShoshanDevShot"}>শশ্মান সৎকার</Dropdown.Item>
              <Dropdown.Item href="#/action-1">payment *</Dropdown.Item>
              <Dropdown.Item href="#/action-1">payment *</Dropdown.Item>
              <Dropdown.Item href="#/action-1">payment *</Dropdown.Item>
              <Dropdown.Item href="#/action-1">payment *</Dropdown.Item>
              <Dropdown.Item href="#/action-1">payment *</Dropdown.Item>
              <Dropdown.Item href="#/action-1">payment *</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* --------- dropdown for spend ----------- */}
          <Dropdown className="mb-1">
            <Dropdown.Toggle id="dropdown-basic">
              ব্যায়
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${style.maxHeightScroll}`}>
              <Dropdown.Item href="#/action-1">spend *</Dropdown.Item>
              <Dropdown.Item href="#/action-1">spend *</Dropdown.Item>
              <Dropdown.Item href="#/action-1">spend *</Dropdown.Item>
              <Dropdown.Item href="#/action-1">spend *</Dropdown.Item>
              <Dropdown.Item href="#/action-1">spend *</Dropdown.Item>
              <Dropdown.Item href="#/action-1">spend *</Dropdown.Item>
              <Dropdown.Item href="#/action-1">spend *</Dropdown.Item>
              <Dropdown.Item href="#/action-1">spend *</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="my-1">
            <Dropdown.Toggle id="dropdown-basic">
              রিপোর্ট
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href={"/Report/Expense"}>খরচ</Dropdown.Item>
              <Dropdown.Item href={"/Report/Payment"}> আয়</Dropdown.Item>
              <Dropdown.Item href={"/Report/Total"}>টোটাল</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* <Link href="/">
            <a> User </a>
          </Link> */}
        </div>
      </div>
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand mt-2 mt-lg-0" href="#">
              <img
                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                height="15"
                alt="MDB Logo"
                loading="lazy"
              />
            </a>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  HomePage
                </a>
              </li>
              <li className="nav-item">
                <Link href={"/User/CreateUser"}>Create User</Link>
              </li>
              <li className="nav-item">
                <Link href={"/Shop/CreateShop"}>Create Shop</Link>
              </li>
              <li className="nav-item">
                <Link href={"/Home/CreateHome"}>Create Home</Link>
              </li>
              <li className="nav-item">
                <Link href={"/User/AssignUser"}>Assign User</Link>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <a className="text-reset me-3" href="#">
              <i className="fas fa-shopping-cart"></i>
            </a>

            <div className="dropdown">
              <a
                className="text-reset me-3 dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-bell"></i>
                <span className="badge rounded-pill badge-notification bg-danger">
                  1
                </span>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Some news
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another news
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>

            <div className="dropdown">
              <a
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                href="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  className="rounded-circle"
                  height="25"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    My profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav> */}
    </div>
  );
};
export default Dashboard;
