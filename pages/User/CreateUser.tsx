import { Home, Shop } from "@prisma/client";
import axios from "axios";
import React, { useState,useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import commonStyles from '../../styles/common.module.css'
import styles from "./CreateUser.module.css";
const CreateUser = () => {
  const [shop, setShop] = useState([])
  const [home,setHome] = useState([])
  const [user, setUser] = useState({
    name: "",
    fatherName: "",
    nid: "",
    mobile: "",
    dueMonth: "",
    type: "",
    typeId: "",
    // ratePerMonth:'',
    // shopNo:'',
    // image: "", 
  });
  const [userType,setUserType]=useState("");
  const submitData = async (e: any) => {
    e.preventDefault();
    console.log("userSubmitted : ", user);
    // const res = await axios.post("http://localhost:3000/api/user/createUser", {
    //   user,
    // });
  };
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, ' : ', value);
    setUser({ ...user, [name]: value });
  };
  const getHome = async () => {
    setUserType("Home");

  }
  const getShop = async () => {
  
    await axios.get("http://localhost:3000/api/shop/getAllShopIds").then((res) => {
      // setShop(res.data);
      console.log(res.data);
      
      setUserType("Shop");
    })

  }
  const mount = async () => {
    await axios.get("http://localhost:3000/api/shop/getAllShop").then((res) => {
      setShop(res.data);
    })
  }
  useEffect(() => { 
    mount()
  },[])
  return (
    <div className={`${styles.createUserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey} pt-5`}>
      <Container className={`${commonStyles.commonForm} pt-3`}>
        <h3>দোকানদারের নাম ঠিকানা দেন</h3>
        <Form className="py-4" onSubmit={submitData}>
          <Row>
            <Col>
              <Form.Control type="text" placeholder="নাম" name='name'onBlur={handleChange}/>
            </Col>
            <Col>
              <Form.Control type="text" placeholder="পিতার নাম" name="fatherName" onBlur={handleChange}/>
            </Col>
          </Row>

          <Row className="my-4">
            <Col>
              <Form.Control type="number" placeholder="মোবাইল নাম্বার" name="mobile" onBlur={handleChange}/>
            </Col>
            <Col>
              <Form.Control type="number" placeholder="পরিচয় পত্র নাম্বার" name="nid" onBlur={handleChange}/>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              {/* <Form.Control type="number" placeholder="দোকান নাম্বার" name='shopNo' onBlur={handleChange}/> */}
              <select name="" id="">
                <option value="">দোকান নাম্বার</option>
                {shop?.map((s: Shop,i) => {
                  return (
                    <>
                      <option value="">{s.shop_id}</option>
                    </>
                  )
                })}
              </select>
              
              <button onClick={getHome}>Home</button>
              <button onClick={getShop}>Shop</button>
              {(userType=="")?<h5>null</h5>:(userType=="Shop")?<h5>Shop</h5>:(userType=="Home")?<h5>Home</h5>:<h5>null</h5>}
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Control type="number" placeholder="মাস বাকি (Due month)" name="dueMonth"onBlur={handleChange}/>
            </Col>
            <Col>
              <Form.Control type="file" placeholder="ছবি" name='image' onBlur={handleChange}/>
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
