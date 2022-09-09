import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import commonStyles from "../../styles/common.module.css";
const CreateUser = () => {
  const [shopID, setShopID] = useState<Number>();
  const [homeID, setHomeID] = useState<Number>();
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({
    name: "",
    fatherName: "",
    nid: "",
    mobile: "",
    dueMonth: "",
    typeId: "",
  });
  const [userType, setUserType] = useState("");
  const [typeName, setTypeName] = useState({
    name: "",
    id: 0,
  });

  const g = 6;
  // console.log(localStorage.getItem("shop"));

  // if(localStorage.getItem("shop")){
  //   const info = {...typeName}
  //   info.name = 'shop'
  //   info.id = localStorage.getItem("shop");
  //   setTypeName(info)
  // }

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
        setSuccess(true);
      } else if (res.status === 400) {
        alert("Error Occured, Contact with Developer");
      } else if (res.status === 202) {
        alert("এই দোকান/ঘর এর মালিক রয়েছে... (user already assigned)");
      } else if (res.status === 203) {
        alert("দোকান/ঘর তৈরী করা হয়নি... (Home/Shop Id Not created Yet)");
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
    await axios
      .get("http://localhost:3000/api/shop/unAssignedShop")
      .then((res) => {
        setShopID(res.data);
      });
    await axios
      .get("http://localhost:3000/api/home/unAssignedHome")
      .then((res) => {
        setHomeID(res.data);
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
      className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey} pt-5`}
    >
      <Container className={`${commonStyles.commonForm} pt-3`}>
        <h3 className="alert alert-primary">ইউজার তৈরী</h3>
        <h3>দোকান/ঘর ভাড়াটিয়ার তথ্য - </h3>
        {success ? (
          <Alert variant="success">ভাড়াটিয়ার তথ্য সফলভাবে তৈরী হয়েছে...</Alert>
        ) : (
          ""
        )}
        <Form className="py-4" onSubmit={submitData}>
          <Row>
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="ভাড়াটিয়ার নাম"
                name="name"
                onBlur={handleChange}
              />
            </Col>
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="পিতার নাম"
                name="fatherName"
                onBlur={handleChange}
              />
            </Col>
          </Row>

          <Row className="my-4">
            <Col md={6}>
              <Form.Control
                type="number"
                placeholder="মোবাইল নাম্বার"
                name="mobile"
                onBlur={handleChange}
              />
            </Col>
            <Col md={6}>
              <Form.Control
                type="number"
                placeholder="পরিচয় পত্র নাম্বার"
                name="nid"
                onBlur={handleChange}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6}>
              <select name="type" onChange={typeChange}>
                <option defaultChecked>ধরন (দোকান / ঘর)</option>
                <option value="Shop">দোকান</option>
                <option value="Home">ঘর</option>
              </select>
            </Col>
            <Col md={6}>
              <Form.Control
                type="number"
                placeholder="মাস বাকি (Due month)"
                name="dueMonth"
                onBlur={handleChange}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              {userType == "" ? (
                ""
              ) : userType == "Shop" ? (
                <input
                  // className = {`${styles.shopOrHomeNo}`}
                  type="text"
                  placeholder={`${shopID} DOKAN NONG`}
                  name="typeId"
                  onChange={handleChange}
                />
              ) : userType == "Home" ? (
                <input
                  // className = {`${styles.shopOrHomeNo}`}
                  type="text"
                  placeholder={`${homeID} ঘর নং`}
                  name="typeId"
                  onChange={handleChange}
                />
              ) : (
                <h5> </h5>
              )}
            </Col>
            <Col md={5}>
              <Form.Control
                type="file"
                placeholder="ছবি"
                name="image"
                onBlur={handleChange}
              />
            </Col>

            <Col md={1}>
              <Button className="mt-1" type="submit">
                {" "}
                Submit
              </Button>
            </Col>
          </Row>
        </Form>

        {/* eikhane CreateUser.txt er code */}
      </Container>
    </div>
  );
};
export default CreateUser;
