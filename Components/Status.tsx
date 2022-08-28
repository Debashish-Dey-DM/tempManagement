import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faHouseChimney, faCoins } from '@fortawesome/free-solid-svg-icons';
import styles from './Status.module.css'

const Status = () => {
const shopIcon = <FontAwesomeIcon icon={faShop} />
const homeIcon = <FontAwesomeIcon icon={faHouseChimney} />
const coinIcon = <FontAwesomeIcon icon={faCoins} />
    return (
        <div className={`${styles.status} p-4`}>
            <h3>স্বাগতম Shounak</h3>
            <hr />
            <Row className="justify-content-around">
                {/* ----- blue box ----- */}
                <Col md={3} className={`${styles.box} ${styles.clrBlu} d-flex flex-column px-0 pt-3`}>
                    <span className={styles.icon}>{shopIcon}</span>
                    <h3 className='my-4 text-white'>মোট দোকান : <br/> 01</h3>
                    <span className={styles.view}>view list</span>
                </Col>
                {/* ----- yellow box ----- */}
                <Col md={3} className={`${styles.box} ${styles.clrYlw} d-flex flex-column px-0 pt-3`}>
                <span className={styles.icon}>{homeIcon}</span>
                    <h3 className='my-4 text-whit'>মোট আবাসন : <br/> 01</h3>
                    <span className={styles.view}>view list</span>
                </Col>
                {/* ----- green box ----- */}
                <Col md={3} className={`${styles.box} ${styles.clrGrn} d-flex flex-column px-0 pt-3`}>
                <span className={styles.icon}>{coinIcon}</span>
                    <h3 className='my-4 text-white'>চলতি মাসের আয় : <br/> 01</h3>
                    <span className={styles.view}>view Payement</span>
                </Col>
            </Row>
        </div>
    );
};

export default Status;