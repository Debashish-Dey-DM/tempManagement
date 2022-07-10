import { Payment, User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';

const HomePayments = () => {
    const [state,setState] = useState(false);
    const [user, setUser] = useState<User>();
    const router = useRouter();
    const [payment1, setPayment1] = useState<Payment[]>()
    const [payment, setpayment] = useState<any>({
        amount: "",
        date: ""
    });
    const id = router.query.id;
  const getData = async () => {
    setState(true);
    await axios.get(`http://localhost:3000/api/Payments/getPaymentByUser/${id}`).then(res => {
      setPayment1(res.data?.payments);
      setUser(res.data?.user);
      
    })
  }
    const handleSubmit = async (e:any) => { 
        e.preventDefault();
        const user_id = user?.user_id.toString();
        const type = "homePayment";
        const amount = payment.amount.toString();
        const newDate = new Date(payment.date);
        const date = newDate.toISOString();
        
        const res = await axios.post(
          `http://localhost:3000/api/Payments/homePayment`,
          { user_id, type, amount, date }
        );
        console.log(res);
        
    }
    const handleChange = (e: any) => { 
        setpayment({
            ...payment,
            [e.target.name]: e.target.value
        });
    }
  const paymentSlip = async (p:any) => {
    const res = await axios.get(`http://localhost:3000/api/Payments/getPaymentByID/${p}`);
    console.log(res.data);
    
    
    
    }
    
    return (
      <div>
        {state ? (
          <>
            <div>
              <h1>Name : {user?.name}</h1>
              <h1>Father Name{user?.fatherName}</h1>
              <h1>Mobile : {user?.mobiile}</h1>
              <h1>NID : {user?.nid}</h1>
              <h1>Due Month : {user?.dueMonth}</h1>
            </div>
            <hr />
            <div>
              <button onClick={getData}>Test</button>
              <form onSubmit={handleSubmit}>
                <label htmlFor="">Date</label>
                <br />
                <input type="date" name="date" onChange={handleChange} />
                <br />
                <label htmlFor="">Amount</label>
                <br />
                <input type="text" name="amount" onChange={handleChange} />
                <br />
                <button type="submit">Submit</button>
              </form>
            </div>
            <div>
                        <h1>Payment History</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payment1?.map((payment: any) => (
                                    <tr key={payment.id}>
                                        <td>{payment.date}</td>
                                        <td>{payment.amount}</td>
                                    <td><button onClick={()=>paymentSlip(payment.id)}>check</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
            </div>
          </>
        ) : (
          <div className="d-flex align-items-center justify-content-center mt-5">
          <div className="text-center">
            <h1 className="mb-4">Want to Home Data? </h1>
            <Button onClick={getData} className="me-2" variant="danger">
              Yes
            </Button>
            <Button variant="success" onClick={() => router.back()}>No</Button>
          </div>
        </div>
        )}
      </div>
    );
}
export default HomePayments
