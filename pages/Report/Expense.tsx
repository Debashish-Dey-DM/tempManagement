import { Payment } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import commonStyles from "../../styles/common.module.css";
const Payment = () => {
  const [dates, setDates] = useState({
    from: "",
    to: "",
  });
  const [type, setType] = useState("");
  const [total, setTotal] = useState(0);
  const [expenses, setExpenses] = useState<Payment[]>();
  const [show, setShow] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setShow(true);

    const result = await axios
      .get(
        `localhost:3000/api/report/expenses/${dates.from}/${dates.to}/${type}`
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
                <option value="TempDev">TempDev</option>
                <option value="newCategory">newCategory</option>
                <option value="newCategory">newCategory</option>
                <option value="newCategory">newCategory</option>
                <option value="newCategory">newCategory</option>
                <option value="newCategory">newCategory</option>
                <option value="newCategory">newCategory</option>
                <option value="newCategory">newCategory</option>
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
                      <td>{p?.amount}</td>
                      <td>{p?.type}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <h4>Total: {total}</h4>
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
