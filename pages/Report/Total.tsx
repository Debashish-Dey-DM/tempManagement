import { Payment } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
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
      .get(
        `http://localhost:3000/api/report/totalreport/${dates.from}/${dates.to}`
      )
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
        <h3 className="text-center mb-3">টোটাল হিসাব -</h3>
        <form onSubmit={handleSubmit}>
          <Row className="mb-5 text-center">
            <Col ms={12} md={6} className="mx-auto my-4">
              <div className="">
                <h5>তারিখঃ কত থেকে</h5>
                <input
                  type="Date"
                  name="from"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-3">
                <h5>কত পর্যন্ত</h5>
                <input type="Date" name="to" onChange={handleChange} required />
              </div>
            </Col>

            <Col ms={12} md={12} className='me-0 justify-content-center' >
              <h5>
                <Button
                  type="submit"
                  variant="warning"
                  className="fw-bold"
                >
                  Generate
                </Button>
              </h5>
            </Col>
          </Row>
        </form>

        <Row className={`${styles.scroll} text-center`}>
          {/* income */}
          <Col md={6}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Type</th>
                </tr>
              </thead>
              <tbody>
                {payments?.map((p, i) => {
                  return (
                    <tr key={i}>
                      <td>{p?.date}</td>
                      <td>{p?.amount}</td>
                      <td>{p?.type}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
          {/* expense */}
          <Col md={6}>
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
                      <td>{p?.date}</td>
                      <td>{p?.amount}</td>
                      <td>{p?.type}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
        </Row>

        <Row className={`${styles.border} mb-4`}>
          <Col md={6} className='text-center'>
            <h5>মোট আয়: {totalIncome}</h5>
          </Col>
          <Col md={6} className='text-center'>
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
