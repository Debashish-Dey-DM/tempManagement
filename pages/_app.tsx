import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Dashboard from "../Components/Dashboard";
import Login from "./Authentication/Login";
import styles from "./index.module.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [admin, setAdmin] = useState({
    name: "",
    toKen: "",
  });
  useEffect(() => {
    let uid = localStorage.getItem("uId");
    let nm = localStorage.getItem("ngaLan");
    let tkn = localStorage.getItem(`tImaan${uid}`);
    nm &&
      tkn &&
      setAdmin({
        name: nm,
        toKen: tkn,
      });
  }, []);

  if (admin.name !== "" && admin.toKen !== "") {
    return (
      <Container fluid className="py-0">
        <Row>
          <Col md={2} className={`${styles.leftDashboardPart} bg-secondary`}>
            <Dashboard />
            <div className="text-center mt-3">
              <Button
                variant="danger"
                className="mx-auto"
                onClick={() => {
                  localStorage.clear();
                  location.reload();
                }}
              >
                Logout
              </Button>
            </div>
          </Col>
          <Col md={10} className="ps-0">
            <Component {...pageProps} />
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <Login />;
  }

  // typeof window !== "undefined" && window.location.href = "http://www.w3schools.com";
  // return (
  //  <Login></Login>
  // )
}

export default MyApp;
