import React from 'react';
import base64 from 'react-native-base64';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../App.css'
import { saveUser } from '../Globals';

const Login = (props) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({username:'', password:''}) 

    //console.log(props.user)
    

    if(props.user.loggedIn){
        const { from } = location.state || { from: { pathname: "/home" } };
        navigate(from, {replace:true});
    }

    const [loginMessage, setLoginMessage] = useState("");

    const onLoginPressed = (event)=> {
        event.preventDefault()
        
        //login(credentials.username, credentials.password);
        console.log(credentials.username)
        sendCredentials(credentials.username, credentials.password);
       
    };

    const handleInputChange = (event) =>{
        setCredentials(prevCreds => ({
            
            ...prevCreds,
            [event.target.name] : event.target.value

        }));

    }

    
    
    const sendCredentials = async (username, password) => {
        console.log("about to login...")
        const res = fetch('http://localhost:8080/logged_in',
        {
            mode:'cors',
            credentials:'include',
            headers: new Headers({
                "Authorization" : `Basic ${base64.encode(`${username}:${password}`)}`,
                "X-Requested-With": "XMLHttpRequest"
            })}

            )
            .then(response => {
                console.log(response)
                if(response.status === 401){
                    setLoginMessage("Wrong Credentials. Please try again")
                    return;
                }else if(response.status === 200){
                    return response.json()
                }
            }).then(data => {
                console.log(data)
                if(data === undefined) return;
                let responseRole = ''
                data.authorities.forEach(function (item, index) {
                    console.log(item.role)
                    if(item.role.startsWith('ROLE')) {
                    console.log('role is ' + item.role)
                    responseRole = item.role}
                });
                props.setUser({role:responseRole, loggedIn:true})
                const { from } = location.state || { from: { pathname: "/profile" } };  
                navigate(from, {replace:true});
            })
            
    }


  return (
    <>
      {!props.user.loggedIn && (<div>


        <h2 style={{textAlign:"center"}}>Sign In</h2>
        <h3 style={{textAlign:"center"}}>{loginMessage}</h3>
        <div className='center'>

        
            <form method="post" onSubmit={onLoginPressed}>
                <div>
                    
                    <input id="username" type="text" name="username" autoComplete='off'
                        placeholder="Your Username" onChange={handleInputChange.bind(this)}/>
                </div>

                <div>
                
                    <input id="password" type="password" name="password" autoComplete='off'
                        placeholder="Your Password" onChange={handleInputChange.bind(this)}/>
                </div>
                <div>
                    <input type="submit" value="Login"/>
                </div>

            </form>
    
        </div>
      </div>)}
        
    </>
    
  );
};

export default Login;
