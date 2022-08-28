import { useRef } from "react";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";

const TotalExpense = ({ expenses }) => {
  //printing functionality
  const componentRef = useRef();
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
            <tr>
              <td>1/1/1</td>
              <td>12.50</td>
              <td>barivara</td>
            </tr>
            <tr>
              <td>2/2/2</td>
              <td>22.50</td>
              <td>barivara</td>
            </tr>

            {expenses?.map((p, i) => {
              return (
                <tr key={i}>
                  <td>{p?.date}</td>
                  <td>{p?.amount}</td>
                  <td>{p?.type}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalExpense;
