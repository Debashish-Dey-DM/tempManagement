import axios from "axios";
import { Payment } from "@prisma/client";
import React, { useState } from "react";
const TotalReport = () => {
  const [dates, setDates] = useState({
    from: "",
    to: "",
  });
  const [total,setTotal]=useState<number>(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenses, setExpenses] = useState<Payment[]>();
  const [payments, setPayments] = useState<Payment[]>();


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = await axios
      .get(
        `http://localhost:3000/api/report/totalreport/${dates.from}/${dates.to}`
      )
      .then((res) => {
        setExpenses(res.data?.expenses);
        setPayments(res.data?.payments);
        setTotalIncome(res.data?.sumOfIncome);
        setTotalExpense(res.data?.sumOfExpense);
        setTotal(res.data?.total)
        console.log(res.data);
      });
  };
  const test =async (e:any) => {
    e.preventDefault();
    console.log(dates);
    
  }
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    const newDate = new Date(value);
    const updatedDate = newDate.toISOString();
    setDates({ ...dates, [name]: updatedDate });
  };
  return (
    <div>
      <div className="container-xxl">
        <form onSubmit={handleSubmit}>
                    <div className="row">
                    
                    <div className="col-8">
                            <h5><button type="submit">Generate</button></h5>
                            <h5>TOTAL : {total}</h5>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments?.map((p, i) => {
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
                            <h5>Total Aay : {totalIncome}</h5>
                            
                    </div>
                    <div className="col-8">
                            <h5><button type="submit">Generate</button></h5>
                            TOTAL : {totalExpense}
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
                            
                            <h5>Total Bey: {totalExpense}</h5>
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
  );
};
export default TotalReport;
