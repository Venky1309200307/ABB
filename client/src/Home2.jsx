// Home2.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';
import axios from 'axios';
import './Home2.css';
import logo from './logo.png';

function Home2(){
    const [userName, setUserName] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      axios.get('http://localhost:3001/home', { withCredentials: true })
        .then(result => {
          if (result.data.message === "Success") {
            // Assuming you have the username in the response
            setUserName(result.data.name); // Adjust this line if the response structure is different
          } else {
            navigate('/login');
          }
        })
        .catch(err => {
          console.log(err);
          navigate('/login');
        });
    }, [navigate]);

    useEffect(() => {
      axios.get('http://localhost:3001/auc')
          .then(result => setUsers(result.data))
          .catch(err => console.log(err));
  }, [navigate]);
  
    const handleClick1= () => {
      axios.post('http://localhost:3001/logout', {}, { withCredentials: true })
        .then(() => {
          navigate('/home');
        })
        .catch(err => console.log(err));
    };

    return(
        <>
        <div className='thala'>
        <header className="header">
            <div className='divide'>
                <div className="logo">
                    <img src={logo} alt="Genix Auctions" />
                </div>
                <div className="div1">
                    <a href='./home2'>Items</a>
                    <a href='./auction'>Auctions</a>
                </div>
                <div className='div3'>
                    <button className='b1' onClick={handleClick1}>Logout</button>
                </div>
            </div>
        </header>
        <div className='div2'>
          <h1 className='h1'>Welcome <span className='spa'>{userName}</span></h1>
        </div>
        <div className='container'>
        <tbody className='table'>
          {users.map(user => (
          <td key={user.id} className='tabdata'>
            <img src={user.image} alt={user.name} /><hr></hr>
            <div className="bg-success text-white rounded p-2" style={{ display: 'inline-block' }}>{user.status}</div><br></br>
            <strong>{user.name}</strong>
            <p><strong>MinBid:</strong>{user.minbid}</p>
            <p><strong>CurrentBid:</strong>{user.currentbid}</p>
            <p><strong>Ends In:</strong><CountdownTimer endsin={user.endsin} /></p>
          </td>
          ))}
        </tbody>
        </div>
        </div>
        </>
    )
}

export default Home2;
