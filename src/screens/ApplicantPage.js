import { accountDetails, addressText, appTitle, cellPhoneText, cityText, contactText, countryText, dateOfBirthText, detailsSubmitText, firstNameText, invitationsText, lastNameText, logoutText, phoneText, roadNameText, roadNumberText, tkText } from "../strings";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate, { useAxiosRole } from "../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faList, faEnvelope, faAt } from "@fortawesome/free-solid-svg-icons";
import { LOGOUT_URL } from "../backend/urls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { homeRoute } from "../routes";
import UserDetailsFragment from "../components/UserDetailsFragment";



const ApplicantPage = () => {

    const { auth, setAuth } = useAuth();

    return (
        <div className="flex flex-col h-screen">

            <div className='flex h-screen w-screen'>

                <SidebarDrawer imageUrl={auth?.imageUrl} email={auth?.email} setAuth={setAuth} />

                <UserDetailsFragment email={auth?.email} />

            </div>


        </div>
    );

}

const SidebarDrawer = ({ imageUrl, email, setAuth }) => {


    const axiosPrivate = useAxiosPrivate();
    const [logout, setLogout] = useState(false);
    const axiosRole = useAxiosRole();
    const navigate = useNavigate();
    const handleLogout = () => {

        if (email) {
            axiosPrivate.post(LOGOUT_URL);
            setAuth({});
            localStorage.removeItem('email');
            localStorage.removeItem('profilePic');
            localStorage.removeItem('details');
            setLogout(true);
            navigate(homeRoute, { replace: true });
        }
    }

    return (
        <div className='hidden h-screen w-[23%] md:flex '>
            {/* <div className='flex flex-col transition -translate-x-[80%] ease-in duration:700 w-[23%] hover:translate-x-0 bg-gray-800 mt-16 items-center px-6'>            */}
            <div className='flex flex-col bg-gray-800 px-6 w-full h-full'>
                {/* <div className='mt-6 mx-auto w-12 h-12'>
                    <ProfileAvatar picUrl={imageUrl} />
                </div> */}
                <div className='border-b-[1px] border-white w-full mx-auto mt-12'>
                    <h2 className='text-white font-bold text-lg mb-2'>{email}</h2>
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
        <div className='flex p-3 mt-6 items-center cursor-pointer transition ease-in-out duration:500 hover:bg-gray-600 hover:translate-x-2' onClick={handleClick}>
            <FontAwesomeIcon icon={icon} color='white' />
            <h2 className='text-white pl-4'>{content}</h2>
        </div>);
}

export default ApplicantPage;