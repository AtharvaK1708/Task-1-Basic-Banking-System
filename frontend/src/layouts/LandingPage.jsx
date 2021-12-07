import React, { Fragment } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../components/Header';

const LandingPage = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Container>
          <Row>
            <Col
              style={{
                position: 'relative',
                top: '13rem',
              }}
              lg={6}
              sm={12}
            >
              <h1>
                Welcome,
                <br /> to TSF Online Banking Services
              </h1>
              <br />
              <h3 className="responsive" style={{ fontWeight: '600' }}>
                Lightning fast money transfers at the click of a button!
              </h3>
            </Col>
            <Col sm={12} lg={6}>
              <img
                style={{ position: 'relative', top: '20%', left: '6.2rem' }}
                src="/images/vector3.png"
                alt="vector"
              />
            </Col>
          </Row>
        </Container>
      </main>
    </Fragment>
  );
};

export default LandingPage;
