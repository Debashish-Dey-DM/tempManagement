import axios from "axios";
import { Payment } from "@prisma/client";
import React, { useState } from "react";
const TotalReport = () => {
  const [dates, setDates] = useState({
    from: "",
    to: "",
  });
  const [type, setType] = useState("");
  const [total, setTotal] = useState(0);
  const [expenses, setExpenses] = useState<Payment[]>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = await axios
      .get(
        `http://localhost:3000/api/report/expenses/${dates.from}/${dates.to}/${type}`
      )
      .then((res) => {
        setExpenses(res.data?.payments);
        setTotal(res.data?.total);
        console.log(res.data);
      });
  };
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
        
      </div>
    </div>
  );
};
export default TotalReport;
