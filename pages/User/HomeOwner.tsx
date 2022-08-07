import { Home, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
interface UserExtended extends User {
  Home: Home;
}
const ShopOwner = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserExtended[]>();
  const mount = async () => {
    const result = await axios.get(`localhost:3000/api/user/getAllHomeOwner`);
    setUser(result.data);
  };
  useEffect(() => {
    mount();
  }, []);
  return (
    <div>
      <h3 className="alert alert-primary">ঘর ভাড়াটিয়ার তালিকা</h3>
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th scope="col">আবাসন নং </th>
            <th scope="col">ভাড়াটিয়ার নাম</th>
            <th scope="col">পিতার নাম</th>
            <th scope="col">ভাড়ার হার</th>
            <th scope="col">মোবাইল নাম্বার</th>
            <th scope="col">এন.আই.ডি/NID</th>
            <th scope="col">ছবি</th>
            <th scope="col">মাস বাকি</th>
            <th scope="col">Edit</th>
            <th scope="col">Payment</th>
          </tr>
        </thead>
        <tbody>
          {user?.map((u, i) => {
            return (
              <tr key={i}>
                <td>{u?.homeId}</td>
                <td>{u?.name}</td>
                <td>{u?.fatherName}</td>
                <td>{u?.Home?.ratePerMonth}</td>
                <td>{u?.mobiile}</td>
                <td>{u?.nid}</td>
                <td>{u?.image}</td>
                <td>{u?.dueMonth}</td>
                <td>
                  <Button
                    variant="dark"
                    onClick={() => router.push(`/User/EditUser/${u?.user_id}`)}
                  >
                    Edit
                  </Button>
                </td>

                <td>
                  <Button
                    variant="info"
                    onClick={() => router.push(`/Payments/Home/${u?.user_id}`)}
                  >
                    Payment
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ShopOwner;
