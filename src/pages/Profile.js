import React, { useEffect, useState } from 'react';
import '../App.css';
import '../pages/Profile.css';

const Profile = (props) => {


    let role = props.user.role;
    role = role.substring(role.indexOf("_") + 1).toLowerCase();

    const[userInfo, setUserInfo] = useState({
        username:'',
        fullName:'',
        region:'',
        address:'',
        phoneNumber:'',
        email:'',
        vetName:'',
        role: role

    });

    const getUserInfo = async () => {
        const res = await fetch('http://localhost:8080/'+`${userInfo.role}`+'/home',
        
        {
            mode:'cors',
            credentials:'include'
        }

        );


        const data = await res.json();

        //setUserInfo(data.fullName);

        setUserInfo(prevCreds => ({
            
            ...prevCreds,
            username : data.username,
            fullName : data.fullName,
            region : data.region,
            address : data.address,
            phoneNumber : data.phoneNumber,
            email : data.email,
            vetName : data.vetName,

        }));
    


    }

    useEffect(()=>{
        getUserInfo();
    },[])

  return (
  <>
    <h2>Your Profile</h2>

    <div className='center'>
    <table>
    <tbody>
    <tr>Username: {userInfo.username}</tr>
    <tr>Full Name: {userInfo.fullName}</tr>
    <tr>Region: {userInfo.region}</tr>
    { typeof userInfo.address !== "undefined" && <tr>Address: {userInfo.address}</tr>}
    { typeof userInfo.phoneNumber !== "undefined" && <tr>Phone Number: {userInfo.phoneNumber}</tr>}
    { typeof userInfo.email !== "undefined" && <tr>Email: {userInfo.email}</tr>}
    { typeof userInfo.vetName !== "undefined" && <tr>Veterinary Name: {userInfo.vetName}</tr>}
    <tr>You are connected as a '{userInfo.role}'</tr>
    </tbody>
    </table>
    </div>
    
  </>
  )
};

export default Profile;
