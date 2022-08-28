import { Payment, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import commonStyles from "../../../styles/common.module.css";

const HomePayments = () => {
  const [state, setState] = useState(false);
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const [payment1, setPayment1] = useState<Payment[]>();
  const [payment, setpayment] = useState<any>({
    amount: "",
    date: "",
  });
  const id = router.query.id;
  const getData = async () => {
    setState(true);
    await axios
      .get(`localhost:3000/api/Payments/getPaymentByUser/${id}`)
      .then((res) => {
        setPayment1(res.data?.payments);
        setUser(res.data?.user);
      });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user_id = user?.user_id.toString();
    const type = "homePayment";
    const amount = payment.amount.toString();
    const newDate = new Date(payment.date);
    const date = newDate.toISOString();

    const res = await axios.post(`localhost:3000/api/Payments/homePayment`, {
      user_id,
      type,
      amount,
      date,
    });
    console.log(res);
  };
  const handleChange = (e: any) => {
    setpayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };
  const paymentSlip = async (p: any) => {
    const res = await axios.get(
      `localhost:3000/api/Payments/getPaymentByID/${p}`
    );
    console.log(res.data);
  };

  return (
    <div>
        {state ? (
          <div className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey} pt-5`}
          >
            <Container className={`${commonStyles.commonForm} pt-3`}>
            <Row>
              <Col md={5}>
                <h4>Name : {user?.name}</h4>
              </Col>
              <Col md={5}>
                <h4>Father Name: {user?.fatherName}</h4>
              </Col>
            </Row>

            <Row>
              <Col md={5}>
                <h4>Mobile : {user?.mobiile}</h4>
              </Col>
              <Col md={5}>
                <h4>NID : {user?.nid}</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>Due Month : {user?.dueMonth}</h4>
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

              {/* <form onSubmit={handleSubmit}>
                <label htmlFor="">Date</label>
                <br />
                <input type="date" name="date" onChange={handleChange} />
                <br />
                <label htmlFor="">Amount</label>
                <br />
                <input type="text" name="amount" onChange={handleChange} />
                <br />
                <button type="submit">Submit</button>
              </form> */}
            </div>
            <div>
              <h4>Payment History</h4>
              <Table striped bordered hover className='text-center mb-3'>
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
                      <td>{payment.date}</td>
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
            </Container>
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-center mt-5">
            <div className="text-center">
              <h1 className="mb-4">Want to Home Data? </h1>
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
