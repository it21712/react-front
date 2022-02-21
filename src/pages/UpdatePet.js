import React, { useState } from 'react';

const UpdatePet = () => {

    const [petNum, setPetNum] = useState(0)
    const [pet, setPet] = useState()
    const [operation, setOperation] = useState('')

    const handleInputChange = (event) => {
        setPetNum(event.target.value)
    }

    const onSearchPressed = async (event) => {
        event.preventDefault();
        let petNumObj = {string:petNum}
        getPet(petNumObj)
    }

    const getPet = async (obj) => {

        fetch('http://localhost:8080/vet/get-pet/',
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
        .then(response => {
            
            if(response.status !== 200){
                if(response.status === 500)
                    alert("Could not find pet");
                else alert("Something went wrong");
                return;
            }else return response.json()
            
        })
        .then(data => {
            setPet(data)
            console.log(data)
        })
       
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
                
            }else{
                alert("Could not verify pet with serial number: "+event.target.id+". Please try again");
            }
        })
        
    }

    const refreshPendingList = (petNumber) => {
        

        setPet({
            ...pet,
            is_approved:1
        })
        
        alert("Pet with serial number "+petNumber+" was successfuly verified");

    }

    const handleOperationChange = (event) => {
        setOperation(event.target.value);
    }

    const onAddOperationPress = (event) => {
        event.preventDefault();
        
        sendMedOperation()
    }

    const sendMedOperation = async () => {
        let medOperationObj = {operation:operation, petNumber:pet.serialNumber};

        fetch('http://localhost:8080/vet/update-med-history',
            {
                mode:'cors',
                credentials:'include',
                method:'post',
                body:JSON.stringify(medOperationObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => {
            
            console.log(response)
            if(response.status === 200){
                alert("Pet's medical history updated!")
            }else{
                alert("Something went wrong")
            }

            return response.json()
        })
    }

  return (
  <>
    <div className='center'>
            <form method="post" onSubmit={onSearchPressed}>
                <div>
                    <label style={{textAlign:'center'}}>Enter Pet's Serial Number</label>
                </div>
                <div>
                <input id="serialNum" type="number" name="petNumber" autoComplete='off'
                                placeholder="Serial Number" onChange={handleInputChange.bind(this)}/>
                </div>
                <div>
                <input type='submit' value='Search'/>
                </div>
            </form>
        </div>

        {pet !== undefined && (<div style={{paddingTop:'40px'}}>
           
            <table>
                <thead>
                <tr>
                    <th>Serial Number</th>
                    <th>Type</th>   
                    <th>Race</th>
                    <th>Sex</th>
                    <th>Birth Date</th>
                    <th>Approved</th>
                    {pet.is_approved === 0 && (<th>Actions</th>)}
                    
                </tr>
                </thead>
                <tbody>
                    {
                        
                        
                    <tr key={(pet.serialNumber).toString()}>
                        <td>{pet.serialNumber}</td>
                        <td>{pet.type}</td>
                        <td>{pet.race}</td>
                        <td>{pet.sex}</td>
                        <td>{pet.birthDate}</td>
                        <td>{pet.is_approved ? 'YES' : 'NO'}</td>
                        {pet.is_approved === 0 && (<td><input id={pet.serialNumber} className = "table-button" type="submit" value="Verify" onClick={handleVerify.bind(this)} /></td>)}
                    </tr>
                        
                    }
                </tbody>
            </table>
           
        </div>)}

        {pet !== undefined && pet.is_approved && (<div className='center'>
            <form method="post" onSubmit={onAddOperationPress}>
                <div>
                    <label style={{textAlign:'center'}}>Add Medical Operation</label>
                </div>
                <div>
                    <input id="medOp" type="text" name="medicalOp" autoComplete='off'
                                    placeholder="Pet Operation" onChange={handleOperationChange.bind(this)}/>
                </div>
                <div>
                    <input type='submit' value='Add'/>
                </div>
            </form>
        </div>)}
  </>);
};

export default UpdatePet;
