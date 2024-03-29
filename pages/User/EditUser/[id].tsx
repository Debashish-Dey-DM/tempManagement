import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import commonStyles from "../../../styles/common.module.css";

const EditUser = () => {
  const [state, setState] = useState(false);
  const [user, setUser] = useState<User>();
  const [newuser, setNewUser] = useState({
    name: "",
    fatherName: "",
    nid: "",
    mobile: "",
    clearUpto: "",
  });
  const router = useRouter();
  const id = router.query.id;

  const getUserData = async () => {
    setState(true);
    const result = await axios.get(`/api/user/getUserById/${id}`);
    setUser(result.data);
  };
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUser({ ...newuser, [name]: value });
  };
  const submitData = async (e: any) => {
    e.preventDefault();
    const name = newuser.name ? newuser.name.toString() : user?.name.toString();
    const fatherName = newuser.fatherName
      ? newuser.fatherName.toString()
      : user?.fatherName.toString();
    const nid = newuser.nid ? newuser.nid.toString() : user?.nid.toString();
    const mobile = newuser.mobile
      ? newuser.mobile.toString()
      : user?.mobiile.toString();
    const clearUpto = newuser.clearUpto
      ? newuser.clearUpto.toString()
      : user?.clearUpto?.toString();
    const userId = user?.user_id.toString();
    const result = await axios.post(`/api/user/updateUser`, {
      userId,
      name,
      fatherName,
      nid,
      mobile,
      clearUpto,
    });
    if (result.status === 200) {
      router.back();
    } else {
      alert("somthing went wrong on User > EditUser");
    }
  };
  return (
    <div
      className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey} pt-5`}
    >
      {state ? (
        <Container>
          <h3>{user?.name} এর তথ্য পরিবর্তনঃ</h3>
          <Form onSubmit={submitData}>
            <Row>
              <Col md={6}>
                <label>নাম</label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder={user?.name}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <label>বাবার নাম</label>
                <Form.Control
                  type="text"
                  name="fatherName"
                  placeholder={user?.fatherName}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={6}>
                <label>মোবাইল নাম্বার</label>
                <Form.Control
                  type="number"
                  name="mobile"
                  placeholder={user?.mobiile + ""}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <label>জাতীয় পরিচয়পত্র</label>
                <Form.Control
                  type="number"
                  name="nid"
                  placeholder={user?.nid + ""}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <br />
            <Row className="align-items-center">
              <Col md={6}>
                <label>
                  ভাড়া ক্লিয়ার (Clear Up to) :{" "}
                  <strong>
                    {user?.clearUpto &&
                      new Date(user?.clearUpto).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                  </strong>
                </label>
                <Form.Control
                  type="month"
                  name="clearUpto"
                  placeholder={user?.clearUpto && user?.clearUpto}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6} className="mt-4">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Container>
      ) : (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <div className="text-center">
            <h1 className="mb-4">ইউজারের তথ্য পরিবর্তন করতে চান? </h1>
            <Button onClick={getUserData} className="me-2" variant="danger">
              হ্যা
            </Button>
            <Button variant="success" onClick={() => router.back()}>
              না
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditUser;
