import { useRef } from "react";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";

const TotalExpense = ({ expenses, totalExpense }: any) => {
  const chk = (p: any) => {
    if (p) {
      if (p.type === "TempDev") {
        return <td>মন্দির উন্নয়ন</td>;
      }
      if (p.type === "FuneralDev") {
        return <td>শ্মশান উন্নয়ন</td>;
      }
      if (p.type === "EmployeeSalary") {
        return <td>সম্মানি-বেতন-ভাতাদি</td>;
      }
      if (p.type === "DailyPuja") {
        return <td>দৈনিক/সাপ্তাহিক পূজা ভাড়া</td>;
      }
      if (p.type === "Appayon") {
        return <td>আপ্যায়ন সভা ও বিশেষ প্রার্থনা</td>;
      }
      if (p.type === "Prosasonik") {
        return <td>প্রশাসনিক ও আইন</td>;
      }
      if (p.type === "ProcharProkashona") {
        return <td>প্রচার প্রকাশনা ও যাতায়াত</td>;
      }
      if (p.type === "OfficeCost") {
        return <td>অফিস স্টেশনারী</td>;
      }
      if (p.type === "SebamulokDan") {
        return <td>সমাজ কল্যাণ কাজ এবং দান অনুদান</td>;
      }
      if (p.type === "UtilityBill") {
        return <td>বিদ্যুৎ, গ্যাস, টেলিফোন</td>;
      }
      if (p.type === "BibidhExpense") {
        return <td>বিবিধ</td>;
      }
      if (p.type === "SpecialFunction") {
        return <td>বিশেষ অনুষ্ঠান</td>;
      }
    }
  };
  //printing functionality
  const componentRef = useRef(null);
  return (
    <div>
      <ReactToPrint
        trigger={() => <Button variant="secondary">Print Expense</Button>}
        content={() => componentRef.current}
        documentTitle="খরচ"
        pageStyle="print"
      />
      <div ref={componentRef}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            {expenses?.map((p: any, i: any) => {
              return (
                <tr key={i}>
                  <td>{new Date(p?.date).toLocaleDateString("bn-BD")}</td>
                  <td>{(p?.amount).toLocaleString("bn-BD")}</td>
                  <td>{chk(p)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h5 style={{ overflow: "hidden" }}>
          মোট ব্যয়: {totalExpense.toLocaleString("bn-BD")}
        </h5>
      </div>
    </div>
  );
};

export default TotalExpense;
