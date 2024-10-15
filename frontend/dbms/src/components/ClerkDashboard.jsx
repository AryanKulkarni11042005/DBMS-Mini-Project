import { useState, useEffect } from 'react';

import axios from "axios";
import Table from './Table';
import Navbar from './Navbar';
import './container.css';
const ClerkDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [message, setMessage] = useState('');
   

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/accounts');
        if (response.data.message) {
          setMessage(response.data.message);
        } else {
          setAccounts(response.data);
        }
      } catch (error) {
        console.error('Error fetching lectures:', error);
        setMessage('Error fetching lectures');
      }
    };

    fetchAccounts();
  }, []);
  return (
    <div>
      
      <div className="page">
        <h1>Account Statement</h1>
        {message ? (
          <p style={{color: "red"}}>{message}</p>
        ) : (
          <table className="table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Mode Of Payment</th>
            <th>Amount</th>
            <th>Date of Payment</th>
            <th>Transaction ID</th>
            
            
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index}>
              <td>{account.payment_id}</td>
              <td>{account.mode_of_payment}</td>
              <td>{account.amount}</td>
              <td>{account.date_of_payment}</td>
              <td>{account.transaction_id}</td>
              
              
            </tr>
          ))}
        </tbody>
      </table>
        )}
      </div>
    </div>
  )
}

export default ClerkDashboard
