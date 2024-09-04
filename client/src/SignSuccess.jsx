import { useNavigate } from 'react-router-dom';
import './SignSuccess.css'
import logo from './logo.png'; 
import trophy from './trophy.png';

function SignSuccess(){
    const navigate=useNavigate()
    const handleClick = () => {
        navigate("/login")
    };
    return(
        <>
        <header className="header">
            <img src={logo} alt="Genix Auctions Logo" />
        </header>
        <div className="text">
            <h2 className="head2">Uncover Deals, Unleash Excitement: <span className="spa">Dive into Our Auctions Today!</span></h2>
        </div>
        <div className="message">
          <img src={trophy} alt="Trophy" />
        </div>
        <button className="login-btn" onClick={handleClick}>Login now</button>
    </>
    )

}

export default SignSuccess;