import { Payment } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import commonStyles from "../../styles/common.module.css";
import dtStyle from "./sosan.module.css";

const ShoshanDevDaho = () => {
  const [payment, setPayment] = useState<Payment[]>();
  console.log(payment);
  const [totalAmount, setTotalAmount] = useState(0);
  const [pay, setPay] = useState({
    type: "ShoshanDevDaho",
    name: "",
    fatherName: "",
    motherName: "",
    address: "",
    reference: "",
    relation: "",
    amount: "",
    shoshanType: "Daho",
    date: "",
  });

  const router = useRouter();

  // for table amd pagination
  const columns = [
    {
      name: "তারিখ",
      selector: (row: any) => new Date(row.date).toLocaleDateString("en-us", {day:"numeric", year:"numeric", month:"short"}),
      sortable: true,
    },
    {
      name: "পরিমান",
      selector: (row: any) => row.amount,
    },
  ];
  const customStyles = {
    rows: {
        style: {
             fontSize: '15px'
        },
    },
    headCells: {
        style: {
            fontWeight: "bold",
            fontSize: "15px"
        },
    }
};

  const mount = async () => {
    await axios
      .get("http://localhost:3000/api/Payments/getPayments/ShoshanDevDaho")
      .then((res) => {

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
    //need to change database acording to scn sht
    e.preventDefault();

    const result = await axios
      .post("http://localhost:3000/api/Payments/createShoshanPayment", {
        pay,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
  const test = () => {
    let arr: number[] = [];
    payment?.map((item: Payment) => {
      arr.push(item.amount);
    });

    const sum = arr.reduce((a, b) => a + b, 0);
    console.log(sum);
  };

  return (
    <div className={`${commonStyles.UserformBG} ${commonStyles.bgLightGrey}`}>
      <div className={`${commonStyles.common}`}>
        <Container className={`${commonStyles.commonForm} pt-3`}>
          <h3 className="alert alert-primary">শ্মশান উন্নয়ন (দাহ সনদ)</h3>
          <h3>অনুদান প্রাপ্তি রসিদ - </h3>

          <Form className="py-4" onSubmit={handleSubmit}>
            {/* here will be call handleSubmit */}
            <Row>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="নাম (শবদেহ)"
                  name="name"
                  onBlur={handleChange}
                  required
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="পিতা/স্বামীর নাম"
                  name="fatherName"
                  onBlur={handleChange}
                />
              </Col>
            </Row>

            <Row className="my-4">
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="মাতার নাম"
                  name="motherName"
                  onBlur={handleChange}
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="ঠিকানা"
                  name="address"
                  onBlur={handleChange}
                />
              </Col>
            </Row>

            <Row className="my-4">
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="পক্ষে (প্রতিনিধি)"
                  name="reference"
                  onBlur={handleChange}
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="মুখাগ্নিকারী/সম্পর্ক"
                  name="relation"
                  onBlur={handleChange}
                />
              </Col>
            </Row>

            <Row className="my-4">
              <Col md={6}>
                <Form.Control
                  type="number"
                  placeholder="দাহ সনদ বাবদ অনুদান"
                  name="amount"
                  onBlur={handleChange}
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  name="date"
                  onBlur={handleChange}
                />
              </Col>
              <Col md={6}>
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Container>
        <br />
      </div>
      <Container className={`${commonStyles.commonForm} pt-3`}>
        <DataTable
          className={dtStyle.dataTable}
          columns={columns}
          data={payment}
          highlightOnHover
          pagination
          fixedHeader
          fixedHeaderScrollHeight="350px"
          customStyles={customStyles}
        />
      </Container>
    </div>
  );
};
export default ShoshanDevDaho;
