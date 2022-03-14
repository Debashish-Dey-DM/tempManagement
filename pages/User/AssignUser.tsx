import { Home, Shop, User } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
const AssignUser = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [shops, setShops] = useState<Shop[]>([]);
    const [homes, setHomes] = useState<Home[]>([]);
    const [userShop, setUserShop] = useState({
        user: "",
        shop: "",
    }); 
    const [homeShop, setHomeShop] = useState({
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
    }
    useEffect(() => {
        mount();
    }, []);
    const submitShop = async (e: any) => {
        e.preventDefault();
        const name1 = e.target?.[0]?.name;
        const value1 = e.target?.[0]?.value;
        
        
        
    }
    const submitHome = async (e: any) => {
        e.preventDefault();
        const name1 = e.target?.[0]?.name;
        const value1 = e.target?.[0]?.value;
        const name2 = e.target?.[1]?.name;
        const value2 = e.target?.[1]?.value;
        console.log(name1, value1, name2, value2);
    }
    const test = async () => {
        console.log(userShop);
    }
        
        
    return (
        <div>
            <div>
                <h1>Assign User To Shop</h1>
                <form onSubmit={submitShop}>
                <div className="pt-4">
                    <select name="user" className="form-select" aria-label="Default select example">
                        <option value={0}>User</option>
                            {users.map((u) => {
                                return <option value={u.id} key={u.id}>{u.id }  :::  {u.name}</option>
                            })}
                        
                    </select>
                </div>
                <div className="pt-4">
                    <select name="shop" className="form-select" aria-label="Default select example">
                        <option value={0}>Shop</option>
                        {shops.map((s) => {
                                return <option value={s.id} key={s.id}>{s.id }  </option>
                            })}
                    </select>
                </div>
                <button>Submit</button>
                </form>

            </div>
            <div className="pt-2">
                <h1>Assign User To Home</h1>
                <form onSubmit={submitHome}>
                <div className="pt-4">
                    <select name="user" className="form-select" aria-label="Default select example">
                        <option value={0}>User</option>
                        {users.map((u) => {
                                return <option value={u.id} key={u.id}>{u.id }  :::  {u.name}</option>
                        })}
                    </select>
                </div>
                <div className="pt-4">
                    <select name="home" className="form-select" aria-label="Default select example">
                        <option value={0} >Home</option>
                        {homes.map((h) => {
                                return <option value={h.id} key={h.id}>{h.id } </option>
                            })}
                    </select>
                </div>
                 <button>Submit</button>
                </form>
            </div>
            <div>
                <button onClick={test}>Test Button</button>
            </div>
        </div>
        
    )
 }
export default AssignUser;