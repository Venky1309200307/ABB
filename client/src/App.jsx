import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import SignSuccess from './SignSuccess'
import Home2 from './Home2'
import Auction from './Auction'
import CreateItem from './CreateItem'
import Bidding from './Bidding';
import UpdateItem from './UpdateItem'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path='/register' element={<Signup/>}></Route>
          <Route path='/signsuccess' element={<SignSuccess/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/home2' element={<Home2/>}></Route>
          <Route path='/auction' element={<Auction/>}></Route>
          <Route path='/create' element={<CreateItem/>}></Route>
          <Route path='/update/:id' element={<UpdateItem/>}></Route>
          <Route path='/bidding' element={<Bidding/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
