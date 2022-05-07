import { Shop, User } from "@prisma/client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
interface UserExtended extends User{
    Shop: Shop
}
const ShopOwner = () => {
    const [user, setUser] = useState<UserExtended[]>();
    const mount =async () => {
        const result = await axios.get(`http://localhost:3000/api/user/getAllShopOwner`);
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
                    
                    </tr>
                </thead>
                <tbody>
                    {user?.map((u, i) => {
                        return (
                            
                            <tr key={i}>
                            <td >{u?.shopId==null?"Not assigned":u.shopId}</td>
                            <td>{u?.name}</td>
                            <td>{u?.fatherName}</td>
                            <td>{u?.Shop?.ratePerMonth}</td>
                            <td>{u?.mobiile}</td>
                            <td>{u?.nid}</td>
                            <td>{u?.image}</td>
                            
                            </tr>
                        );
                    })}
                    

                </tbody>
                </table>
        </div>
    );
}
export default ShopOwner;