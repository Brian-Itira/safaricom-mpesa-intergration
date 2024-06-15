import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  const payNow = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/token', { // replace with your actual backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, amount }),
      });

      const data = await response.json();
      console.log('Payment response:', data);
    } catch (error) {
      console.error('Error making payment:', error);
    }
  };

  return (
    <>
      <form className='form' onSubmit={payNow}>
        <h1>SAFARICOM <span className='mpesa-text'>M-PESA</span></h1>
        <input
          type='text'
          placeholder='safaricom phone number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type='number'
          placeholder='Enter amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type='submit'>
          PAY NOW
        </button>
        <p>&copy; 2023 Brian Itira. All rights reserved.</p>
      </form>
      <p className='footer'>&copy; 2023 Brian Itira. All rights reserved.</p>
    </>
  );
};

export default App;
