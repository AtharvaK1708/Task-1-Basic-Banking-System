import React, { useState, useEffect } from 'react';
import { Card, Container, Table } from 'react-bootstrap';
import Header from '../components/Header';
import moment from 'moment';
import axios from 'axios';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  const getAllTransactionsFromServer = async () => {
    const { data } = await axios.get('/api/transactions');
    setTransactions(data);
  };

  useEffect(() => {
    getAllTransactionsFromServer();
  });

  return (
    <div>
      <Header />
      <Container>
        <Card className="my-4">
          <Card.Header>
            <h1 style={{ fontWeight: '600' }}>View All Transactions</h1>
          </Card.Header>
        </Card>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Sender's Name</th>
              <th>Reciever's Name</th>
              <th>Amount Transfered</th>
              <th>Date and Time of Transfer</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, i) => (
              <tr key={transaction?._id}>
                <td>{i + 1}</td>
                <td>{transaction?.fromName}</td>
                <td>{transaction?.toName}</td>
                <td>&#8377; {transaction?.amount}</td>
                <td>
                  {moment(
                    new Date(transaction.createdAt),
                    'ddd DD-MMM-YYYY, hh:mm A'
                  ).format('ddd DD/MM/YYYY hh:mm A')}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default TransactionsPage;
