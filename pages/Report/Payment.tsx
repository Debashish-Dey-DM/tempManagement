import axios from "axios";
import { Payment } from "@prisma/client";
import React, { useState } from "react";
const Payment = () => {
    const [dates, setDates] = useState({
        from: "",
        to: ""
    })
    const [payments, setPayments] = useState<Payment[]>();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        const result = await axios.get(`http://localhost:3000/api/report/payments/${dates.from}/${dates.to}`,).then(res => {
            setPayments(res.data);
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
                    <h5>
                        FROM
                    </h5>
                    <input type="Date" name="from" onChange={handleChange} />
                    </div>
                    <div className="col-8">
                            <h5><button type="submit">Generate</button></h5>
                            {payments?.map((p, i) => {
                                return (
                                    <h5>Hello</h5>
                                )
                            })}
                    </div>
                    <div className="col">
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