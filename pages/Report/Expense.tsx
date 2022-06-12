import axios from "axios";
import { Payment } from "@prisma/client";
import React, { useState } from "react";
const Payment = () => {
    const [dates, setDates] = useState({
        from: "",
        to: "",
    })
    const [type,setType] = useState("");
    const [total,setTotal] = useState(0);
    const [expenses, setExpenses] = useState<Payment[]>();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        const result = await axios.get(`http://localhost:3000/api/report/expenses/${dates.from}/${dates.to}/${type}`,).then(res => {
            setExpenses(res.data?.payments);
            setTotal(res.data?.total);
            console.log(res.data);
            
        })

    }
    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        const newDate = new Date(value)
        const updatedDate = newDate.toISOString();
        setDates({ ...dates, [name]: updatedDate })
        
        

    }
    return (
        <div>
            <div className="container-xxl">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                    <div className="col">
                            <h1>Here will be the list</h1>
                            <select name="category"  onClick={(e:any)=>setType(e.target.value)}>
                                <option value="" disabled  selected>Select</option>
                                <option value="TempDev">TempDev</option>
                                <option value="newCategory">newCategory</option>
                                <option value="newCategory">newCategory</option>
                                <option value="newCategory">newCategory</option>
                                <option value="newCategory">newCategory</option>
                                <option value="newCategory">newCategory</option>
                                <option value="newCategory">newCategory</option>
                                <option value="newCategory">newCategory</option>
                                <option value="newCategory">newCategory</option>
                                
                            </select>
                    </div>
                    <div className="col-8">
                            <h5><button type="submit">Generate</button></h5>
                            <h4>Type: {type}</h4>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenses?.map((p, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{p?.date}</td>
                                            <td>{p?.amount}</td>
                                            <td>{p?.type}</td>
                                        </tr>
                                     )
                                 })}
                                </tbody>
                            </table>
                            
                            <h4>Total: {total}</h4>
                    </div>
                    <div className="col">
                    <h5>
                        FROM
                    </h5>
                    <input type="Date" name="from" onChange={handleChange} />
                    <h5>
                        TO
                    </h5>
                     <input type="Date" name="to" onChange={handleChange} />
                    </div>
                </div>
                </form>
                
            </div>
        </div>
    )
}
export default Payment;