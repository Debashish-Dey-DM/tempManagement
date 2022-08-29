import { Payment } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import TotalExpense from "../../Components/TotalExpense";
import TotalIncome from "../../Components/TotalIncome";
import commonStyles from "../../styles/common.module.css";
import styles from "./total.module.css";

const TotalReport = () => {
  const [dates, setDates] = useState({
    from: "",
    to: "",
  });
  const [total, setTotal] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenses, setExpenses] = useState<Payment[]>();
  const [payments, setPayments] = useState<Payment[]>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = await axios
      .get(`http://localhost:3000/api/report/totalreport/${dates.from}/${dates.to}`)
      .then((res) => {
        setExpenses(res.data?.expenses);
        setPayments(res.data?.payments);
        setTotalIncome(res.data?.sumOfIncome);
        setTotalExpense(res.data?.sumOfExpense);
        setTotal(res.data?.total);
        console.log(res.data);
      });
  };
  const test = async (e: any) => {
    e.preventDefault();
    console.log(dates);
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
            <TotalIncome payments={payments}/>
          </Col>
          {/* expense */}
          <Col md={6}>
            <TotalExpense expenses={expenses} />
          </Col>
        </Row>

        <Row className={`${styles.border} mb-4`}>
          <Col md={6} className="text-center">
            <h5>মোট আয়: {totalIncome}</h5>
          </Col>
          <Col md={6} className="text-center">
            {" "}
            <h5>মোট ব্যয়: {totalExpense}</h5>
          </Col>
        </Row>

        <h5>নিট এমাউন্ট : {total}</h5>
      </Container>
    </div>
  );
};
export default TotalReport;
