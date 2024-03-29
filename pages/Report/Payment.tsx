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
  const [banglaType, setBanglaType] = useState("");
  const [total, setTotal] = useState(0);
  const [payments, setPayments] = useState<Payment[]>();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (type !== "") {
      if (type === "ShoshanDevDaho") {
        setBanglaType("শ্মশান - দাহ সনদ");
      }
      if (type === "ShoshanDevShot") {
        setBanglaType("শ্মশান - সৎকার");
      }
      if (type === "shopRent") {
        setBanglaType("দোকান ভাড়া");
      }
      if (type === "homeRent") {
        setBanglaType("ঘর ভাড়া");
      }
      if (type === "Dighi") {
        setBanglaType("দিঘী লিজ");
      }
      if (type === "DanBox") {
        setBanglaType("মন্দির দান বাক্স");
      }
      if (type === "DanOnudan") {
        setBanglaType("সরকারি-বেসরকারি দান-অনুদান");
      }
      if (type === "buySell") {
        setBanglaType("ক্রয়-বিক্রয় বাবদ");
      }
      if (type === "SosanSomadhi") {
        setBanglaType("শ্মশানস্থ সমাধি ও অন্যান্য");
      }
      if (type === "JinisPotroPrapti") {
        setBanglaType("জিনিস পত্রাদি প্রাপ্ত");
      }
      if (type === "CommitteeChada") {
        setBanglaType("কমিটির কার্যনির্বাহী সদস্যদের চাঁদা");
      }
      if (type === "ProkashonaProchar") {
        setBanglaType("স্যুভেনির, প্রকাশনা, স্মারক ও প্রচার");
      }
      if (type === "Bibidh") {
        setBanglaType("বিবিধ");
      }
      if (type === "Others") {
        setBanglaType("অন্যান্য প্রাপ্তি");
      }
    }
  }, [type]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setShow(true);

    const result = await axios
      .get(`/api/report/payments/${dates.from}/${dates.to}/${type}`)
      .then((res) => {
        setPayments(res.data?.payments);
        setTotal(res.data?.total);
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
                <option value="shopRent">দোকান ভাড়া</option>
                <option value="homeRent">আবাসন ঘর ভাড়া</option>
                <option value="Dighi">দিঘী লিজ বাবদ</option>
                <option value="DanBox">মন্দির দান বাক্স হতে</option>
                <option value="DanOnudan">সরকারি-বেসরকারি দান-অনুদান</option>
                <option value="buySell">
                  দোকান-ঘর-অন্যান্য ক্রয়-বিক্রয় বাবদ
                </option>
                <option value="SosanSomadhi">
                  শ্মশানস্থ সমাধি ও অন্যান্য{" "}
                </option>
                <option value="JinisPotroPrapti">
                  জিনিস পত্রাদি প্রাপ্তি{" "}
                </option>
                <option value="CommitteeChada">
                  কমিটির কার্যনির্বাহী সদস্যদের চাঁদা (মাসিক ভিত্তিতে)
                </option>
                <option value="ProkashonaProchar">
                  স্যুভেনির, প্রকাশনা, স্মারক ও প্রচার
                </option>
                <option value="Bibidh">বিবিধ</option>
                <option value="Others">
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
            <h4>Type: {banglaType}</h4>
            <ReactToPrint
              trigger={() => <Button variant="secondary">Print income</Button>}
              content={() => componentRef.current}
              documentTitle={`আয়ের রিপোর্ট - ${type}`}
              pageStyle="print"
            />
            <table className="table table-striped mt-3 ">
              <thead>
                <tr>
                  <th scope="col">তারিখ</th>
                  <th scope="col">পরিমাণ</th>
                  <th scope="col">আয়ের ধরন </th>
                </tr>
              </thead>
              <tbody>
                {payments?.map((p, i) => {
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

            <h4>Total: {total.toLocaleString("bn-BD")}</h4>

            {/* printing purposes */}
            <div style={{ display: "none" }}>
              <div ref={componentRef}>
                <h3 className="mt-3 text-center">
                  শ্রী শ্রী বরদেস্বরী কালি মাতা মন্দির
                </h3>
                <table className="table table-striped mt-3 ">
                  <thead>
                    <tr>
                      <th scope="col">তারিখ</th>
                      <th scope="col">পরিমাণ</th>
                      <th scope="col">আয়ের ধরন </th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments?.map((p, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            {new Date(p.date).toLocaleDateString("bn-BD")}
                          </td>
                          <td>{(p?.amount).toLocaleString("bn-BD")}</td>
                          <td>{banglaType}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <h4>Total: {total.toLocaleString("bn-BD")}</h4>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};
export default Payment;
