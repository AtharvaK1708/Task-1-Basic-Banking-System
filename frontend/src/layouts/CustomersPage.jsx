import React, { useEffect, useState } from 'react';
import {
  Card,
  Row,
  Container,
  Col,
  Button,
  Modal,
  Form,
} from 'react-bootstrap';
import Header from '../components/Header';
import axios from 'axios';

const CustomersPage = () => {
  const [show, setShow] = useState(false);
  const [mainCustomer, setMainCustomer] = useState({});

  const [customers, setCustomers] = useState([]);

  const getCustomersFromServer = async () => {
    const { data } = await axios.get('/api/customers');
    setCustomers(data);
  };

  useEffect(() => {
    getCustomersFromServer();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    // console.log(e);
    setShow(true);
  };

  const mixedFunction = () => {
    console.log(mainCustomer);
    handleShow();
    // setCustomer(customer);
  };

  const [reciever, setReciever] = useState('');
  const [amount, setAmount] = useState(0);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(reciever, amount);

    setReciever('');
    setAmount(0);
    setShow(false);
  };

  return (
    <div>
      <Header />
      <Container>
        <Card className="my-4">
          <Card.Header>
            <h1 style={{ fontWeight: '600' }}>View All Customers</h1>
          </Card.Header>
        </Card>
        {customers.map((customer) => (
          <Row>
            <Col>
              <Card bg="dark" text="light" className="p-3 my-2">
                <Row>
                  <Col>
                    <Card.Title>Customer Details</Card.Title>
                    <hr />
                    <Card.Text>Customer Name: {customer.name}</Card.Text>
                    <Card.Text>Customer Email: {customer.email}</Card.Text>
                    <Card.Text>Customer Contact: {customer.contact}</Card.Text>
                  </Col>
                  <Col>
                    <Card.Title>Account Details</Card.Title>
                    <hr />
                    <Card.Text>Account Number : {customer.accountNo}</Card.Text>
                    <Card.Text>
                      Available Balance : &#8377;{customer.accountBalance}
                    </Card.Text>
                  </Col>
                  <Col className="d-flex align-items-center justify-content-center">
                    <Button
                      style={{ width: '360px', height: '50px' }}
                      variant="outline-info"
                      onClick={(e) => {
                        setMainCustomer(customer);
                        mixedFunction();
                      }}
                    >
                      Transfer Money from this Account
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        ))}
        <Modal centered show={show} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Transfer Money</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  From : <h3 className="my-2">{mainCustomer.name}</h3>
                  <small className="text-muted ">{mainCustomer.email}</small>
                  <h5 className="mt-2">
                    Available Balance : &#8377;{mainCustomer.accountBalance}
                  </h5>
                </Form.Label>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>To : </Form.Label>
                <Form.Select
                  aria-label="Select Customer"
                  onChange={(e) => setReciever(e.target.value)}
                >
                  <option>Select a customer</option>
                  {customers.map((customer) => (
                    <option value={customer.name}>{customer.name}</option>
                  ))}
                </Form.Select>
                {/* <Form.Control
                  type="text"
                  value={reciever}
                  placeholder="Enter reciever"
                  
                /> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Amount to transfer</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  placeholder="Amount to be transfered"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Send Money
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default CustomersPage;
