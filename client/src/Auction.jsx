import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import CountdownTimer from './CountdownTimer';
import './Auction.css';
import logo from './logo.png';

function Auction() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); 

    const handleDelete=(id)=>{
        axios.delete('http://localhost:3001/deleteUser/'+id)
        .then(result=>{console.log(result)
            window.location.reload()
        })
        .catch(err=>console.log(err))
    }

    const handleClick1 = () => {
        axios.post('http://localhost:3001/logout', {}, { withCredentials: true })
            .then(() => navigate('/home'))
            .catch(err => console.log(err));
    };

    const handleClick = (user) => {
        console.log("User:", user); 
        navigate('/bidding', { state: { user } }); 
    };

    useEffect(() => {
        axios.get('http://localhost:3001/auc')
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
            axios.get('http://localhost:3001/home', { withCredentials: true })
            .then(result => {
                if (result.data.message === "Success") {
                    setCurrentUser(result.data.name); // Set current user name
                } else {
                    navigate('/login');
                }
            })
            .catch(err => {
                console.log(err);
                navigate('/login');
            });
    }, [navigate]);

    return (
        <>
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
            <div className="d-flex vh-100 bg-pale-white justify-content-center align-items-center" style={{ backgroundColor: '#f5f5f5' }}>
                <div className="w-50 bg-white rounded p-3">
                    <Link to="/create" className="btn btn-success">Add Item for Auction</Link>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Status</th>
                                <th>Name</th>
                                <th>Min Bid</th>
                                <th>Current Bid</th>
                                <th>Ends In</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td><img src={user.image} alt={user.name} /></td>
                                    <td><div className="bg-success text-white rounded p-2" style={{ display: 'inline-block' }}>{user.status}</div></td>
                                    <td>{user.name}</td>
                                    <td>{user.minbid}</td>
                                    <td>{user.currentbid}</td>
                                    <td><CountdownTimer endsin={user.endsin} /></td>
                                    <td>
                                        {user.status === 'Live' && (
                                        <>
                                        <button onClick={() => handleClick(user)}>Bid Now</button>
                                        {currentUser === user.seller && (
                                            <>
                                                <Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link>
                                                <button className="btn btn-danger" onClick={(e) => handleDelete(user._id)}>Delete</button>
                                            </>
                                        )}
                                        </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Auction;
