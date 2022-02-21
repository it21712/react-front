import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate, useLocation, Outlet} from "react-router-dom";
import Navigation from './Navigation';
import Home from './pages/Home';
import Authentication from './Authentication';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ViewPending from './pages/ViewPending';
/* import VerifyPet from './pages/VerifyPet'; */
import UpdatePet from './pages/UpdatePet';
import AddPet from './pages/AddPet';
import ViewPets from './pages/ViewPets';
import FindPets from './pages/FindPets';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react/cjs/react.production.min';

function App() {


  const [user, setUser] = useState({role:'ROLE_ANONYMOUS', loggedIn:false})

  const checkLoggedIn = async () => {
    fetch('http://localhost:8080/logged_in',
    {
      mode:'cors',
            credentials:'include',
            headers: new Headers({
               
                "X-Requested-With": "XMLHttpRequest"
            })
      
    }
    )
    .then(response => response.json())
    .then(data => {
      let responseRole = ''
      data.authorities.forEach(function (item, index) {
        console.log(item.role)
        if(item.role.startsWith('ROLE')) {
          console.log('role is ' + item.role)
          responseRole = item.role}
      });
      
      if(responseRole === 'ROLE_ANONYMOUS' || responseRole === 'ROLE_ADMIN'){
        setUser({role:'ROLE_ANONYMOUS', loggedIn:false})
        console.log('logged out')
      }else{
        console.log('logged in')
        
        setUser({role:responseRole, loggedIn:true})
      }
    
    })

  };

  useEffect(() => {
    checkLoggedIn();
  }, []);
  


  const PrivateRoute = (props) => {
    
    const location = useLocation();

    return user.loggedIn 
    ? <props.component user={props.user}/>
    : <Navigate to="/login" replace state={{ from: location }} />;

    
  }

  const AuthRoute = (props) => {
    
    return !user.loggedIn
    ? <Authentication {...props}/>
    : <Home />
  }

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation user={user} setUser={setUser} checkLoggedIn={checkLoggedIn} />}> {/* //TODO PARAMS TO ROUTES */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login user={user} setUser={setUser}/>} />
        <Route path="/logout" element={<Logout user={user} setUser={setUser}/>} />
        <Route path='/profile' element={<PrivateRoute component={Profile } user={user}/>}/>
        
       
        {/* CITIZEN ROUTES */}
        <Route path='/add-pet' element={<PrivateRoute component={AddPet}/>}/>
        <Route path='/view-pets' element={<PrivateRoute component={ViewPets}/>}/>

        {/* VET ROUTES */}
        <Route path='/view-pending' element={<PrivateRoute component={ViewPending}/>}/>
       {/*  <Route path='/verify-pet' element={<PrivateRoute component={VerifyPet}/>}/> */}
        <Route path='/update-pet' element={<PrivateRoute component={UpdatePet}/>}/>
        
        {/* CIVIC ROUTES */}
        <Route path='/find-pets' element={<PrivateRoute component={FindPets}/>}/>
        
        

        </Route>
      </Routes>
    </BrowserRouter>
    </>
    
    
  );
}

export default App;
