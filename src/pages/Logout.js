import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeUser } from '../Globals';

const Logout = (props) => {

    const location = useLocation();
    const navigate = useNavigate();



  const logout = async () => {

    fetch('http://localhost:8080/logout',
    {
      mode:'cors',
      credentials:'include'
    })
    .then(response => {
      console.log(response)

      props.setUser({role:'ROLE_ANONYMOUS', loggedIn:false})
    })
    
    .catch(error => console.log(error));

    
  }
  useEffect(() =>{
    logout();
  }, [])
  

    props.setUser(removeUser)
    if(props.user.loggedIn === null) {
        const { from } = location.state || { from: { pathname: "/home" } };
        navigate(from, {replace:true});
    }

  return <div></div>;
};

export default Logout;
