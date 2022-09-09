import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import commonStyles from "../../../styles/common.module.css";

const EditUser = () => {
  const [state, setState] = useState(false);
  const [user, setUser] = useState<User>();
  const [newuser, setNewUser] = useState({
    name: "",
    fatherName: "",
    nid: "",
    mobile: "",
    dueMonth: "",
  });
  const router = useRouter();
  const id = router.query.id;
  console.log(id);

  const getUserData = async () => {
    setState(true);
    console.log("id : ", id);
    const result = await axios.get(
      `http://localhost:3000/api/user/getUserById/${id}`
    );
    setUser(result.data);
  };
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, " : ", value);
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
    const dueMonth = newuser.dueMonth
      ? newuser.dueMonth.toString()
      : user?.dueMonth.toString();
    const userId = user?.user_id.toString();
    const result = await axios.post(
      `http://localhost:3000/api/user/updateUser`,
      {
        userId,
        name,
        fatherName,
        nid,
        mobile,
        dueMonth,
      }
    );
  };
  return (
    <div
      className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey} pt-5`}
    >
      {state ? (
        <Container>
          <h3>Edit for {user?.name}</h3>
          <form onSubmit={submitData}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder={user?.name}
              onChange={handleChange}
            />
            <br />
            <label>Fathers Name</label>
            <input
              type="text"
              name="fatherName"
              placeholder={user?.fatherName}
              onChange={handleChange}
            />
            <br />
            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              placeholder={user?.mobiile + ""}
              onChange={handleChange}
            />
            <br />
            <label>NID</label>
            <input
              type="text"
              name="nid"
              placeholder={user?.nid + ""}
              onChange={handleChange}
            />
            <br />
            <label>Due Month</label>
            <input
              type="text"
              name="dueMonth"
              placeholder={user?.dueMonth + ""}
              onChange={handleChange}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </Container>
      ) : (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <div className="text-center">
            <h1 className="mb-4">Want to Edit User? </h1>
            <Button onClick={getUserData} className="me-2" variant="danger">
              Yes
            </Button>
            <Button variant="success" onClick={() => router.back()}>
              No
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditUser;
