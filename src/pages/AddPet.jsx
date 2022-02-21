import React, { useState } from "react";
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddPet.css';

export default function AddPet(){


    const URL = "http://localhost:8080/citizen"


    const [pet,setPet] = useState({
        serialNumber:'',
        type:'',
        race:'',
        sex:'',
        birthDate:''
    });
    
    const handleSubmitTest = (event) => {

        alert("Success: " + pet.type + pet.serialNumber)
    }

    const handleSubmit = (event) => {
        let config = {
            withCredentials: true
        }

        axios
        .post(URL + '/add-pet', pet ,config)
        .then(response => {
            alert("Pet was added succesfully.")
            console.log("RESPONSE WAS :", response);
        })
        .catch(error => {
            alert("Error adding pet to list.")
            console.log("registration error", error);
        });
        event.preventDefault();
    }


    const handleChange = (event) =>{
        setPet(prevPet => ({
            ...prevPet,
            [event.target.name] : event.target.value
            
        }));
    }
    
    
    return(
    <>   
    <h1>Provide Pet's Information</h1>
    <Container>
      <Form onSubmit={handleSubmit}>
            <Form.Label>Serial Number:</Form.Label>
            <Form.Control
                    type="number"
                    name="serialNumber"
                    placeholder="Serial Number"
                    value={pet.serialNumber}
                    onChange={handleChange}
                    required 
            />
            <Form.Label>Race:</Form.Label>
            <Form.Control
                    type="text"
                    name="race"
                    placeholder="Race"
                    value={pet.race}
                    onChange={handleChange}
                    required
            />
            <Row>
            <Col><Form.Label>Pet's Type</Form.Label>
            <Form.Control
                as="select"
                name="type"
                required
                onChange={handleChange}>
                <option key = 'blankChoice' hidden value> --Select Type-- </option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
            </Form.Control>
            </Col>
            <Col>
            <Form.Label>Pet's Sex</Form.Label>
            <Form.Control
                as="select"
                name="sex"
                required
                onChange={handleChange}>
                <option key = 'blankChoice' hidden value> --Select Sex-- </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </Form.Control>
            </Col>
            </Row>
            <Form.Label>Birth Date:</Form.Label>
            <Form.Control
                    type="date"
                    name="birthDate"
                    value={pet.birthDate}
                    onChange={handleChange}
                    required
            />
        <Button type="Submit"variant="primary">Next</Button>
      </Form>
    </Container>
    </>
    )
}