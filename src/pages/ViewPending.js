import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import '../App.css'


const ViewPending = () => {

    const [citizenName, setName] = useState('')
    const [pets, setPets] = useState([])
    const [show, setShow] = useState(false);
    console.log(pets[0])  
    const handleInputChange = (event) =>{
        setName(event.target.value);

    }


    const postCitizenName = async (obj) => {
        console.log(JSON.stringify(obj))
        fetch('http://localhost:8080/vet/show-pending/',
        {
            mode:'cors',
            credentials:'include',
            method:'post',
            body:JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
              }
        }
        )
        .then(response => response.json())
        .then(data => {
            setPets(data)
            if(!Object.keys(data).length) setShow(true);//no pets found

        })
    }

    const onSearchPressed = (event) => {
        event.preventDefault();
        let nameObj = {string:citizenName}
        postCitizenName(nameObj);
    }

    const approved = (num) =>{
        if(num === 0){
            return 'NO';
        }else{
            return 'YES'
        }
    }


    const handleVerify = async(event) => {
        
        let serialNumObj = {string:event.target.id}

        fetch('http://localhost:8080/vet/verify-pet',
            {
                mode:'cors',
                credentials:'include',
                method:'post',
                body:JSON.stringify(serialNumObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => {
            
            console.log(response)
            if(response.status === 200){
                refreshPendingList(event.target.id)
                onSearchPressed(event);

                
            }else{
                alert("Could not verify pet with serial number: "+event.target.id+". Please try again");
            }
        })
        
    }

    const refreshPendingList = (petNumber) => {
        
        let tmpPets = pets;

        tmpPets = tmpPets.filter(function(obj){
            return obj.serialNumber !== petNumber;
        });
        
        setPets(tmpPets);
        alert("Pet with serial number "+petNumber+" was successfuly verified");

    }

  return (
      <>

        <Alert variant="danger" show={show} >
            <Alert.Heading>Pets not found</Alert.Heading>
                <p> User does not exist or has no pets to verify</p>
                <Button onClick={() => setShow(false)}>Close</Button>
        </Alert>
        <div className='center'>
            <form method="post" onSubmit={onSearchPressed}>
                <div>
                    <label style={{textAlign:'center'}}>Enter Citizen's Full Name</label>
                </div>
                <div>
                <input id="citizenName" type="text" name="citizenName" autoComplete='off'
                                placeholder="Citizen name" onChange={handleInputChange.bind(this)}/>
                </div>
                <div>
                <input type='submit' value='Search'/>
                </div>
            </form>

            
        </div>

        {pets.length >= 1 && (<div style={{paddingTop:'40px'}}>
           
            <table>
                <thead>
                <tr>
                    <th>Serial Number</th>
                    <th>Type</th>   
                    <th>Race</th>
                    <th>Sex</th>
                    <th>Birth Date</th>
                    <th>Approved</th>
                    <th>Actions</th>
                    
                </tr>
                </thead>
                <tbody>
                    {
                        pets.map((entry) => (
                            <tr key={(entry.serialNumber).toString()}>
                                <td>{entry.serialNumber}</td>
                                <td>{entry.type}</td>
                                <td>{entry.race}</td>
                                <td>{entry.sex}</td>
                                <td>{entry.birthDate}</td>
                                <td>{approved(entry.is_approved)}</td>
                                <td>{entry.is_approved == 0 && <input id={entry.serialNumber} className = "table-button" type="submit" value="Verify" onClick={handleVerify.bind(this)}/>}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
           
        </div>)}

      </>
  
  );
};

export default ViewPending;
