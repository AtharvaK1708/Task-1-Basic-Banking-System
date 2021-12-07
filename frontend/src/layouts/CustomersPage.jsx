import React, { useEffect, useState } from 'react';
import {
  Card,
  Row,
  Container,
  Col,
  Button,
  Modal,
  Form,
  Alert,
} from 'react-bootstrap';
import Header from '../components/Header';
import axios from 'axios';

const CustomersPage = () => {
  const [show, setShow] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [mainCustomer, setMainCustomer] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const addNewTransaction = async (fromName, toName, amount) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      };

      console.log('THIS IS IN FUNCTION : ', { fromName, toName, amount });

      await axios.post(
        'https://tsfbank1708.herokuapp.com/api/transactions',
        {
          fromName,
          toName,
          amount,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomersFromServer = async () => {
    const { data } = await axios.get('/api/customers');
    setCustomers(data);
  };

  useEffect(() => {
    getCustomersFromServer();
  }, [customers]);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (e) => {
    setShow(true);
  };

  const mixedFunction = () => {
    handleShow();
  };

  const [reciever, setReciever] = useState('');
  const [amount, setAmount] = useState(0);

  const [redAlert, setRedAlert] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    if (amount === 0 || amount > mainCustomer.accountBalance) {
      setReciever('');
      setAmount(0);
      setShow(false);
      setRedAlert(true);
    } else {
      addNewTransaction(mainCustomer?.name, reciever, amount);

      setReciever('');
      setAmount(0);
      setShow(false);
      setShowAlert(true);
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <Card className="my-4">
          <Card.Header>
            <h1 style={{ fontWeight: '600' }} id="heading">
              View All Customers
            </h1>

            <Alert className="mt-4" show={showAlert} variant="success">
              <Alert.Heading>Transaction Successful🎉😀</Alert.Heading>
              <p>
                Congratulations! Your transaction was successfull. You can check
                the transaction history in the transactions tab!
              </p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => setShowAlert(false)}
                  variant="outline-success"
                >
                  Click to close!
                </Button>
              </div>
            </Alert>

            <Alert className="mt-4" show={redAlert} variant="danger">
              <Alert.Heading>Transaction Unsuccessfull</Alert.Heading>
              <p>
                Your transaction was unsuccessfull! Make sure that the value's
                you enter are valid.
              </p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => setRedAlert(false)}
                  variant="outline-danger"
                >
                  Click to close!
                </Button>
              </div>
            </Alert>
          </Card.Header>
        </Card>
        {customers.map((customer) => (
          <Row>
            <Col>
              <Card
                key={customer?._id}
                bg="dark"
                text="light"
                className="p-3 my-2"
              >
                <Row>
                  <Col>
                    <Card.Title>Customer Details</Card.Title>
                    <hr />
                    <Card.Text>Customer Name: {customer?.name}</Card.Text>
                    <Card.Text>Customer Email: {customer?.email}</Card.Text>
                    <Card.Text>Customer Contact: {customer?.contact}</Card.Text>
                  </Col>
                  <Col>
                    <Card.Title>Account Details</Card.Title>
                    <hr />
                    <Card.Text>
                      Account Number : {customer?.accountNo}
                    </Card.Text>
                    <Card.Text>
                      Available Balance : &#8377;{customer?.accountBalance}
                    </Card.Text>
                  </Col>
                  <Col className="d-flex align-items-center justify-content-center">
                    <Button
                      disabled={customer.accountBalance === 0}
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
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Amount to transfer</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  min={1}
                  max={mainCustomer.accountBalance}
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
