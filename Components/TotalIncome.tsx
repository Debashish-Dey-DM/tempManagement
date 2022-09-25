import { useRef } from "react";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";

const TotalIncome = ({ payments, totalIncome }: any) => {
  const chk = (p: any) => {
    if (p) {
      if (p.type === "ShoshanDevDaho") {
        return <td>শ্মশান - (দাহ সনদ)</td>;
      }

      if (p.type === "ShoshanDevShot") {
        return <td>শ্মশান - (সৎকার)</td>;
      }
      if (p.type === "Dighi") {
        return <td>দিঘী লিজ</td>;
      }
      if (p.type === "DanBox") {
        return <td>দান-অনুদান</td>;
      }
      if (p.type === "BuySell") {
        return <td>দোকান-ঘর-অন্যান্য ক্রয়-বিক্রয় বাবদ</td>;
      }
      if (p.type === "SosanSomadhi") {
        return <td>শ্মশানস্থ সমাধি ও অন্যান্য</td>;
      }
      if (p.type === "JinisPotroPrapti") {
        return <td>জিনিস পত্রাদি প্রাপ্তি</td>;
      }
      if (p.type === "CommitteeChada") {
        return <td>কমিটি সদস্যদের চাঁদা</td>;
      }
      if (p.type === "Dighi") {
        return <td>দিঘী</td>;
      }
      if (p.type === "ProkashonaProchar") {
        return <td>প্রকাশনা ও প্রচার</td>;
      }
      if (p.type === "Bibidh") {
        return <td>বিবিধ</td>;
      }

      if (p.type === "shopPayment") {
        return <td>দোকান ভাড়া</td>;
      }

      if (p.type === "homePayment") {
        return <td>ঘর ভাড়া</td>;
      }

      if (p.type === "Others") {
        return <td>অন্যান্য প্রাপ্তি</td>;
      }
    }
  };

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
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((p: any, i: any) => {
              chk(p);
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
          মোট আয়: {totalIncome.toLocaleString("bn-BD")}
        </h5>
      </div>
    </div>
  );
};

export default TotalIncome;
