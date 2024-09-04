// AuthProvider.jsx
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const login = (email, password) => {
    axios.post('http://localhost:3001/login', { email, password }, { withCredentials: true })
      .then(result => {
        console.log(result.data); // Log the result to ensure it contains the expected data
        if (result.data.message === "Success") {
          setIsAuthenticated(true);
          setUserName(result.data.name); // Set username here
          localStorage.setItem('token', result.data.token); // Store token
          navigate('/home2');
        } else {
          navigate('/register');
        }
      })
      .catch(err => console.log(err));
  };

  const logout = () => {
    axios.post('http://localhost:3001/logout', {}, { withCredentials: true })
      .then(() => {
        setIsAuthenticated(false);
        setUserName('');
        localStorage.removeItem('token'); // Remove token
        navigate('/home');
      })
      .catch(err => console.log(err));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };
