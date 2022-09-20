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
            <a>দোকান ভাড়াটিয়ার তালিকা</a>
          </Link>
          <Link href="/User/HomeOwner">ঘর ভাড়াটিয়ার তালিকা</Link>
          {/* --------- dropdown for income ----------- */}
          <Dropdown className="my-1">
            <Dropdown.Toggle id="dropdown-basic">
             আয় / Payment
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${style.maxHeightScroll}`}>
            <Dropdown.Item href={"/Payments/ShoshanDevDaho"}>শ্মশান উন্নয়ন (দাহ সনদ)</Dropdown.Item>
              <Dropdown.Item href={"/Payments/ShoshanDevShot"}>শ্মশান উন্নয়ন (সৎকার)</Dropdown.Item>
              <Dropdown.Item href={"/Payments/Dighi"}>দিঘী লিজ বাবদ</Dropdown.Item>
              <Dropdown.Item href={"/Payments/DanBox"}>মন্দির দান বাক্স হতে</Dropdown.Item>
              <Dropdown.Item href={"/Payments/DanOnudan"}>সরকারি-বেসরকারি দান-অনুদান</Dropdown.Item>
              <Dropdown.Item href={"/Payments/BuySell"}>দোকান-ঘর-অন্যান্য ক্রয়-বিক্রয় বাবদ</Dropdown.Item>
              <Dropdown.Item href={"/Payments/SosanSomadhi"}>শ্মশানস্থ সমাধি ও অন্যান্য </Dropdown.Item>
              <Dropdown.Item href={"/Payments/JinisPotroPrapti"}>জিনিস পত্রাদি প্রাপ্তি </Dropdown.Item>
              <Dropdown.Item href={"/Payments/CommitteeChada"}>কমিটির কার্যনির্বাহী সদস্যদের চাঁদা (মাসিক ভিত্তিতে) </Dropdown.Item>
              <Dropdown.Item href={"/Payments/ProkashonaProchar"}>স্যুভেনির, প্রকাশনা, স্মারক ও প্রচার</Dropdown.Item>
              <Dropdown.Item href={"/Payments/Bibidh"}>বিবিধ</Dropdown.Item>
              <Dropdown.Item href={"/Payments/Others"}> অন্যান্য প্রাপ্তি (বিবাহ-শ্রাদ্ধাদি-ঘাটকাজ-নিয়মিত ভক্তের অনুদান)</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* --------- dropdown for spend ----------- */}
          <Dropdown className="mb-1">
            <Dropdown.Toggle id="dropdown-basic">
              ব্যায়
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${style.maxHeightScroll}`}>
              <Dropdown.Item href="/Expense/TempDev">মন্দির উন্নয়ন ও সংস্কারমূলক কাজ</Dropdown.Item>
              <Dropdown.Item href="/Expense/FuneralDev">শ্মশান উন্নয়ন ও সংস্কারমূলক কাজ</Dropdown.Item>
              <Dropdown.Item href="#/action-1">মন্দির কার্যে সংশ্লিষ্টদের সম্মানি-বেতন-ভাতাদি</Dropdown.Item>
              <Dropdown.Item href="#/action-1">দৈনিক/সাপ্তাহিক পূজা</Dropdown.Item>
              <Dropdown.Item href="#/action-1">আপ্যায়ন সভা ও বিশেষ প্রার্থনা ভোগ ইত্যাদি খরচ</Dropdown.Item>
              <Dropdown.Item href="#/action-1">প্রশাসনিক ও আইন সংক্রান্ত খরচ</Dropdown.Item>
              <Dropdown.Item href="#/action-1">মন্দির সংশ্লিষ্ট প্রচার প্রকাশনা ও যাতায়াত বাবদ খরচাদি</Dropdown.Item>
              <Dropdown.Item href="#/action-1">অফিস স্টেশনারী-খাতা-কলম</Dropdown.Item>
              <Dropdown.Item href="#/action-1">মন্দির হতে বিভিন্ন সেবামূলক, সমাজ কল্যাণ কাজ এবং দান অনুদান</Dropdown.Item>
              <Dropdown.Item href="#/action-1">বিদ্যুৎ, গ্যাস, টেলিফোন ও অন্যান্য বিল</Dropdown.Item>
              <Dropdown.Item href="#/action-1">বিবিধ</Dropdown.Item>
              <Dropdown.Item href="#/action-1">বিশেষ অনুষ্ঠান সমূহ</Dropdown.Item>
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
