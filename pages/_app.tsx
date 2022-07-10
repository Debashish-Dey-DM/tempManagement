import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Button, Col, Container, Row } from "react-bootstrap";
import Dashboard from "../Components/Dashboard";
import styles from "./index.module.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const x = typeof window !== "undefined" && localStorage.getItem("name") && localStorage.getItem("pass") === '123'; //will change pass to random number and add password

  if (x) {
    return (
      <Container fluid className="py-0">
        <Row>
          <Col md={2} className={`${styles.leftDashboardPart} bg-secondary`}>
            <Dashboard />
            <div className="text-center mt-3">
              <Button
                variant="danger"
                className="mx-auto"
                onClick={() => localStorage.clear()}
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
    // typeof window !== "undefined" && window.location.href = "http://www.w3schools.com";
    return (
     <h2>Bal bal bal</h2>
    )
  }
}

export default MyApp;
