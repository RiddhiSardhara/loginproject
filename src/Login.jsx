import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Api = () => {
  const [data, setdata] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const nameRef = useRef();
  const quantityRef = useRef();
  const priceRef = useRef();
  const expiryRef = useRef();

  // Fetch data
  const fetchData = () => {
    axios.get("http://localhost:3001/post").then((res) => {
      setdata(res.data);
    });
  };

  // Add data
  const handleSubmit = () => {
    const newData = {
      name: nameRef.current.value,
      quantity: quantityRef.current.value,
      price: priceRef.current.value,
      expiry: expiryRef.current.value,
    };

    axios.post("http://localhost:3001/post", newData).then((res) => {
      console.log(res.data);
      setdata([...data, res.data]);
    });
  };

  // Delete data
  const deleteData = (id) => {
    axios.delete(`http://localhost:3001/post/${id}`).then((res) => {
      console.log(res);
      setdata(data.filter((val) => val.id !== id));
    });
  };

  // Handle login form submit
  const handleLoginSubmit = () => {
    // Perform validation (replace with your actual validation logic)
    if (username === 'riddhi' && password === '123456') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  // Handle view button click
  const handleView = (id) => {
    const selected = data.find((val) => val.id === id);
    setSelectedCard(selected);
  };

  useEffect(() => {
    // Fetch data
    fetchData();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {isLoggedIn ? (
        // Card page
        <>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <input type="text" name="name" ref={nameRef} style={{ marginBottom: '10px', padding: '5px' }} placeholder="Name" />
            <input type="number" name="quantity" ref={quantityRef} style={{ marginBottom: '10px', padding: '5px' }} placeholder="Quantity" />
            <input type="text" name="price" ref={priceRef} style={{ marginBottom: '10px', padding: '5px' }} placeholder="Price" />
            <input type="number" name="expiry" ref={expiryRef} style={{ marginBottom: '10px', padding: '5px' }} placeholder="Expiry" />
            <button onClick={handleSubmit} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', cursor: 'pointer' }}>Add</button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {data?.map((val, ind) => (
              <div className="card" style={{ width: "18rem", margin: '10px' }} key={ind}>
                <div className="card-body">
                  <h5 className="card-title">name : {val.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted"> quantity : {val.quantity}</h6>
                  <button onClick={() => deleteData(val.id)} style={{ backgroundColor: '#ff0000', color: 'white', padding: '5px', cursor: 'pointer' }}>Delete</button>
                  <button onClick={() => handleView(val.id)} style={{ backgroundColor: '#ff0000', color: 'white', padding: '5px', cursor: 'pointer' }}>View</button>
                </div>
              </div>
            ))}
          </div>

          {selectedCard && (
            <div>
              <h2>Selected Card Details</h2>
              <p>Name: {selectedCard.name}</p>
              <p>Quantity: {selectedCard.quantity}</p>
              <p>price: {selectedCard.quantity}</p>
              <p>expiry: {selectedCard.expiry}</p>
            </div>
          )}
        </>
      ) : (
        // Login form
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ marginBottom: '20px' }}>Login Form</h1>
          <input type="text" name="user" value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginBottom: '10px', padding: '5px' }} placeholder="Username" />
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: '10px', padding: '5px' }} placeholder="Password" />
          <button onClick={handleLoginSubmit} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', cursor: 'pointer' }}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Api;
