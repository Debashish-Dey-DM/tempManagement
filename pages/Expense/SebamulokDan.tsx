import { Payment } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import commonStyles from "../../styles/common.module.css";
import styles from "../Payments/ShoshanDevDaho.module.css";

const SebamulokDan = () => {
  const [payment, setPayment] = useState<Payment[]>();
  const [totalAmount, setTotalAmount] = useState(0);
  const [pay, setPay] = useState({
    type: "SebamulokDan",
    date: "",
    amount: "",
  });
    const mount = async () => {
    await axios
      .get("http://localhost:3000/api/Expenses/getPayments/SebamulokDan")
      .then((res) => {
        //   console.log(res.data[3]?.date.toLocaleDateString("en-US"));
        //   var today = new Date(res.data[3]?.date);

        console.log(new Date(res.data[3]?.date).toLocaleDateString("en-US"));
        setPayment(res.data);
        let arr: number[] = [];
        res.data?.map((item: Payment) => {
          arr.push(item.amount);
        });
        const sum = arr.reduce((a, b) => a + b, 0);
        setTotalAmount(sum);
      });
  };
  useEffect(() => {
    mount();
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = await axios
      .post("http://localhost:3000/api/Expenses/createExpense", { pay })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    mount();
  };
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "date") {
      const newDate = new Date(value);
      const updatedDate = newDate.toISOString();
      setPay({ ...pay, [name]: updatedDate });
    } else {
      setPay({ ...pay, [name]: value });
    }
  };
 return (
    <div
      className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey}`}
    >
      <Container
        className={`${commonStyles.commonForm} ${styles.minHeight35} py-3`}
      >
        <h3 className="mb-4 alert alert-primary">মন্দির হতে বিভিন্ন সেবামূলক, সমাজ কল্যাণ কাজ এবং দান অনুদান</h3>
        <Row className="row">
          <div className="col-lg-5 col-md-12">
            <form onSubmit={handleSubmit} className="w-50 ">
              <div>
                {/* myCode */}
                <h6>পরিমাণ</h6>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    placeholder="Amount"
                    name="amount"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <h6>তারিখ</h6>
                <div className="input-group mb-3">
                  <input
                    type="Date"
                    placeholder="Dates"
                    name="date"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                {/* myCode */}
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
          {/* table data  */}
          <div className={`col-lg-7 col-md-12 ${styles.tblData}`}>
            <table className="table">
              <thead>
                <tr>
                  <th>তারিখ</th>
                  <th>পরিমাণ</th>
                </tr>
              </thead>
              <tbody>
                {payment?.map((p, i) => {
                  return (
                    <tr key={i}>
                      <td>{new Date(p.date).toLocaleDateString("bn-BD")}</td>
                      <td>{p.amount}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td>
                    <h6>
                      <strong>মোট</strong>
                    </h6>
                  </td>
                  <td>
                    {" "}
                    <strong>{totalAmount}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Row>
      </Container>
    </div>
  );
};
export default SebamulokDan;
