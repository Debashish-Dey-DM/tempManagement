import { Payment } from "@prisma/client";
import axios from "axios";
import { useRouter } from 'next/router'
import styles from "./ShoshanDevDaho.module.css";
import commonStyles from "../../styles/common.module.css";
import { Button, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
const ShoshanDevShot = () => {
    const [payment, setPayment] = useState<Payment[]>();
    const [totalAmount,setTotalAmount] = useState(0);
    const [pay, setPay] = useState({
        type: "ShoshanDevShot",
        date: "",
        amount: "",
    })

  const router = useRouter();

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
    router.reload()
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
        <div className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey}`}>
          <Container
            className={`${commonStyles.commonForm} ${styles.minHeight35} py-3`}
          >
            <h3>Shoshan Dev sot</h3>
            <Row className="row">
              <div className="col-lg-5 col-md-12">
                <form onSubmit={handleSubmit} className="position-fixed ">
                  <div>
                    {/* myCode */}
                    <h6>??????????????????</h6>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        placeholder="Amount"
                        name="amount"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                    <h6>???????????????</h6>
                    <div className="input-group mb-3">
                      <input
                        type="Date"
                        placeholder="Dates"
                        name="date"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                    {/* myCode */}
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
              </div>
              {/* table data  */}
              <div className={`col-lg-7 col-md-12 ${styles.tblData}`}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>???????????????</th>
                      <th>??????????????????</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payment?.map((p, i) => {
                      return (
                        <tr key={i}>
                          <td>{new Date(p.date).toLocaleDateString("bn-BD")}</td>
                          <td>{p.amount}</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td>
                        <h6>
                          <strong>?????????</strong>
                        </h6>
                      </td>
                      <td>
                        {" "}
                        <strong>{totalAmount}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Row>
          </Container>
        </div>
      );

    // prev code
    // return (
    //     <div className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey}`}>
    //         <Container
    //     className={`${commonStyles.commonForm} ${styles.minHeight35} py-3`}
    //   >
        
    //     <h3>ShoshanDevShot</h3>
    //     <Row>
    //             <div className="col-lg-5 col-md-12">
    //             <form onSubmit={handleSubmit}>
    //             <div>
    //                 <label htmlFor="">??????????????????</label>
    //                 <input type="text" onChange={handleChange} name="amount" placeholder="amount" />
    //                 <br />
    //                 <label htmlFor="">Date</label>
    //                 <input type="Date" onChange={handleChange} name="date" placeholder="Date" />
    //                 <br />
    //                 <button type="submit" >Submit</button>
    //             </div>
    //         </form>
    //             </div>
    //             <div className="col">
    //                 <table className="table">
    //                     <thead>
    //                         <tr>
    //                             <th>Date</th>
    //                             <th>Amount</th>
                                
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                 {payment?.map((p,i) => {
    //                     return (
    //                         <tr key={i}>
    //                             <td>{p.date}</td>
    //                             <td>{p.amount}</td>
    //                         </tr>
    //                     )
    //                 })}
    //                 <tr>
    //                             <td><h5>Total</h5></td>
    //                             <td> {totalAmount}</td>
                                
    //                 </tr>
    //                     </tbody>
    //                 </table>
    //                 <button onClick={test}>test</button>
    //             </div>
    //             </Row>
    //         </Container>
    //     </div>
    // );
}
export default ShoshanDevShot;