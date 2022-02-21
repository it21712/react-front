//import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Home.css'

const Home = () => {
  
    return (
        <>
        <h1>Home</h1>
                
                <h2>GENERAL INFORMATION</h2>
                <div>
                Welcome to the online platform of the Greek Pet Registry System(GPRS).

                <p>Please Login using your credentials provide to you by the KEP.</p>

                <h3>Citizen</h3>
                <p>As a Citizen, you can register one of your pets, providing their information and you can then view all of your registered
                    pets in the system. 
                </p>
                <h3>Veterinary</h3>
                <p>As a Veterinary, you can aprrove a registered pet, by providing the owner's name, or you can update the medical
                    record of a pet by providing its microchip number.    
                </p>
                <h3>Civilian Official</h3>
                <p>
                    As a Civilian Official, you can view all the approved pets of your registered region, for easier tracking down in case
                    of the pet gone missing.
                </p>
            </div>
        </>
        
    )
    };
    
    export default Home;