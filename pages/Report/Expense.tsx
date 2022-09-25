import { Payment } from "@prisma/client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import commonStyles from "../../styles/common.module.css";
const Payment = () => {
  const [dates, setDates] = useState({
    from: "",
    to: "",
  });
  const [type, setType] = useState("");
  const [banglaType, setBanglaType] = useState("") // for printing bangla type
  const [total, setTotal] = useState(0);
  const [expenses, setExpenses] = useState<Payment[]>();
  const [show, setShow] = useState(false);
  console.log('******ex type : ',type);
  console.log('******bangla : ', banglaType);

  useEffect(() =>{
    if(type !==""){
      if(type === "TempDev"){
        setBanglaType("মন্দির উন্নয়ন")
      }
      if(type === "FuneralDev"){
        setBanglaType("শ্মশান উন্নয়ন")
      }
      if(type === "EmployeeSalary"){
        setBanglaType("সম্মানি-বেতন-ভাতাদি")
      }
      if(type === "DailyPuja"){
        setBanglaType("দৈনিক/সাপ্তাহিক পূজা ভাড়া")
      }
      if(type === "Appayon"){
        setBanglaType(" আপ্যায়ন সভা ও বিশেষ প্রার্থনা")
      }
      if(type === "Prosasonik"){
        setBanglaType("প্রশাসনিক ও আইন")
      }
      if(type === "ProcharProkashona"){
        setBanglaType("প্রচার প্রকাশনা ও যাতায়াত")
      }
      if(type === "OfficeCost"){
        setBanglaType("অফিস স্টেশনারী")
      }
      if(type === "SebamulokDan"){
        setBanglaType("সমাজ কল্যাণ কাজ এবং দান অনুদান")
      }
      if(type === "UtilityBill"){
        setBanglaType("বিদ্যুৎ, গ্যাস, টেলিফোন")
      }
      if(type === "BibidhExpense"){
        setBanglaType("বিবিধ")
      }
      if(type === "SpecialFunction"){
        setBanglaType("বিশেষ অনুষ্ঠান")
      }
    }
  },[type])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setShow(true);

    const result = await axios
      .get(
        `http://localhost:3000/api/report/expenses/${dates.from}/${dates.to}/${type}`
      )
      .then((res) => {
        setExpenses(res.data?.payments);
        setTotal(res.data?.total);
        console.log(res.data);
      });
  };
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    const newDate = new Date(value);
    const updatedDate = newDate.toISOString();
    setDates({ ...dates, [name]: updatedDate });
  };

  // for printing
  const componentRef = useRef(null);

  return (
    <div
      className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey}`}
    >
      <Container className={`${commonStyles.commonForm} py-5`}>
        <form onSubmit={handleSubmit}>
          <Row className="mb-5">
            <Col md={3}>
              <h5>রিপোর্টের ধরণ</h5>
              <select
                required
                name="category"
                onClick={(e: any) => setType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="TempDev">মন্দির উন্নয়ন ও সংস্কারমূলক কাজ</option>
                <option value="FuneralDev">শ্মশান উন্নয়ন ও সংস্কারমূলক কাজ</option>
                <option value="EmployeeSalary">
                  মন্দির কার্যে সংশ্লিষ্টদের সম্মানি-বেতন-ভাতাদি
                </option>
                <option value="DailyPuja">দৈনিক/সাপ্তাহিক পূজা</option>
                <option value="Appayon">
                  আপ্যায়ন সভা ও বিশেষ প্রার্থনা ভোগ ইত্যাদি খরচ
                </option>
                <option value="Prosasonik">প্রশাসনিক ও আইন সংক্রান্ত খরচ</option>
                <option value="ProcharProkashona">
                  মন্দির সংশ্লিষ্ট প্রচার প্রকাশনা ও যাতায়াত বাবদ খরচাদি
                </option>
                <option value="OfficeCost">অফিস স্টেশনারী-খাতা-কলম</option>
                <option value="SebamulokDan">
                  মন্দির হতে বিভিন্ন সেবামূলক, সমাজ কল্যাণ কাজ এবং দান অনুদান
                </option>
                <option value="UtilityBill">বিদ্যুৎ, গ্যাস, টেলিফোন ও অন্যান্য বিল</option>
                <option value="BibidhExpense">বিবিধ</option>
                <option value="SpecialFunction">বিশেষ অনুষ্ঠান সমূহ</option>
              </select>
            </Col>

            <Col md={5} className="d-flex ms-4">
              <div className="mx-3">
                <h5>তারিখঃ কত থেকে</h5>
                <input
                  type="Date"
                  name="from"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mx-3">
                <h5>কত পর্যন্ত</h5>
                <input type="Date" name="to" onChange={handleChange} required />
              </div>
            </Col>

            <Col md={2}>
              <h5>
                <Button
                  type="submit"
                  variant="warning"
                  className="fw-bold mt-4"
                >
                  Generate
                </Button>
              </h5>
            </Col>
          </Row>

          <div className={`${show ? "d-block" : "d-none"}`}>
            <h4>Type: {banglaType}</h4>
            <ReactToPrint
              trigger={() => <Button variant="secondary">Print income</Button>}
              content={() => componentRef.current}
              documentTitle={`ব্যায়ের রিপোর্ট - ${banglaType}`}
              pageStyle="print"
            />
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Type</th>
                </tr>
              </thead>
              <tbody>
                {expenses?.map((p, i) => {
                  return (
                    <tr key={i}>
                      <td>{new Date(p.date).toLocaleDateString("bn-BD")}</td>
                      <td>{p?.amount.toLocaleString("bn-BD")}</td>
                      <td>{banglaType}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <h5>Total: {total.toLocaleString("bn-BD")} টাকা</h5>

            {/* for printing purpose */}

            <div style={{ display: "none" }}>
              <div ref={componentRef}>
                <h3 className='mt-3 text-center'>শ্রী শ্রী বরদেস্বরী কালি মাতা মন্দির</h3>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses?.map((p, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            {new Date(p.date).toLocaleDateString("bn-BD")}
                          </td>
                          <td>{p?.amount.toLocaleString("bn-BD")}</td>
                          <td>{banglaType}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <h6>Total: {total.toLocaleString("bn-BD")} টাকা</h6>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};
export default Payment;

{
  /* <option value="TempDev">TempDev</option> */
}
