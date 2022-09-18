import { Payment } from "@prisma/client";
import axios from "axios";
import { useState, useRef } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import commonStyles from "../../styles/common.module.css";
const Payment = () => {
  const [dates, setDates] = useState({
    from: "",
    to: "",
  });
  const [type, setType] = useState("");
  const [total, setTotal] = useState(0);
  const [payments, setPayments] = useState<Payment[]>();
  const [show, setShow] = useState(false);
  console.log("show : ", show);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setShow(true);

    const result = await axios
      .get(
        `http://localhost:3000/api/report/payments/${dates.from}/${dates.to}/${type}`
      )
      .then((res) => {
        setPayments(res.data?.payments);
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
                <option value="ShoshanDevDaho">শ্মশান উন্নয়ন (দাহ সনদ)</option>
                <option value="ShoshanDevShot">শ্মশান উন্নয়ন (সৎকার)</option>
                <option>দোকান ভাড়া</option>
                <option>আবাসন ঘর ভাড়া</option>
                <option>দিঘী লিজ বাবদ</option>
                <option>মন্দির দান বাক্স হতে</option>
                <option>সরকারি-বেসরকারি দান-অনুদান</option>
                <option>দোকান-ঘর-অন্যান্য ক্রয়-বিক্রয় বাবদ</option>
                <option>শ্মশানস্থ সমাধি ও অন্যান্য </option>
                <option>জিনিস পত্রাদি প্রাপ্তি </option>
                <option>
                  কমিটির কার্যনির্বাহী সদস্যদের চাঁদা (মাসিক ভিত্তিতে)
                </option>
                <option>স্যুভেনির, প্রকাশনা, স্মারক ও প্রচার</option>
                <option>বিবিধ</option>
                <option>
                  অন্যান্য প্রাপ্তি (বিবাহ-শ্রাদ্ধাদি-ঘাটকাজ-নিয়মিত ভক্তের
                  অনুদান)
                </option>
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
            <h4>Type: {type}</h4>
            <ReactToPrint
              trigger={() => <Button variant="secondary">Print income</Button>}
              content={() => componentRef.current}
              documentTitle={`আয়ের রিপোর্ট - ${type}`}
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
                {payments?.map((p, i) => {
                  return (
                    <tr key={i}>
                      <td>{new Date(p.date).toLocaleDateString("bn-BD")}</td>
                      <td>{p?.amount}</td>
                      <td>{p?.type}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <h4>Total: {total}</h4>

            {/* printing purposes */}
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
                {payments?.map((p, i) => {
                  return (
                    <tr key={i}>
                      <td>{new Date(p.date).toLocaleDateString("bn-BD")}</td>
                      <td>{p?.amount}</td>
                      <td>{p?.type}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
                <h4>Total: {total}</h4>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};
export default Payment;
