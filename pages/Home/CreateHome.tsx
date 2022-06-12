import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import commonStyles from "../../styles/common.module.css";

const CreateHome = () => {
  const [newId, setNewId] = useState<string | undefined>();
  const mount = async () => {
    const res = await axios.get("http://localhost:3000/api/home/GetNewHomeId");
    setNewId(res.data);
  };
  useEffect(() => {
    mount();
  }, []);
  const submitData = async (e: any) => {
    e.preventDefault();
    const rate = e.target?.[2]?.value;
    const res = await axios.post("http://localhost:3000/api/home/createHome", {
      rate,
    });
    console.log(res.data);
  };
  return (
    <div className={` ${commonStyles.common} ${commonStyles.bgLightGrey} pt-5`}>
          <Container className={`${commonStyles.commonForm} pt-3`}>
              <h5>Ghor Toiri Korun</h5>
        <Form className="py-4" onSubmit={submitData}>
          <label className="ms-3">ID</label>
          <Form.Control
            type="number"
            placeholder={newId}
            name="name"
            disabled
          />
          <br />
          <label className="ms-3">Rate Per Month</label>
          <Form.Control type="number" placeholder="(only number)" name="name" />
          <br />
          <Button>Submit</Button>
        </Form>
      </Container>

      {/* <form onSubmit={submitData} className="pt-4">
        <fieldset disabled>
          <label>ID</label>
          <input
            type="number"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder={newId}
          />
        </fieldset>
        <div className="form-group">
          <label>Rate Per Month</label>
          <input type="number" className="form-control" placeholder="" />
        </div>
        <br />

        <button type="submit" className="btn btn-primary ">
          Submit
        </button>
      </form> */}
    </div>
  );
};
export default CreateHome;
