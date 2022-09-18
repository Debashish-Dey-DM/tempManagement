import axios from "axios";
import { useState } from "react";
const TempDev = () => {
  const [pay, setPay] = useState({
    type: "TempDev",
    date: "",
    amount: "",
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = await axios
      .post("http://localhost:3000/api/Expenses/createExpense", { pay })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "date") {
      const newDate = new Date(value);
      const updatedDate = newDate.toISOString();
      setPay({ ...pay, [name]: updatedDate });
    } else {
      setPay({ ...pay, [name]: value });
    }
  };
  return (
    <div>
      <h1>TempDev</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">amount</label>
          <input
            type="text"
            onChange={handleChange}
            name="amount"
            placeholder="amount"
          />
          <br />
          
          <label htmlFor="">Date</label>
          <input
            type="Date"
            onChange={handleChange}
            name="date"
            placeholder="Date"
          />
          <br />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default TempDev;
