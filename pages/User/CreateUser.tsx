import { Home, Shop } from "@prisma/client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import commonStyles from "../../styles/common.module.css";
import styles from "./CreateUser.module.css";
const CreateUser = () => {
  const [shop, setShop] = useState([]);
  const [home, setHome] = useState([]);
  const [user, setUser] = useState({
    name: "",
    fatherName: "",
    nid: "",
    mobile: "",
    dueMonth: "",
    typeId: "",
  });
  const [userType, setUserType] = useState("");
  const submitData = async (e: any) => {
    e.preventDefault();
    const name = user.name.toString();
    const fatherName = user.fatherName.toString();
    const nid = user.nid.toString();
    const mobile = user.mobile.toString();
    const dueMonth = user.dueMonth.toString();
    const typeId = user.typeId.toString();
    console.log("userSubmitted : ", user);
    console.log("userType : ", userType);
    const res = await axios.post("http://localhost:3000/api/user/createUser", {
      name,
      fatherName,
      nid,
      mobile,
      dueMonth,
      userType,
      typeId,
    });
    if (res) {
      if (res.status === 200) {
        alert("user created");
      } else if (res.status === 400) {
        alert("Error Occured, Contact with Developer");
      } else if (res.status === 202) {
        alert("user already assigned");
      } else if (res.status === 203) {
        alert("Home / Shop Id Not created Yet");
      }
    }
  };
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, " : ", value);
    setUser({ ...user, [name]: value });
  };
  const mount = async () => {
    await axios.get("http://localhost:3000/api/shop/getAllShop").then((res) => {
      setShop(res.data);
    });
  };
  const typeChange = (e: any) => {
    if (e.target.value == "Home") {
      setUserType("Home");
    } else if (e.target.value == "Shop") {
      setUserType("Shop");
    }
  };
  useEffect(() => {
    mount();
  }, []);
  return (
    <div
      className={`${styles.createUserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey} pt-5`}
    >
      <Container className={`${commonStyles.commonForm} pt-3`}>
        <h3>দোকানদারের নাম ঠিকানা দেন</h3>
        <Form className="py-4" onSubmit={submitData}>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="নাম"
                name="name"
                onBlur={handleChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="পিতার নাম"
                name="fatherName"
                onBlur={handleChange}
              />
            </Col>
          </Row>

          <Row className="my-4">
            <Col>
              <Form.Control
                type="number"
                placeholder="মোবাইল নাম্বার"
                name="mobile"
                onBlur={handleChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="number"
                placeholder="পরিচয় পত্র নাম্বার"
                name="nid"
                onBlur={handleChange}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              {/* <select name="type" onChange={typeChange}>
                <option defaultChecked>Select</option>
                <option value="Shop">Dokan</option>
                <option value="Home">Home</option>
              </select> */}
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>select --- Shop / Home</option>
                <option value="Shop">Dokan</option>
                <option value="Home">Home</option>
              </select>
              {userType == "" ? (
                <h5> </h5>
              ) : userType == "Shop" ? (
                <input
                  type="text"
                  placeholder="Shop"
                  name="typeId"
                  onChange={handleChange}
                />
              ) : userType == "Home" ? (
                <input
                  type="text"
                  placeholder="Home"
                  name="typeId"
                  onChange={handleChange}
                />
              ) : (
                <h5> </h5>
              )}
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Control
                type="number"
                placeholder="মাস বাকি (Due month)"
                name="dueMonth"
                onBlur={handleChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="file"
                placeholder="ছবি"
                name="image"
                onBlur={handleChange}
              />
            </Col>
            <Col>
              <Button type="submit"> Submit</Button>
            </Col>
          </Row>
        </Form>

        {/* eikhane CreateUser.txt er code */}
      </Container>
    </div>
  );
};
export default CreateUser;
