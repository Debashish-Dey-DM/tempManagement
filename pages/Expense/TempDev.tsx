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
          {/* <label htmlFor="">Month</label>
                    <select name="Month" id="">
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select> */}
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
