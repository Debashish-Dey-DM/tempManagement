import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { User } from "@prisma/client";

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
        <>
          <h1>Are You Sure </h1>
          <button onClick={getUserData}>Yes</button>
          <button>No</button>
        </>
      )}
    </div>
  );
};
export default EditUser;
