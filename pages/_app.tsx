import styles from './index.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import Dashboard from '../Components/Dashboard'
import type { AppProps } from 'next/app'
import { Col, Container, Row } from 'react-bootstrap'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container fluid className='py-0'>
      <Row>
        <Col md={2} className={`${styles.leftDashboardPart} bg-secondary`}><Dashboard/></Col>
        <Col md={10} className="ps-0"><Component {...pageProps} /></Col>
      </Row>
    </Container>
    )
}

export default MyApp
