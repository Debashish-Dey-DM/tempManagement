import React from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import { Button } from "react-bootstrap";
const PaymentHistory = ()=>{
    const router = useRouter();
    const id = router.query.id;
    const getUserData = async ()=>{
        const res = await axios.get("http://localhost:3000/api/Payments/getPaymentByUser/1");
        console.log(res.data);
        
    }
    return(
        <div>
        <h1>Payment History {id} </h1>
        <Button onClick={getUserData}>test</Button>
        </div>
    );
}
export default PaymentHistory;