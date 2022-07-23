import axios from "axios";
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import commonStyles from "../../styles/common.module.css";

const CreateShop = () => {
  const [newId, setNewId] = useState<string | undefined>();
  const router = useRouter();
  const mount = async () => {
    const res = await axios.get("http://localhost:3000/api/shop/GetNewShopId");
    setNewId(res.data);
  };
  useEffect(() => {
    mount();
  }, []);
  const submitData = async (e: any) => {
    e.preventDefault();
    const rate = e.target?.[2]?.value;
    const res = await axios.post("http://localhost:3000/api/shop/createShop", {
      rate,
    });
    console.log(res.data);
    localStorage.setItem("shop", `${newId}`);
    router.push('/User/CreateUser')

  };
  return (
    <div className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey} pt-5`}>
    <Container className={`${commonStyles.commonForm} py-3`}>
      <div>
      <h5>দোকান তৈরি - </h5>
        <form onSubmit={submitData} className="pt-4">
          <fieldset disabled>
            <label className="ms-3">আইডি / ID</label>
            <input
              type="email"
              className="form-control mt-2 mb-4"
              placeholder={newId}
            />
          </fieldset>
          <div className="form-group">
            <label className="ms-3">মাসিক ভাড়া / Rate Per Month</label>
            <input type="number" className="form-control mt-2" placeholder=" Only Number" />
          </div>
          <br />
          <button type="submit" className="btn btn-primary ">
            Submit
          </button>
        </form>
      </div>
    </Container>
    </div>
  );
};
export default CreateShop;
