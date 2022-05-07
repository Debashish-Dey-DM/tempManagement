import { Payment } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
const ShoshanDevShot = () => {
    const [payment, setPayment] = useState<Payment[]>();
    const [totalAmount,setTotalAmount] = useState(0);
    const [pay, setPay] = useState({
        type: "ShoshanDevShot",
        date: "",
        amount: "",
    })
    const mount = async () => {
         await axios.get("http://localhost:3000/api/Payments/getPayments/ShoshanDevShot").
            then(res => {
                console.log(res.data);
                setPayment(res.data);
                let arr: number[] = [];
                res.data?.map((item: Payment) => { arr.push(item.amount) })
                const sum = arr.reduce((a, b) => a + b, 0);
                setTotalAmount(sum);
        })
    }
    useEffect(() => {mount()} , [])
    const handleSubmit =async (e: any) => {
        e.preventDefault();

        const result = await axios.post("http://localhost:3000/api/Payments/createPayment", { pay }).
            then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })    
        mount();
    }
    const handleChange = (e: any) => {
        
        const name = e.target.name;
        const value = e.target.value;
        if (name === "date") {
            const newDate = new Date(value)
            const updatedDate = newDate.toISOString();
            setPay({ ...pay, [name]: updatedDate })
        }
        else {
            setPay({ ...pay, [name]: value })
        }
    }
    const test = () => {
        let arr: number[] = [];
        payment?.map((item: Payment) => { arr.push(item.amount) })
        
        const sum = arr.reduce((a, b) => a + b, 0);
        console.log(sum);
        
    }
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col">
                    <h1>ShoshanDevShot</h1>
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">amount</label>
                    <input type="text" onChange={handleChange} name="amount" placeholder="amount" />
                    <br />
                    <label htmlFor="">Date</label>
                    <input type="Date" onChange={handleChange} name="date" placeholder="Date" />
                    <br />
                    <button type="submit" >Submit</button>
                </div>
            </form>
                </div>
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                    {payment?.map((p,i) => {
                        return (
                            <tr key={i}>
                                <td>{p.date}</td>
                                <td>{p.amount}</td>
                            </tr>
                        )
                    })}
                    <tr>
                                <td><h5>Total</h5></td>
                                <td> {totalAmount}</td>
                                
                    </tr>
                        </tbody>
                    </table>
                    <button onClick={test}>test</button>
                </div>
            </div>
        </div>
    );
}
export default ShoshanDevShot;