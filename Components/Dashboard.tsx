/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import style from "./Dashbord.module.css";
const Dashboard = () => {
  return (
    <div>
      <div className={`${style.dashboardBG} p-3`}>
        <h3 className="bg-primary text-white p-2">
          <Link href="/">ড্যাশবোর্ড</Link>
        </h3>
        <div className={`${style.dashboard} d-flex flex-column lh-lg`}>
          {/* --------- dropdown for Create / assign ----------- */}
          <Dropdown className="my-1">
            <Dropdown.Toggle id="dropdown-basic">নতুন তৈরি</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href={"/Shop/CreateShop"}>
                দোকান তৈরি
              </Dropdown.Item>
              <Dropdown.Item href={"/Home/CreateHome"}>ঘর তৈরি</Dropdown.Item>
              <Dropdown.Item href={"/User/CreateUser"}>
                ইউজার তৈরী
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Link href="/User/ShopOwner">
            <a>দোকান ভাড়াটিয়ার তালিকা</a>
          </Link>
          <Link href="/User/HomeOwner">ঘর ভাড়াটিয়ার তালিকা</Link>
          {/* --------- dropdown for income ----------- */}
          <Dropdown className="my-1">
            <Dropdown.Toggle id="dropdown-basic">আয় / Payment</Dropdown.Toggle>
            <Dropdown.Menu className={`${style.maxHeightScroll}`}>
              <Dropdown.Item href={"/Payments/ShoshanDevDaho"}>
                শ্মশান উন্নয়ন (দাহ সনদ)
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/ShoshanDevShot"}>
                শ্মশান উন্নয়ন (সৎকার)
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/Dighi"}>
                দিঘী লিজ বাবদ
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/DanBox"}>
                মন্দির দান বাক্স হতে
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/DanOnudan"}>
                সরকারি-বেসরকারি দান-অনুদান
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/BuySell"}>
                দোকান-ঘর-অন্যান্য ক্রয়-বিক্রয় বাবদ
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/SosanSomadhi"}>
                শ্মশানস্থ সমাধি ও অন্যান্য{" "}
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/JinisPotroPrapti"}>
                জিনিস পত্রাদি প্রাপ্তি{" "}
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/CommitteeChada"}>
                কমিটির কার্যনির্বাহী সদস্যদের চাঁদা (মাসিক ভিত্তিতে){" "}
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/ProkashonaProchar"}>
                স্যুভেনির, প্রকাশনা, স্মারক ও প্রচার
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/Bibidh"}>বিবিধ</Dropdown.Item>
              <Dropdown.Item href={"/Payments/Others"}>
                {" "}
                অন্যান্য প্রাপ্তি (বিবাহ-শ্রাদ্ধাদি-ঘাটকাজ-নিয়মিত ভক্তের অনুদান)
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* --------- dropdown for spend ----------- */}
          <Dropdown className="mb-1">
            <Dropdown.Toggle id="dropdown-basic">ব্যায়</Dropdown.Toggle>
            <Dropdown.Menu className={`${style.maxHeightScroll}`}>
              <Dropdown.Item href="/Expense/TempDev">
                মন্দির উন্নয়ন ও সংস্কারমূলক কাজ
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/FuneralDev">
                শ্মশান উন্নয়ন ও সংস্কারমূলক কাজ
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/EmployeeSalary">
                মন্দির কার্যে সংশ্লিষ্টদের সম্মানি-বেতন-ভাতাদি
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/DailyPuja">
                দৈনিক/সাপ্তাহিক পূজা
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/Appayon">
                আপ্যায়ন সভা ও বিশেষ প্রার্থনা ভোগ ইত্যাদি খরচ
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/Prosasonik">
                প্রশাসনিক ও আইন সংক্রান্ত খরচ
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/ProcharProkashona">
                মন্দির সংশ্লিষ্ট প্রচার প্রকাশনা ও যাতায়াত বাবদ খরচাদি
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/OfficeCost">
                অফিস স্টেশনারী-খাতা-কলম
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/SebamulokDan">
                মন্দির হতে বিভিন্ন সেবামূলক, সমাজ কল্যাণ কাজ এবং দান অনুদান
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/UtilityBill">
                বিদ্যুৎ, গ্যাস, টেলিফোন ও অন্যান্য বিল
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/BibidhExpense">বিবিধ</Dropdown.Item>
              <Dropdown.Item href="/Expense/SpecialFunction">
                বিশেষ অনুষ্ঠান সমূহ
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="my-1">
            <Dropdown.Toggle id="dropdown-basic">রিপোর্ট</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href={"/Report/Payment"}> আয়</Dropdown.Item>
              <Dropdown.Item href={"/Report/Expense"}>ব্যয়</Dropdown.Item>
              <Dropdown.Item href={"/Report/Total"}>টোটাল</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
