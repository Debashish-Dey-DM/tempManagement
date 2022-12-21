import { Payment, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import commonStyles from "../../../styles/common.module.css";
const CryptoJS = require("crypto-js");

const HomePayments = () => {
  const [adminName, setAdminName] = useState(); // admin name
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  let numberToBengliWords = require("number-to-bengli-words"); //for converting to bangla words
  // to get single payment date
  const [singlePayment, setSinglePayment] = useState({});
  // rent - for "rent per month"
  const [rent, setRent] = useState(0);

  // for session storage and showing rent per month in UI
  useEffect(() => {
    const rate_per_month = sessionStorage.getItem("rate_per_month");
    rate_per_month ? setRent(Number(rate_per_month)) : setRent(0);
    // for setting admin name
    const nm = localStorage.getItem("ngaLan");
    let bytes = CryptoJS.AES.decrypt(nm, "my-secret-key@123");
    let nms = bytes.toString(CryptoJS.enc.Utf8);
    setAdminName(nms);
  }, [rent]);

  const [clearUpto, setClearUpto] = useState("");
  const [state, setState] = useState(false);
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const [payment1, setPayment1] = useState<Payment[]>();
  const [shopID, setShopID] = useState();
  const [payment, setpayment] = useState<any>({
    amount: "",
    date: "",
  });
  const id = router.query.id;
  const getData = async () => {
    setState(true);
    await axios.get(`/api/Payments/getPaymentByUser/${id}`).then((res) => {
      setShopID(res.data.user.shopId);
      setPayment1(res.data?.payments);
      setUser(res.data?.user);
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user_id = user?.user_id.toString();
    const type = "shopPayment";
    const amount = payment.amount.toString();
    const newDate = new Date(payment.date);
    const date = newDate.toISOString();

    const edtRes = await axios.post(`/api/user/updateUser`, {
      userId: user && user.user_id,
      name: user && user.name,
      fatherName: user && user.fatherName,
      nid: user && user.nid,
      mobile: user && user.mobiile,
      clearUpto: clearUpto,
    });

    const res = await axios
      .post(`/api/Payments/homePayment`, {
        user_id,
        type,
        amount,
        date,
      })
      .then((res) => {
        paymentSlip(res.data.id);
        setTimeout(() => location.reload(), 3000);
      });
  };
  const handleChange = (e: any) => {
    if (e.target.name === "clearupto") {
      setClearUpto(e.target.value);
    } else {
      setpayment({
        ...payment,
        [e.target.name]: e.target.value,
      });
    }
  };
  const paymentSlip = async (p: any) => {
    const res = await axios.get(`/api/Payments/getPaymentByID/${p}`);
    setSinglePayment(res.data); // to get single payment date
    handlePrint();
  };

  const dateFormatters = (e: any) => {
    const d = new Date(e);
    const dt = d.getDate();
    const mnth = d.getMonth() + 1;
    const yr = d.getFullYear();
    const date = `${dt}/${mnth}/${yr}`;
    return date;
  };

  return (
    <div className="pb-5">
      {state ? (
        <div
          className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey} pt-5`}
        >
          <Container className={`${commonStyles.commonForm} pt-3`}>
            <Row>
              <Col md={5}>
                <h6>নাম : {user?.name}</h6>
              </Col>
              <Col md={5}>
                <h6>বাবার নাম : {user?.fatherName}</h6>
              </Col>
            </Row>

            <Row>
              <Col md={5}>
                <h6>মোবাইল : {user?.mobiile}</h6>
              </Col>
              <Col md={5}>
                <h6>জাতীয় পরিচয়পত্র : {user?.nid}</h6>
              </Col>
            </Row>
            <Row>
              <Col md={5}>
                <h6>
                  পরিশোধ :{" "}
                  {new Date(user?.clearUpto).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  পর্যন্ত
                </h6>
              </Col>
              <Col md={5}>
                <h6>মাসিক ভাড়া : {rent}</h6>
              </Col>
            </Row>
            <hr />
            <div>
              <Form className="py-4" onSubmit={handleSubmit}>
                <Row>
                  <Col md={3}>
                    <label className="ms-3">তারিখ (Date)</label>
                    <Form.Control
                      type="date"
                      name="date"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={3}>
                    <label className="ms-3">পরিমান (Amount)</label>
                    <Form.Control
                      type="number"
                      name="amount"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={3}>
                    <label className="ms-3">পরিশোধ (clear up to)</label>
                    <Form.Control
                      type="month"
                      name="clearupto"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={3} className="mt-4">
                    <Button type="submit">Submit</Button>
                  </Col>
                </Row>
              </Form>
            </div>

            <div>
              <h6>Payment History</h6>
              <Table striped bordered hover className="text-center mb-3">
                <thead>
                  <tr>
                    <th>
                      তারিখ <small className="fw-lighter">(dd-mm-yyyy)</small>
                    </th>
                    <th>পরিমান</th>
                    <th>রিসিট</th>
                  </tr>
                </thead>
                <tbody>
                  {payment1?.map((payment: any) => (
                    <tr key={payment.id}>
                      <td>{dateFormatters(payment.date)}</td>
                      <td>{payment.amount}</td>
                      <td>
                        <Button onClick={() => paymentSlip(payment.id)}>
                          Check
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* ==== printing recite ===== */}

            {singlePayment && (
              <div style={{ display: "none" }}>
                <div className="printArea py-3 px-5" ref={componentRef}>
                  <span>গ্রাহক কপি</span>
                  <div className="text-center mb-2 bg-light">
                    <h6>শ্রী শ্রী বরদেস্বরী কালিমাতা বিগ্রহ</h6>
                    <p className="mb-1">
                      সাকিনঃ রাজারবাগ, পোঃ বাসাবো, থানাঃ সবুজবাগ, ঢাকা-১২১৪
                    </p>
                    <p>
                      পক্ষেঃ শ্রী শ্রী বরদেশ্বরী কালিমাতা মন্দির ও শ্মশান কমিটি
                    </p>
                  </div>
                  <hr />
                  <br />
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6>নামঃ {user?.name}</h6>
                      <h6>মোবাইলঃ {user?.mobiile}</h6>
                      <h6>সাকিনঃ কালিবাড়ি</h6>
                    </div>

                    <div>
                      <h6>পিতার নামঃ {user?.fatherName}</h6>
                      <h6>
                        দোকান নংঃ {shopID && shopID.toLocaleString("bn-BD")}
                      </h6>
                      <h6>
                        তারিখঃ
                        {new Date(singlePayment.date).toLocaleDateString(
                          "bn-BD"
                        )}
                      </h6>
                    </div>
                  </div>
                  <hr />
                  {/* official talk  */}
                  <div className="mt-3 lh-lg">
                    ২০____ সনের ____________ হইতে _____________ পর্যন্ত মাসের
                    ভাড়া, মাসিক ভাড়ার পরিমান{" "}
                    <span className="fw-bold text-decoration-underline">
                      {rent ? rent.toLocaleString("bn-BD") : ""} টাকা_
                    </span>{" "}
                    মোট আদায় কৃত ভাড়ার পরিমান_
                    <span className="fw-bold text-decoration-underline">
                      {singlePayment.amount
                        ? singlePayment.amount.toLocaleString("bn-BD")
                        : ""}{" "}
                      টাকা_
                    </span>
                    (কথায়)
                    <span className="fw-bold text-decoration-underline">
                      _
                      {numberToBengliWords.toBengaliWords(
                        singlePayment.amount ? singlePayment.amount : 0
                      )}
                      -টাকা
                    </span>
                    _মালিক পক্ষ ভাড়া বুঝিয়া পাইলাম।
                    <br />
                    <p className="text-end">বিগ্রহের পক্ষে ভাড়া আদায়কারী</p>
                    <br /> <br />
                    <div className="d-flex justify-content-between">
                      <span className="border-top border-dark">
                        ভাড়াটিয়ার স্বাক্ষর
                      </span>
                      <small>Printed by: {adminName}</small>
                      <span className="border-top border-dark">
                        কোষাধক্ষ্য/মনোনিত আদায়কারী
                      </span>
                    </div>
                  </div>
                  <hr className="border-top border-5 border-warning" />

                  {/* office copy */}

                  <span>অফিস কপি</span>
                  <div className="text-center mb-2 bg-light">
                    <h6>শ্রী শ্রী বরদেস্বরী কালিমাতা বিগ্রহ</h6>
                    <p className="mb-1">
                      সাকিনঃ রাজারবাগ, পোঃ বাসাবো, থানাঃ সবুজবাগ, ঢাকা-১২১৪
                    </p>
                    <p>
                      পক্ষেঃ শ্রী শ্রী বরদেশ্বরী কালিমাতা মন্দির ও শ্মশান কমিটি
                    </p>
                  </div>
                  <hr />
                  <br />
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6>নামঃ {user?.name}</h6>
                      <h6>মোবাইলঃ {user?.mobiile}</h6>
                      <h6>সাকিন: কালিবাড়ি</h6>
                    </div>

                    <div>
                      <h6>পিতার নামঃ {user?.fatherName}</h6>
                      <h6>
                        দোকান নংঃ {shopID && shopID.toLocaleString("bn-BD")}
                      </h6>
                      <h6>
                        তারিখ:
                        {new Date(singlePayment.date).toLocaleDateString(
                          "bn-BD"
                        )}
                      </h6>
                    </div>
                  </div>
                  <hr />
                  {/* official talk  */}
                  <div className="mt-3 lh-lg">
                    ২০____ সনের ____________ হইতে _____________ পর্যন্ত মাসের
                    ভাড়া, মাসিক ভাড়ার পরিমান{" "}
                    <span className="fw-bold text-decoration-underline">
                      {rent ? rent.toLocaleString("bn-BD") : ""} টাকা_
                    </span>{" "}
                    মোট আদায় কৃত ভাড়ার পরিমান_
                    <span className="fw-bold text-decoration-underline">
                      {singlePayment.amount
                        ? singlePayment.amount.toLocaleString("bn-BD")
                        : ""}
                      টাকা_
                    </span>
                    (কথায়)
                    <span className="fw-bold text-decoration-underline">
                      _
                      {numberToBengliWords.toBengaliWords(
                        singlePayment.amount ? singlePayment.amount : 0
                      )}
                      -টাকা
                    </span>
                    _মালিক পক্ষ ভাড়া বুঝিয়া পাইলাম।
                    <br />
                    <p className="text-end">বিগ্রহের পক্ষে ভাড়া আদায়কারী</p>
                    <br />
                    <div className="d-flex justify-content-between">
                      <span className="border-top border-dark">
                        ভাড়াটিয়ার স্বাক্ষর
                      </span>
                      <small>Printed by: {adminName}</small>
                      <span className="border-top border-dark">
                        কোষাধক্ষ্য/মনোনিত আদায়কারী
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <div className="text-center">
            <h1 className="mb-4">তথ্য পেতে চান?</h1>
            <Button onClick={getData} className="me-2" variant="success">
              হ্যা
            </Button>
            <Button variant="danger" onClick={() => router.back()}>
              {/* on click function should be change to another route */}
              না
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default HomePayments;
