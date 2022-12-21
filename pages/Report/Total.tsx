import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import TotalExpense from "../../Components/TotalExpense";
import TotalIncome from "../../Components/TotalIncome";
import commonStyles from "../../styles/common.module.css";
import styles from "./total.module.css";

const TotalReport = () => {
  // ---------- states for payments start------------
  const paymentArr = [
    "ShoshanDevDaho",
    "ShoshanDevShot",
    "Dighi",
    "DanBox",
    "DanOnudan",
    "BuySell",
    "SosanSomadhi",
    "JinisPotroPrapti",
    "CommitteeChada",
    "ProkashonaProchar",
    "Bibidh",
    "Others",
    "homePayment",
    "shopPayment",
  ];
  const [shoshanDevDaho, setShoshanDevDaho] = useState({});
  const [shoshanDevShot, setShoshanDevShot] = useState({});
  const [dighi, setDighi] = useState({});
  const [danBox, setDanBox] = useState({});
  const [danOnudan, setDanOnudan] = useState({});
  const [buySell, setBuySell] = useState({});
  const [sosanSomadhi, setSosanSomadhi] = useState({});
  const [jinisPotroPrapti, setJinisPotroPrapti] = useState({});
  const [committeeChada, setCommitteeChada] = useState({});
  const [prokashonaProchar, setProkashonaProchar] = useState({});
  const [bibidh, setBibidh] = useState({});
  const [others, setOthers] = useState({});
  const [homePayment, setHomePayment] = useState({});
  const [shopPayment, setShopPayment] = useState({});

  const paymentProps = [
    homePayment,
    shopPayment,
    shoshanDevDaho,
    shoshanDevShot,
    dighi,
    danBox,
    danOnudan,
    buySell,
    sosanSomadhi,
    jinisPotroPrapti,
    committeeChada,
    prokashonaProchar,
    bibidh,
    others,
  ];
  // ---------- states for payments end ------------

  // ------------ states for expenses start -----------
  const expenseArr = [
    "TempDev",
    "FuneralDev",
    "EmployeeSalary",
    "DailyPuja",
    "Appayon",
    "Prosasonik",
    "ProcharProkashona",
    "OfficeCost",
    "SebamulokDan",
    "UtilityBill",
    "BibidhExpense",
    "SpecialFunction",
  ];

  const [tempDev, setTempDev] = useState({});
  const [funeralDev, setFuneralDev] = useState({});
  const [employeeSalary, setEmployeeSalary] = useState({});
  const [dailyPuja, setDailyPuja] = useState({});
  const [appayon, setAppayon] = useState({});
  const [prosasonik, setProsasonik] = useState({});
  const [procharProkashona, setProcharProkashona] = useState({});
  const [officeCost, setOfficeCost] = useState({});
  const [sebamulokDan, setSebamulokDan] = useState({});
  const [utilityBill, setUtilityBill] = useState({});
  const [bibidhExpense, setBibidhExpense] = useState({});
  const [specialFunction, setSpecialFunction] = useState({});

  const expenseProps = [
    tempDev,
    funeralDev,
    employeeSalary,
    dailyPuja,
    appayon,
    prosasonik,
    procharProkashona,
    officeCost,
    sebamulokDan,
    utilityBill,
    bibidhExpense,
    specialFunction,
  ];
  // ------------ states for expenses end -----------

  const [dates, setDates] = useState({
    from: "",
    to: "",
  });
  const [total, setTotal] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // all payments and expenses data
    const result = await axios
      .get(`/api/report/totalreport/${dates.from}/${dates.to}`)
      .then((res) => {
        setTotalIncome(res.data?.sumOfIncome);
        setTotalExpense(res.data?.sumOfExpense);
        setTotal(res.data?.total);
      });

    // individual payment amount with type name.
    paymentArr.forEach((typeName) => {
      axios
        .get(`/api/report/payments/${dates.from}/${dates.to}/${typeName}`)
        .then((res) => {
          if (typeName == "ShoshanDevDaho")
            setShoshanDevDaho({
              name: "শ্মশান - (দাহ সনদ)",
              amount: res.data?.total,
            });
          if (typeName == "ShoshanDevShot")
            setShoshanDevShot({
              name: "শ্মশান - (সৎকার)",
              amount: res.data?.total,
            });
          if (typeName == "Dighi")
            setDighi({ name: "দিঘী লিজ", amount: res.data?.total });
          if (typeName == "DanBox")
            setDanBox({ name: "দান-বাক্স", amount: res.data?.total });
          if (typeName == "DanOnudan")
            setDanOnudan({ name: "দান-অনুদান", amount: res.data?.total });
          if (typeName == "BuySell")
            setBuySell({
              name: "দোকান-ঘর-অন্যান্য ক্রয়-বিক্রয় বাবদ",
              amount: res.data?.total,
            });
          if (typeName == "SosanSomadhi")
            setSosanSomadhi({
              name: "শ্মশানস্থ সমাধি ও অন্যান্য",
              amount: res.data?.total,
            });
          if (typeName == "JinisPotroPrapti")
            setJinisPotroPrapti({
              name: "জিনিস পত্রাদি প্রাপ্তি",
              amount: res.data?.total,
            });
          if (typeName == "CommitteeChada")
            setCommitteeChada({
              name: "কমিটি সদস্যদের চাঁদা",
              amount: res.data?.total,
            });
          if (typeName == "ProkashonaProchar")
            setProkashonaProchar({
              name: "প্রকাশনা ও প্রচার",
              amount: res.data?.total,
            });
          if (typeName == "Bibidh")
            setBibidh({ name: "বিবিধ", amount: res.data?.total });
          if (typeName == "Others")
            setOthers({ name: "অন্যান্য প্রাপ্তি", amount: res.data?.total });
          if (typeName == "homePayment")
            setHomePayment({ name: "দোকান ভাড়া", amount: res.data?.total });
          if (typeName == "shopPayment")
            setShopPayment({ name: "ঘর ভাড়া", amount: res.data?.total });
        });
    });

    // individual expense amount with type name.
    expenseArr.forEach((typeName) => {
      axios
        .get(`/api/report/expenses/${dates.from}/${dates.to}/${typeName}`)
        .then((res) => {
          if (typeName === "TempDev")
            setTempDev({
              name: "মন্দির উন্নয়ন ও সংস্কারমূলক কাজ",
              amount: res.data?.total,
            });
          if (typeName === "FuneralDev")
            setFuneralDev({
              name: "শ্মশান উন্নয়ন ও সংস্কারমূলক কাজ",
              amount: res.data?.total,
            });
          if (typeName === "EmployeeSalary")
            setEmployeeSalary({
              name: "মন্দির কার্যে সংশ্লিষ্টদের সম্মানি-বেতন-ভাতাদি",
              amount: res.data?.total,
            });
          if (typeName === "DailyPuja")
            setDailyPuja({
              name: "দৈনিক/সাপ্তাহিক পূজা",
              amount: res.data?.total,
            });
          if (typeName === "Appayon")
            setAppayon({
              name: "আপ্যায়ন সভা ও বিশেষ প্রার্থনা ভোগ ইত্যাদি খরচ",
              amount: res.data?.total,
            });
          if (typeName === "Prosasonik")
            setProsasonik({
              name: "প্রশাসনিক ও আইন সংক্রান্ত খরচ",
              amount: res.data?.total,
            });
          if (typeName === "ProcharProkashona")
            setProcharProkashona({
              name: "মন্দির সংশ্লিষ্ট প্রচার প্রকাশনা ও যাতায়াত বাবদ খরচাদি",
              amount: res.data?.total,
            });
          if (typeName === "OfficeCost")
            setOfficeCost({
              name: "অফিস স্টেশনারী-খাতা-কলম",
              amount: res.data?.total,
            });
          if (typeName === "SebamulokDan")
            setSebamulokDan({
              name: " মন্দির হতে বিভিন্ন সেবামূলক, সমাজ কল্যাণ কাজ এবং দান অনুদান",
              amount: res.data?.total,
            });
          if (typeName === "UtilityBill")
            setUtilityBill({
              name: " বিদ্যুৎ, গ্যাস, টেলিফোন ও অন্যান্য বিল",
              amount: res.data?.total,
            });
          if (typeName === "BibidhExpense")
            setBibidhExpense({ name: "বিবিধ", amount: res.data?.total });
          if (typeName === "SpecialFunction")
            setSpecialFunction({
              name: " বিশেষ অনুষ্ঠান সমূহ",
              amount: res.data?.total,
            });
        });
    });
  };

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    const newDate = new Date(value);
    const updatedDate = newDate.toISOString();
    setDates({ ...dates, [name]: updatedDate });
  };

  return (
    <div
      className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey}`}
    >
      <Container className={`${commonStyles.commonForm} py-5`}>
        <h4 className="text-center mb-3 alert alert-primary">টোটাল হিসাব -</h4>
        <form onSubmit={handleSubmit}>
          <Row className="mb-5 text-center px-5">
            <Col ms={12} md={4}>
              <div>
                <h5>তারিখঃ কত থেকে</h5>
                <input
                  type="Date"
                  name="from"
                  onChange={handleChange}
                  required
                />
              </div>
            </Col>

            <Col ms={12} md={4}>
              <div>
                <h5>কত পর্যন্ত</h5>
                <input type="Date" name="to" onChange={handleChange} required />
              </div>
            </Col>

            <Col
              ms={12}
              md={4}
              className="d-flex justify-content-start align-items-center"
            >
              <Button type="submit" variant="warning" className="fw-bold mt-4">
                Generate
              </Button>
            </Col>
          </Row>
        </form>

        <Row className={`${styles.scroll} text-center`}>
          {/* income */}
          <Col md={6}>
            <TotalIncome
              paymentProps={paymentProps}
              totalIncome={totalIncome}
            />
          </Col>
          {/* expense */}
          <Col md={6}>
            <TotalExpense
              expenseProps={expenseProps}
              totalExpense={totalExpense}
            />
          </Col>
        </Row>

        <Row className={`${styles.border} mb-4 mt-4`}>
          <Col md={4} className="text-center">
            <h5>মোট আয়: {totalIncome.toLocaleString("bn-BD")}</h5>
          </Col>
          <Col md={4} className="text-center">
            <h5>মোট ব্যয়: {totalExpense.toLocaleString("bn-BD")}</h5>
          </Col>
          <Col md={4} className="text-center">
            <h5>নিট এমাউন্ট : {total.toLocaleString("bn-BD")}</h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default TotalReport;
