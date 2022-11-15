import { Home, Shop, User } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import commonStyles from "../../styles/common.module.css";
const AssignUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [homes, setHomes] = useState<Home[]>([]);
  const [userShop, setUserShop] = useState({
    user: "",
    shop: "",
  });
  const [userHome, setUserHome] = useState({
    user: "",
    home: "",
  });
  const mount = async () => {
    const res = await axios.get("http://localhost:3000/api/user/getAllUser");
    setUsers(res.data);
    const res2 = await axios.get("http://localhost:3000/api/shop/getAllShop");
    setShops(res2.data);
    const res3 = await axios.get("http://localhost:3000/api/home/getAllHome");
    setHomes(res3.data);
  };
  useEffect(() => {
    mount();
  }, []);
  const submitShop = async (e: any) => {
    e.preventDefault();

    const response = await axios.post(
      `http://localhost:3000/api/user/assignToShop/${userShop.user}/${userShop.shop}`
    );
    console.log(response);
  };
  const submitHome = async (e: any) => {
    e.preventDefault();
    const response2 = await axios.post(
      `http://localhost:3000/api/user/assignToHome/${userHome.user}/${userHome.home}`
    );
    console.log(response2);
  };
  const handleShop = (e: any) => {
    const name1 = e.target.name;
    const value1 = e.target.value;

    console.log(name1, value1);
    setUserShop({ ...userShop, [name1]: value1 });
  };
  const handleHome = (e: any) => {
    const name1 = e.target.name;
    const value1 = e.target.value;

    console.log(name1, value1);
    setUserHome({ ...userHome, [name1]: value1 });
  };
  const test = async () => {
    console.log(userShop);
    console.log(userHome);
  };

  return (
    <div
      className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey} pt-5`}
    >
      <Container
        className={` ${commonStyles.common} ${commonStyles.bgLightGrey} ${commonStyles.commonForm} p-4`}
      >
        <div>
          <h1>Assign User To Shop</h1>
          <form onSubmit={submitShop}>
            <div className="pt-4">
              <select
                onChange={handleShop}
                name="user"
                className="form-select"
                aria-label="Default select example"
              >
                <option value={0}>User</option>
                {users.map((u) => {
                  return (
                    <option value={u.user_id} key={u.user_id}>
                      {u.user_id} ::: {u.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="pt-4">
              <select
                onChange={handleShop}
                name="shop"
                className="form-select"
                aria-label="Default select example"
              >
                <option value={0}>Shop</option>
                {shops.map((s) => {
                  return (
                    <option value={s.shop_id} key={s.shop_id}>
                      {s.shop_id}{" "}
                    </option>
                  );
                })}
              </select>
            </div>
            <Button className="m-2" type="submit">
              Submit
            </Button>
          </form>
        </div>
        <div className="pt-2">
          <h1>Assign User To Home</h1>
          <form onSubmit={submitHome}>
            <div className="pt-4">
              <select
                onChange={handleHome}
                name="user"
                className="form-select"
                aria-label="Default select example"
              >
                <option value={0}>User</option>
                {users.map((u) => {
                  return (
                    <option value={u.user_id} key={u.user_id}>
                      {u.user_id} ::: {u.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="pt-4">
              <select
                onChange={handleHome}
                name="home"
                className="form-select"
                aria-label="Default select example"
              >
                <option value={0}>Home</option>
                {homes.map((h) => {
                  return (
                    <option value={h.home_id} key={h.home_id}>
                      {h.home_id}{" "}
                    </option>
                  );
                })}
              </select>
            </div>
            <Button className="m-2">Submit</Button>
          </form>
        </div>
        {/* <div>
        <Button onClick={test}>Test Button</Button>
      </div> */}
      </Container>
    </div>
  );
};
export default AssignUser;
