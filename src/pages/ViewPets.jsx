import axios from "axios";
import React, { useState,useEffect } from "react";

export default function ViewPets(props){

    const URL = "http://localhost:8080/citizen"

    const [pet,setPet] = useState([]);
        

    const getPets = async () => {
        const res = await fetch(URL + '/pets',
        
        {
            mode:'cors',
            credentials:'include'
        }

        );


        const data = await res.json();
        setPet(data);
        //console.log(data[1]);

        
    }
    
    useEffect(()=>{
        getPets();
    },[])

    const approved = (num) =>{
        if(num === 0){
            return 'NO';
        }else{
            return 'YES'
        }
    }


    return(
        <div className="container">
            <h1>Pet List</h1>
            <table>
                <thead>
                <tr>
                    <th>Serial Number</th>
                    <th>Type</th>
                    <th>Race</th>
                    <th>Sex</th>
                    <th>Birth Date</th>
                    <th>Approved</th>
                </tr>
                </thead>
                <tbody>
                    {
                        pet.map((entry) => (
                            <tr key={(entry.serialNumber).toString()}>
                                <td>{entry.serialNumber}</td>
                                <td>{entry.type}</td>
                                <td>{entry.race}</td>
                                <td>{entry.sex}</td>
                                <td>{entry.birthDate}</td>
                                <td>{approved(entry.is_approved)}</td>
                               
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>


    )

    

}