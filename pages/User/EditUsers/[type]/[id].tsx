import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "react-bootstrap";

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
    const dueMonth = newuser.dueMonth
      ? newuser.dueMonth.toString()
      : user?.dueMonth.toString();
  };
  return (
    <div>
      {state ? (
        <>
          <h1>Hello {user?.name}</h1>
          <form action="">
            <label>Name</label>
            <input
              type="text"
              placeholder={user?.name}
              onChange={handleChange}
            />
            <br />
            <label>Fathers Name</label>
            <input
              type="text"
              placeholder={user?.fatherName}
              onChange={handleChange}
            />
            <br />
            <label>Mobile</label>
            <input
              type="text"
              placeholder={user?.mobiile + ""}
              onChange={handleChange}
            />
            <br />
            <label>NID</label>
            <input
              type="text"
              placeholder={user?.nid + ""}
              onChange={handleChange}
            />
            <br />
            <label>Due Month</label>
            <input
              type="text"
              placeholder={user?.dueMonth + ""}
              onChange={handleChange}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </>
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
