import './App.css'
import React, { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [role, setRole] = useState(''); // admin or user

  const handleSignup = (email, password) => {
    // Mock signup logic
    setUser({ email, role: 'user' });
    setRole('user');
    console.log('Signup successful:', email);
  };

  const handleLogin = (email, password) => {
    // Mock login logic
    setUser({ email, role: 'user' });
    setRole('user');
    console.log('Login successful:', email);
  };

  const handleLogout = () => {
    setUser(null);
    setRole('');
    console.log('Logged out successfully');
  };

  const createPaymentRequest = (title, amount) => {
    const newPayment = {
      id: payments.length + 1,
      title,
      amount,
      status: 'Pending',
      user_id: user.email,
    };
    setPayments([...payments, newPayment]);
  };

  const updatePaymentStatus = (paymentId, status) => {
    const updatedPayments = payments.map(payment =>
      payment.id === paymentId ? { ...payment, status } : payment
    );
    setPayments(updatedPayments);
  };

  const uploadDocument = (file) => {
    console.log('Document uploaded successfully:', file.name);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PayGuard - Payment Tracking System</h1>
        {!user ? (
          <div>
            <h2>Login or Signup</h2>
            <button onClick={() => handleSignup('user@example.com', 'password')}>Sign Up</button>
            <button onClick={() => handleLogin('user@example.com', 'password')}>Log In</button>
          </div>
        ) : (
          <div>
            <h2>Welcome, {user.email}</h2>
            <button onClick={handleLogout}>Log Out</button>

            {role === 'admin' ? (
              <div>
                <h3>Admin Dashboard</h3>
                <div>
                  <h4>All Payments</h4>
                  {payments.map(payment => (
                    <div key={payment.id}>
                      <p>Title: {payment.title}</p>
                      <p>Amount: {payment.amount}</p>
                      <p>Status: {payment.status}</p>
                      <button onClick={() => updatePaymentStatus(payment.id, 'Approved')}>Approve</button>
                      <button onClick={() => updatePaymentStatus(payment.id, 'Rejected')}>Reject</button>
                    </div>
                  ))}
                </div>
                <div>
                  <h4>Summary of Payments</h4>
                  <p>Total Payments: {payments.length}</p>
                  <p>Pending: {payments.filter(payment => payment.status === 'Pending').length}</p>
                  <p>Approved: {payments.filter(payment => payment.status === 'Approved').length}</p>
                  <p>Rejected: {payments.filter(payment => payment.status === 'Rejected').length}</p>
                </div>
              </div>
            ) : (
              <div>
                <h3>User Dashboard</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const title = e.target.title.value;
                    const amount = e.target.amount.value;
                    createPaymentRequest(title, amount);
                  }}
                >
                  <input name="title" placeholder="Payment Title" required />
                  <input name="amount" placeholder="Amount" type="number" required />
                  <button type="submit">Create Payment</button>
                </form>
                <h4>Your Payments</h4>
                {payments
                  .filter(payment => payment.user_id === user.email)
                  .map(payment => (
                    <div key={payment.id}>
                      <p>Title: {payment.title}</p>
                      <p>Amount: {payment.amount}</p>
                      <p>Status: {payment.status}</p>
                    </div>
                  ))}
                <input
                  type="file"
                  onChange={(e) => uploadDocument(e.target.files[0])}
                />
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

