import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import commonStyles from "../../styles/common.module.css";

const CreateShop = () => {
  const [newId, setNewId] = useState<string | undefined>();
  const mount =async () => {
      const res = await axios.get("http://localhost:3000/api/shop/GetNewShopId");
      setNewId(res.data);
  }
  useEffect(() => {
      mount();
  }, []);
  const submitData = async (e: any) => {
    e.preventDefault();
    const rate = e.target?.[2]?.value;
    const res = await axios.post("http://localhost:3000/api/shop/createShop", {
      rate
    });
    console.log(res.data);
  };
  return (
    <div className={`${commonStyles.common} pt-5`}>
      {/* <Container className={`${commonStyles.commonForm} pt-3`}>
        <h3>দোকান তৈরী করেন</h3>
        <Form className="py-4" onSubmit={submitData}>
          <Row className="my-3">
            <Col>
              <Form.Control type="text" placeholder={`ID : ${newId}`} name="name" disabled />
            </Col>
          </Row>
          <Row>
            <Col>
             <div className="form-group">
                    <label >Rate Per Month</label>
                    <input type="text" className="form-control"  placeholder=""/>
                </div>
            </Col>
          </Row>
          <Button className="mt-3" type="submit">
            Submit
          </Button>
        </Form>
      </Container> */}

      <div>
            <form onSubmit={submitData} className="pt-4">
                <fieldset disabled>
                    <label >ID</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={newId}/>
                </fieldset>
                <div className="form-group">
                    <label >Rate Per Month</label>
                    <input type="text" className="form-control"  placeholder=""/>
                </div>
                <br />
                <button type="submit" className="btn btn-primary ">Submit</button>
            </form>
        </div>
    </div>
  );
};
export default CreateShop;
