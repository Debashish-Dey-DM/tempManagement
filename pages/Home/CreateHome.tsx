import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import commonStyles from "../../styles/common.module.css";

const CreateHome = () => {
  const [newId, setNewId] = useState<string | undefined>();
  const router = useRouter();
  const mount = async () => {
    const res = await axios.get("/api/home/GetNewHomeId");
    setNewId(res.data);
  };
  useEffect(() => {
    mount();
  }, []);
  const submitData = async (e: any) => {
    e.preventDefault();
    const rate = e.target?.[2]?.value;
    const res = await axios.post("/api/home/createHome", {
      rate,
    });
    router.push("/User/CreateUser");
  };
  return (
    <div
      className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey} pt-5`}
    >
      <Container className={`${commonStyles.commonForm} py-3`}>
        <div>
          <h3 className="alert alert-primary">ঘর তৈরি</h3>
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
              <input
                type="number"
                className="form-control mt-2"
                placeholder=" Only Number"
              />
            </div>
            <br />
            <button type="submit" className="btn btn-primary ">
              Submit
            </button>
          </form>
        </div>
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
