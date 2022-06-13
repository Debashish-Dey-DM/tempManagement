import { Home, User } from "@prisma/client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
interface UserExtended extends User{
    Home: Home
}
const ShopOwner = () => {
    const router = useRouter();
    const [user, setUser] = useState<UserExtended[]>();
    const mount =async () => {
        const result = await axios.get(`http://localhost:3000/api/user/getAllHomeOwner`);
        setUser(result.data);
        
        
    }
    useEffect(() => {
        mount();
    },[])
    return (
        <div>
           <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Dokan No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Fathers Name</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">NID</th>
                    <th scope="col">Image</th>
                    <th scope="col">Due Month</th>
                    <th scope="col">Action</th>
                    
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
                              <button
                                onClick={() =>
                                  router.push(`/User/EditUser/${u?.user_id}`)
                                }
                              >
                                Edit
                              </button>
                            </td>
            
                            <td>
                              <button
                                onClick={() =>
                                  router.push(`/Payments/Home/${u?.user_id}`)
                                }
                              >
                                Payment
                              </button>
                            </td>
                          </tr>
                        );
                    })}
                    

                </tbody>
                </table>
        </div>
    );
}
export default ShopOwner;