import { useRef } from "react";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";

const TotalIncome = ({ totalIncome, paymentProps }: any) => {
  //printing functionality
  const componentRef = useRef(null);

  return (
    <div>
      <ReactToPrint
        trigger={() => <Button variant="secondary">Print income</Button>}
        content={() => componentRef.current}
        documentTitle="ইনকাম"
        pageStyle="print"
      />
      <div ref={componentRef}>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th scope="col">আয়ের ধরন </th>
              <th scope="col">পরিমাণ</th>
            </tr>
          </thead>
          <tbody>
            {paymentProps?.map((p: any, i: any) => {
               return (
                p.amount>0 && <tr key={i}>
                  <td>{p?.name}</td>
                  <td>{(p?.amount).toLocaleString("bn-BD")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h5 style={{ overflow: "hidden" }}>
          মোট আয়: {totalIncome.toLocaleString("bn-BD")}
        </h5>
      </div>
    </div>
  );
};

export default TotalIncome;
