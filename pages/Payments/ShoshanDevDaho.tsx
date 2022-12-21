import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useReactToPrint } from "react-to-print";
import commonStyles from "../../styles/common.module.css";
import dtStyle from "./sosan.module.css";
const CryptoJS = require("crypto-js");

const ShoshanDevDaho = () => {
  // admin name
  const [adminName, setAdminName] = useState();
  const [payment, setPayment] = useState();
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
  const [singleUser, setSingleUser] = useState<{ [key: string]: any }>();

  let numberToBengliWords = require("number-to-bengli-words");
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePaymentSlip = async (e: any) => {
    await axios.get("/api/Payments/getShosanById/" + e).then((res) => {
      if (res.data.type === "Daho") {
        setSingleUser(res.data);
      }
    });
    handlePrint();
  };

  // for table and pagination
  const columns = [
    {
      name: "নাম - (শবদেহ)",
      selector: (row: any) => row.name,
    },
    {
      name: "তারিখ",
      selector: (row: any) =>
        new Date(row.payment.date).toLocaleDateString("en-us", {
          day: "numeric",
          year: "numeric",
          month: "short",
        }),
      sortable: true,
    },
    {
      name: "পরিমান",
      selector: (row: any) => row.amount,
    },
    {
      name: "রিসিট",
      button: true,
      cell: (row: any) => (
        <div className="App">
          <div className="openbtn text-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handlePaymentSlip(row.id)}
            >
              Print
            </button>
          </div>
        </div>
      ),
    },
  ];
  const customStyles = {
    rows: {
      style: {
        fontSize: "15px",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
      },
    },
  };

  const mount = async () => {
    await axios
      // .get("/api/Payments/getPayments/ShoshanDevDaho")
      .get("/api/Shosan/getAllShosan")
      .then((res) => {
        let arr: any = [];
        res.data?.map((item: any) => item.type === "Daho" && arr.push(item));
        setPayment(arr);
      });
  };
  useEffect(() => {
    mount();
    // for setting admin name
    const nm = localStorage.getItem("ngaLan");
    let bytes = CryptoJS.AES.decrypt(nm, "my-secret-key@123");
    let nms = bytes.toString(CryptoJS.enc.Utf8);
    setAdminName(nms);
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await axios
      .post("/api/Payments/createShoshanPayment", {
        pay,
      })
      .then((res) => {
        handlePaymentSlip(res.data.shoshan.id);
        setTimeout(() => location.reload(), 3000);
      })
      .catch((err) => {
        alert(err);
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

  return (
    <div className={`${commonStyles.UserformBG} ${commonStyles.bgLightGrey}`}>
      <div className={`${commonStyles.common}`}>
        <Container className={`${commonStyles.commonForm} pt-3`}>
          <h3 className="alert alert-primary">শ্মশান উন্নয়ন (দাহ সনদ)</h3>
          <h5>অনুদান প্রাপ্তি রসিদ - </h5>

          <Form className="py-4" onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="">
                <label>
                  <small>নাম</small>{" "}
                </label>
                <Form.Control
                  type="text"
                  placeholder="নাম (শবদেহ)"
                  name="name"
                  onBlur={handleChange}
                  required
                />
              </Col>
              <Col md={6} className="">
                <label>
                  <small>পিতা / স্বামী </small>
                </label>
                <Form.Control
                  type="text"
                  placeholder="পিতা/স্বামীর নাম"
                  name="fatherName"
                  onBlur={handleChange}
                />
              </Col>
            </Row>

            <Row className="my-4">
              <Col md={6} className="">
                <label>
                  <small>মাতার নাম</small>
                </label>
                <Form.Control
                  type="text"
                  placeholder="মাতার নাম"
                  name="motherName"
                  onBlur={handleChange}
                />
              </Col>
              <Col md={6} className="">
                <label>
                  <small>ঠিকানা</small>
                </label>
                <Form.Control
                  type="text"
                  placeholder="ঠিকানা"
                  name="address"
                  onBlur={handleChange}
                />
              </Col>
            </Row>

            <Row className="my-4">
              <Col md={6} className="">
                <label>
                  <small>প্রতিনিধি</small>
                </label>
                <Form.Control
                  type="text"
                  placeholder="পক্ষে (প্রতিনিধি)"
                  name="reference"
                  onBlur={handleChange}
                />
              </Col>
              <Col md={6} className="">
                <label>
                  <small>দাহ অনুদান</small>
                </label>
                <Form.Control
                  type="number"
                  placeholder="দাহ সনদ বাবদ অনুদান"
                  name="amount"
                  onBlur={handleChange}
                  required
                />
              </Col>
            </Row>

            <Row className="my-4">
              <Col md={6} className="">
                <label>
                  <small>দাহের তারিখ</small>
                </label>
                <Form.Control
                  type="date"
                  placeholder="দাহের তারিখ"
                  name="relation"
                  onBlur={handleChange}
                />
              </Col>

              <Col md={4} className="">
                <label>
                  <small>রসিদের তারিখ</small>
                </label>
                <Form.Control
                  type="date"
                  placeholder="তারিখ"
                  name="date"
                  onBlur={handleChange}
                  required
                />
              </Col>
              <Col md={2} className="mt-4">
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
          data={payment ? payment : []}
          highlightOnHover
          pagination
          fixedHeader
          // fixedHeaderScrollHeight="350px"
          customStyles={customStyles}
          defaultSortAsc={false}
        />

        {/* for printing  */}

        {singleUser && (
          <div style={{ display: "none" }}>
            <div className="printArea py-3 px-5" ref={componentRef}>
              <div className="d-flex justify-content-between">
                <span>গ্রাহক কপি</span>
                <span>ক্রমিক: {singleUser?.payment.id}</span>
              </div>
              <div className="text-center bg-light">
                <h6>শ্রী শ্রী বরদেস্বরী মহা শ্মশান</h6>
                <p>
                  পরিচালনায়ঃ শ্রী শ্রী বরদেশ্বরী কালিমাতা মন্দির ও শ্মশান কমিটি
                </p>
                <p className={commonStyles.nmy2}>
                  রাজারবাগ, পোঃ বাসাবো, থানাঃ সবুজবাগ, ঢাকা-১২১৪
                </p>
              </div>
              <hr /> <br />
              <div className="mb-2 d-flex justify-content-center align-items-center">
                <h6 className={dtStyle.onudan}>দাহ সনদ</h6>
                <h6 className={`${dtStyle.onudan} ${dtStyle.onudanBG}`}>
                  অনুদান প্রাপ্তি রসিদ
                </h6>
                <h6 className={dtStyle.onudan}>
                  তারিখঃ
                  {new Date(singleUser.payment.createdAt).toLocaleDateString(
                    "bn-BD"
                  )}
                </h6>
              </div>
              <br />
              <div className="d-flex justify-content-between">
                <div>
                  <h6>
                    নাম (শবদেহ): <strong>{singleUser?.name}</strong>
                  </h6>
                  <h6>
                    পিতা/স্বামীর নাম: <strong>{singleUser?.fatherName}</strong>
                  </h6>
                  <h6>
                    মাতার নাম: <strong>{singleUser?.motherName}</strong>
                  </h6>
                </div>
                <div>
                  <h6>
                    পক্ষে(প্রতিনিধি): <strong>{singleUser?.reference}</strong>
                  </h6>
                  <h6>
                    দাহের তারিখ:
                    <strong>
                      {new Date(singleUser?.relation).toLocaleDateString(
                        "bn-BD"
                      )}
                    </strong>
                  </h6>
                  <h6>
                    ঠিকানা: <strong>{singleUser?.address}</strong>
                  </h6>
                </div>
              </div>
              {/* official talk  */}
              <div className="mt-3 lh-lg">
                বাবদ অনুদান{" "}
                <span className="fw-bold text-decoration-underline">
                  {singleUser.amount
                    ? singleUser.amount.toLocaleString("bn-BD")
                    : ""}{" "}
                  টাকা
                </span>{" "}
                (কথায়){" "}
                <span className="fw-bold text-decoration-underline">
                  {numberToBengliWords.toBengaliWords(
                    singleUser.amount ? singleUser.amount : 0
                  )}{" "}
                  টাকা{" "}
                </span>
                মাত্র ধন্যবাদের সহিত গৃহিত হইলো।
                <br /> <br /> <br />
                <div className="d-flex justify-content-between">
                  <span className="border-top border-dark">
                    সভাপতি / সাধারন সম্পাদক
                  </span>
                  <small>Printed by: {adminName} </small>
                  <span className="border-top border-dark">
                    কোষাধক্ষ্য/মনোনিত আদায়কারী
                  </span>
                </div>
              </div>
              <hr className="border-top border-5 border-warning" />
              {/* office copy */}
              <div className="d-flex justify-content-between">
                <span>অফিস কপি</span>
                <span>ক্রমিক: {singleUser?.payment.id}</span>
              </div>
              <div className="text-center bg-light">
                <h6>শ্রী শ্রী বরদেস্বরী মহা শ্মশান</h6>
                <p>
                  পরিচালনায়ঃ শ্রী শ্রী বরদেশ্বরী কালিমাতা মন্দির ও শ্মশান কমিটি
                </p>
                <p className={commonStyles.nmy2}>
                  রাজারবাগ, পোঃ বাসাবো, থানাঃ সবুজবাগ, ঢাকা-১২১৪
                </p>
              </div>
              <hr /> <br />
              <div className="mb-2 d-flex justify-content-center align-items-center">
                <h6 className={dtStyle.onudan}>দাহ সনদ</h6>
                <h6 className={`${dtStyle.onudan} ${dtStyle.onudanBG}`}>
                  অনুদান প্রাপ্তি রসিদ
                </h6>
                <h6 className={dtStyle.onudan}>
                  তারিখঃ
                  {new Date(singleUser.payment.createdAt).toLocaleDateString(
                    "bn-BD"
                  )}
                </h6>
              </div>
              <br />
              <div className="d-flex justify-content-between">
                <div>
                  <h6>
                    নাম (শবদেহ): <strong>{singleUser?.name}</strong>
                  </h6>
                  <h6>
                    পিতা/স্বামীর নাম: <strong>{singleUser?.fatherName}</strong>
                  </h6>
                  <h6>
                    মাতার নাম: <strong>{singleUser?.motherName}</strong>
                  </h6>
                </div>
                <div>
                  <h6>
                    পক্ষে(প্রতিনিধি): <strong>{singleUser?.reference}</strong>
                  </h6>
                  <h6>
                    দাহের তারিখ:
                    <strong>
                      {new Date(singleUser?.relation).toLocaleDateString(
                        "bn-BD"
                      )}
                    </strong>
                  </h6>
                  <h6>
                    ঠিকানা: <strong>{singleUser?.address}</strong>
                  </h6>
                </div>
              </div>
              {/* official talk  */}
              <div className="mt-3 lh-lg">
                বাবদ অনুদান{" "}
                <span className="fw-bold text-decoration-underline">
                  {singleUser.amount
                    ? singleUser.amount.toLocaleString("bn-BD")
                    : ""}{" "}
                  টাকা_
                </span>{" "}
                (কথায়){" "}
                <span className="fw-bold text-decoration-underline">
                  _
                  {numberToBengliWords.toBengaliWords(
                    singleUser.amount ? singleUser.amount : 0
                  )}
                  -টাকা{" "}
                </span>
                মাত্র ধন্যবাদের সহিত গৃহিত হইলো।
                <br /> <br /> <br />
                <div className="d-flex justify-content-between">
                  <span className="border-top border-dark">
                    সভাপতি / সাধারন সম্পাদক
                  </span>
                  <small>Printed by: {adminName} </small>
                  <span className="border-top border-dark">
                    কোষাধক্ষ্য/মনোনিত আদায়কারী
                  </span>
                </div>
              </div>
            </div>{" "}
            {/* print end */}
          </div>
        )}
      </Container>
    </div>
  );
};
export default ShoshanDevDaho;
