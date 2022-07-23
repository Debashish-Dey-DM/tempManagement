import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Button, Col, Container, Row } from "react-bootstrap";
import Dashboard from "../Components/Dashboard";
import Login from "./Authentication/Login";
import styles from "./index.module.css";

const isLogin = false;


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const x = typeof window !== "undefined" && localStorage.getItem("name") && localStorage.getItem("pass") === '123'; //will change pass to random number and add password

  
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
            <Component  {...pageProps} />
          </Col>
        </Row>
      </Container>
    );
   
    // typeof window !== "undefined" && window.location.href = "http://www.w3schools.com";
    // return (
    //  <Login></Login>
    // )
  
}

export default MyApp;
