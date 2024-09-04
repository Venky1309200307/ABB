import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CountdownTimer from './CountdownTimer';
import './Bidding.css';

function Bidding() {
    const { state } = useLocation();
    const [user, setUser] = useState(state?.user || {});
    const [userName, setUserName] = useState('');
    const [bid, setBidAmount] = useState('');
    const [view, setReview] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/home', { withCredentials: true })
            .then(result => {
                if (result.data.message === "Success") {
                    setUserName(result.data.name);
                    setUserEmail(result.data.email);
                } else {
                    navigate('/login');
                }
            })
            .catch(err => {
                console.log(err);
                navigate('/login');
            });

        // Fetch the latest auction item data
        axios.get(`http://localhost:3001/auct/${user.name}`)
        .then(result => {
            setUser(result.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, [navigate, user.name]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseFloat(bid) > parseFloat(user.currentbid)) {
            axios.post("http://localhost:3001/bid", { Itemname: user.name, userEmail, userName, bid })
                .then(result => {
                    console.log(result);
                    setUser(prevUser => ({
                        ...prevUser,
                        currentbid: bid,
                        history: [...prevUser.history, { user: userName, bidamt: bid }]
                    }));
                    setBidAmount(''); 
                    setError(''); // Clear any previous error messages
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            setError('Bid must be higher than the current bid.');
        }
    };

    const handleSubmit1 = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/rev", { Itemname: user.name, userName, view })
            .then(result => {
                console.log(result);
                setUser(prevUser => ({
                    ...prevUser,
                    review: [...prevUser.review, { user: userName, content: view }]
                }));
                setReview(''); 
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="container">
            <a href='/auction' className='mb-5 d-block'>Back to catalog</a>
            <div className="row">
                <div className="col-md-4 mt-0">
                    {user ? (
                        <div className="container container-small">
                            <div className="card p-3">
                                <img src={user.image} alt={user.name} className="img-fluid mb-3 small-image" />
                                <div className="bg-success text-white rounded p-2 mb-3" style={{ display: 'inline-block' }}>
                                    {user.status}
                                </div>
                                <h2 className="mb-3">{user.name}</h2>
                                <p className="mb-2">Min Bid: {user.minbid}</p>
                                <p>Current Bid: {user.currentbid}</p>
                                <p>Ends In: <CountdownTimer endsin={user.endsin} /></p>
                            </div>
                        </div>
                    ) : (
                        <p>No auction information available.</p>
                    )}
                </div>
                <div className="col-md-4 mt-3">
                    <div className="history-container">
                        <form onSubmit={handleSubmit1}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Enter Review"
                                    name="review"
                                    className="form-control rounded-0"
                                    value={view}
                                    onChange={(e) => setReview(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success w-100 rounded-0">Post Review</button>
                        </form>
                        <h3>Reviews<hr></hr></h3>
                        {user.review && user.review.length > 0 ? (
                            user.review.map((view, index) => (
                                <p key={index}><strong>{view.user}</strong> <br></br>{view.content}<hr></hr></p>
                            ))
                        ) : (
                            <p>No Reviews yet.</p>
                        )}
                    </div>
                </div>
                <div className="col-md-4 mt-3">
                    <div className="history-container1">
                        {error && <p className="text-danger">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Enter Bid Amount"
                                    name="bidamt"
                                    className="form-control rounded-0"
                                    value={bid}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success w-100 rounded-0">Bid</button>
                        </form>
                        <h3>Bid History</h3>
                        {user.history && user.history.length > 0 ? (
                            user.history.map((bid, index) => (
                                <p key={index}>{bid.user} <strong>bids</strong> ${bid.bidamt}</p>
                            ))
                        ) : (
                            <p>No bids placed yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bidding;
