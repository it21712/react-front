import { accountDetails, addressText, appTitle, cellPhoneText, cityText, contactText, countryText, dateOfBirthText, detailsSubmitText, firstNameText, invitationsText, lastNameText, logoutText, phoneText, roadNameText, roadNumberText, tkText } from "../strings";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate, { useAxiosRole } from "../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faList, faEnvelope, faAt } from "@fortawesome/free-solid-svg-icons";
import { LOGOUT_URL } from "../backend/urls";
import { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { homeRoute } from "../routes";
import UserDetailsFragment, { ProfileAvatar } from "../components/UserDetailsFragment";
import SignupPage from "./SignupPage";


const ApplicantPage = () => {


    const fileInput = useRef(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleFileSelect = () => {
        const file = fileInput.current.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result);
            //localStorage.setItem('imageUrl', reader.result);
            //TODO send to server
        };
        reader.readAsDataURL(file);
    };


    const handleFormSubmit = () => {

    };

    return (
        <div className="flex flex-col h-screen">

            <div className='flex h-screen w-screen'>

                <SidebarDrawer imageUrl={imageUrl} />

                <UserDetailsFragment fileRef={fileInput} handleFileSelect={handleFileSelect} imageUrl={imageUrl} handleSubmit={handleFormSubmit} />

            </div>


        </div>
    );

}

const SidebarDrawer = ({ imageUrl }) => {

    const { auth, setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [logout, setLogout] = useState(false);
    const axiosRole = useAxiosRole();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (auth?.email) {
            axiosPrivate.post(LOGOUT_URL);
            setAuth({});
            setLogout(true);
            localStorage.removeItem('email');
            navigate(homeRoute, { replace: true });
        }
    }

    return (
        <div className='hidden h-screen w-[23%] md:flex '>
            {/* <div className='flex flex-col transition -translate-x-[80%] ease-in duration:700 w-[23%] hover:translate-x-0 bg-gray-800 mt-16 items-center px-6'>            */}
            <div className='flex flex-col bg-gray-800 px-6 w-full h-full'>
                <div className='mt-6 mx-auto w-12 h-12'>
                    <ProfileAvatar pic={imageUrl} />
                </div>
                <div className='border-b-[1px] border-white w-full mx-auto mb-10'>
                    <h2 className='text-white font-bold mt-2 mb-2'>{auth?.email}</h2>
                </div>
                <div>
                    <SidebarAction content={accountDetails} icon={faList} />
                    <SidebarAction content={invitationsText} icon={faEnvelope} />
                    <SidebarAction content={contactText} icon={faAt} />
                    <SidebarAction content={logoutText} icon={faArrowRightFromBracket} handleClick={handleLogout} />
                </div>

            </div>
        </div>
    );
}



const SidebarAction = ({ content, handleClick, icon }) => {
    return (
        <div className='flex items-center mb-8 cursor-pointer transition ease-in-out duration:500 hover:-translate-y-2' onClick={handleClick}>
            <FontAwesomeIcon icon={icon} color='white' />
            <h2 className='text-white pl-4'>{content}</h2>
        </div>);
}

export default ApplicantPage;