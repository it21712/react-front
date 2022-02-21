/* import React, { useEffect, useState } from 'react';
import base64 from 'react-native-base64';
import { useLocation, useNavigate } from 'react-router-dom';
//import './Authentication.css';

const Authentication = (props) => {


    const location = useLocation();
    const navigate = useNavigate();


    let headers = {"Authorization" : `Basic ${base64.encode(`${props.user.username}:${props.user.password}`)}`} 

    

    let loggedIn = props.user.loggedIn;


    

    const [loginMessage, setLoginMessage] = useState("");

    const onAuthPressed = (event)=> {
        event.preventDefault()

        console.log("credentials from form -> "+props.user.username+":"+props.user.password)
        sendCredentials(props.user.username, props.user.password);
        return
        
    };

    const handleInputChange = (event) =>{
        props.setUser(prevUser => ({
            
            ...prevUser,
            [event.target.name] : event.target.value

        }));

    }

    const logout = async (username, password)=> {
        const res = await fetch('http://localhost:8080/logout',
        {
            headers: new Headers({
                "Authorization" : `Basic ${base64.encode(`${username}:${password}`)}`
            })}

            );

        const data = await res.json()

        props.setUser({
            username:undefined,
            password:undefined,
            loggedIn:false,
            role:'ROLE_ANONYMOUS'
        })

    }

    if(props.user.loggedIn){
        logout(props.user.username, props.user.password)
    }

    const sendCredentials = async (username, password) => {

        const res = await fetch('http://localhost:8080/logged_in',
        {
            headers: new Headers({
                "Authorization" : `Basic ${base64.encode(`${username}:${password}`)}`
            })}

            );

            //console.log("Sendin credentials: ", username,":", password)
            if(res.status === 401){
                setLoginMessage("Wrong Credentials. Please try again")

            }else{
                setLoginMessage("Successfull Login!!")
                const data = await res.json()
                props.setUser({username:`${username}`, password:`${password}`, loggedIn:true, role:data.authorities[0].role})
                const { from } = location.state || { from: { pathname: "/home" } };
                navigate(from, {replace:true});
            }
        }
        
    

    return(
        <></>
        <div>

            <h2 style={{textAlign:"center"}}>Sign In</h2>
            <h3 style={{textAlign:"center"}}>{loginMessage}</h3>
            <div className='center'>
    
            
            <form method="post" onSubmit={onAuthPressed}>
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
        </div>
    );
};

export default Authentication; */