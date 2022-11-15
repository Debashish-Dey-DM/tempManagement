import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';

const TotalIncome = ({payments}) => {
    
  //printing functionality
  const componentRef = useRef();
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
                  {payments?.map((p, i) => {
                  return (
                    <tr key={i}>
                      <td>{p?.date}</td>
                      <td>{p?.amount}</td>
                      <td>{p?.type}</td>
                    </tr>
                  );
                })}

                  <tr>
                    <td>10/12/2021</td>
                    <td>500</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>500</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>100</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>600</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>200</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>500</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>800</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>900</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>500</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>200</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>300</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>400</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>700</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>100</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>600</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>500</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>300</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>500</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>500</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>100</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>600</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>200</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>500</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>800</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>900</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>500</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>200</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>300</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>400</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>700</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>100</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>600</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>500</td>
                    <td>Dokan</td>
                  </tr>
                  <tr>
                    <td>10/12/2021</td>
                    <td>300</td>
                    <td>Dokan</td>
                  </tr>
                 
                </tbody>
              </table>
            </div>
        </div>
    );
};

export default TotalIncome;