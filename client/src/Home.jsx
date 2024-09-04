import axios from 'axios'
import { useNavigate } from "react-router-dom";
import './Home.css';
import logo from './logo.png';
import home2 from './home2.png';
import onlylogo from './onlylogo.png'

function Home(){
    const navigate=useNavigate();
    const handleClick1 = () => {
        navigate("/login")
    };
    const handleClick2 = () => {
        navigate("/register")
    };
    const handleClick=()=>{
        axios.defaults.withCredentials=true;
        axios.get('http://localhost:3001/home')
        .then(result=>{console.log(result)
            if(result.data.message!=="Success"){
                navigate('/login')
            }
            else{
                navigate('/auction')
            }
        })
        .catch(err=>console.log(err))
    };
    const handleClick3=()=>{
        axios.defaults.withCredentials=true;
        axios.get('http://localhost:3001/home')
        .then(result=>{console.log(result)
            if(result.data.message!=="Success"){
                navigate('/login')
            }
            else{
                navigate('/home2')
            }
        })
        .catch(err=>console.log(err))
    };
    return(
        <>
        <header className="header">
            <div className='divide'>
                <div className="logo">
                    <img src={logo} alt="Genix Auctions" />
                </div>
                <div className="div1">
                    <a onClick={handleClick3}>Items</a>
                    <a onClick={handleClick}>Auctions</a>
                    <a>About Us</a>
                </div>
                <div className='div3'>
                    <button className='b1' onClick={handleClick1}>Login</button>
                    <button className='b2' onClick={handleClick2}>Get Started</button>
                </div>
            </div>
        </header>
        <img src={home2} alt="Home Image" className='img1'></img>
        <div className='div2' onClick={handleClick}>
            <h1 className='h1'>Explore <span className='spa'>Auctions</span></h1>
        </div>
        <footer className="foot">
            <div className="div4">
                <img src={onlylogo} alt="Genix Auctions" />
                <span>Genix Auctions</span>
            </div>
            <hr className="line"/>
            <p className="para">© 2024 Genix Auctions. All rights reserved.</p>
        </footer>
        </>
    )
}

export default Home;