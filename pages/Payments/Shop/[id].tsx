import { Payment, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import commonStyles from "../../../styles/common.module.css";

const HomePayments = () => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  let numberToBengliWords = require("number-to-bengli-words"); //for converting to bangla words
  // to get single payment date
  const [singlePayment, setSinglePayment] = useState({});
  const [state, setState] = useState(false);
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const [payment1, setPayment1] = useState<Payment[]>();
  const [dueMonth, setDueMonth] = useState("");
  const [payment, setpayment] = useState<any>({
    amount: "",
    date: "",
  });
  const id = router.query.id;
  const getData = async () => {
    setState(true);
    await axios
      .get(`http://localhost:3000/api/Payments/getPaymentByUser/${id}`)
      .then((res) => {
        setPayment1(res.data?.payments);
        setUser(res.data?.user);
      });
    await axios
      .get(`http://localhost:3000/api/Payments/lastPaymentById/${id}`)
      .then((res) => {
        // setDueMonth(res.data);
        // console.log(res.data);
      });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user_id = user?.user_id.toString();
    const type = "shopPayment";
    const amount = payment.amount.toString();
    const newDate = new Date(payment.date);
    const date = newDate.toISOString();

    const res = await axios.post(
      `http://localhost:3000/api/Payments/homePayment`,
      {
        user_id,
        type,
        amount,
        date,
      }
    );
    router.reload();
  };
  const handleChange = (e: any) => {
    setpayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };
  const paymentSlip = async (p: any) => {
    const res = await axios.get(
      `http://localhost:3000/api/Payments/getPaymentByID/${p}`
    );
    // console.log(res.data);
    setSinglePayment(res.data); // to get single payment date
    handlePrint();
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
                <h6>Name : {user?.name}</h6>
              </Col>
              <Col md={5}>
                <h6>Father Name: {user?.fatherName}</h6>
              </Col>
            </Row>

            <Row>
              <Col md={5}>
                <h6>Mobile : {user?.mobiile}</h6>
              </Col>
              <Col md={5}>
                <h6>NID : {user?.nid}</h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6>Due Month : {dueMonth}</h6>
              </Col>
            </Row>
            <hr />
            <div>
              <Button onClick={getData}>Test</Button>

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
                      type="text"
                      name="amount"
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
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {payment1?.map((payment: any) => (
                    <tr key={payment.id}>
                      <td>{new Date(payment.date).toLocaleDateString()}</td>
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

            {singlePayment && (
              <div  style={{ display: "none" }}>
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
                    <h5>নামঃ {user?.name}</h5>
                    <h5>মোবাইলঃ {user?.mobiile}</h5>
                    <h5>সাকিনঃ কালিবাড়ি</h5>
                  </div>

                  <div>
                    <h5>পিতার নামঃ {user?.fatherName}</h5>
                    <h5>দোকান নংঃ {id}</h5>
                    <h5>
                      তারিখঃ 
                       {new Date(singlePayment.date).toLocaleDateString("bn-BD")}
                    </h5>
                  </div>
                </div>
                <hr />
                {/* official talk  */}
                <div className="mt-3 lh-lg">
                  20____ সনের ____________ হইতে _____________ পর্যন্ত মাসের
                  ভাড়া, মাসিক ভাড়ার পরিমান ___________ মোট আদায় কৃত ভাড়ার পরিমান_
                  <span className="fw-bold text-decoration-underline">
                    {singlePayment.amount
                      ? singlePayment.amount.toLocaleString("bn-BD")
                      : ""}
                    টাকা_ 
                  </span>
                  (কথায়) 
                  <span className="fw-bold text-decoration-underline">
                     _{numberToBengliWords.toBengaliWords(
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
                    <small>Printed by: Pankaj Kar</small>
                    <span className="border-top border-dark">
                      কোষাধক্ষ্য/মনোনিত আদায়কারী
                    </span>
                  </div>
                </div>
                <hr className="border-top border-5 border-warning"/>

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
                    <h5>নামঃ {user?.name}</h5>
                    <h5>মোবাইলঃ {user?.mobiile}</h5>
                    <h5>সাকিন: কালিবাড়ি</h5>
                  </div>

                  <div>
                    <h5>পিতার নামঃ {user?.fatherName}</h5>
                    <h5>দোকান নংঃ {id}</h5>
                    <h5>
                      তারিখ:
                      {new Date(singlePayment.date).toLocaleDateString("bn-BD")}
                    </h5>
                  </div>
                </div>
                <hr />
                {/* official talk  */}
                <div className="mt-3 lh-lg">
                  20____ সনের ____________ হইতে _____________ পর্যন্ত মাসের
                  ভাড়া, মাসিক ভাড়ার পরিমান ___________ মোট আদায় কৃত ভাড়ার পরিমান_
                  <span className="fw-bold text-decoration-underline">
                    {singlePayment.amount
                      ? singlePayment.amount.toLocaleString("bn-BD")
                      : ""}
                    টাকা_ 
                  </span>
                  (কথায়) 
                  <span className="fw-bold text-decoration-underline">
                     _{numberToBengliWords.toBengaliWords(
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
                    <small>Printed by: Pankaj Kar</small>
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
            <h1 className="mb-4">Want Shop Data? </h1>
            <Button onClick={getData} className="me-2" variant="success">
              Yes
            </Button>
            <Button variant="danger" onClick={() => router.back()}>
              {/* on click function should be change to another route */}
              No
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default HomePayments;
