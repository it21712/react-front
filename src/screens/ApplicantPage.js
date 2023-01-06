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
import { TabProvider } from "../context/TabProvider";
import useTab from "../hooks/useTab";



const ApplicantPage = () => {

    const { auth, setAuth } = useAuth();



    return (
        <div className="flex flex-col h-screen">

            <div className='flex h-screen w-screen'>
                <TabProvider>
                    <SidebarDrawer imageUrl={auth?.imageUrl} email={auth?.email} setAuth={setAuth} />
                    <UserDetailsFragment email={auth?.email} />
                </TabProvider>
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
                    <SidebarAction id={0} content={accountDetails} icon={faList} />
                    <SidebarAction id={1} content={invitationsText} icon={faEnvelope} />
                    <SidebarAction id={2} content={contactText} icon={faAt} />
                    <SidebarAction id={3} content={logoutText} icon={faArrowRightFromBracket} />
                </div>

            </div>
        </div>
    );
}



const SidebarAction = ({ id, content, handleClick = () => { }, icon }) => {
    const { tab, setTab } = useTab();
    const selectedClassName = 'flex p-3 mt-6 items-center cursor-pointer transition ease-in-out duration:500 bg-gray-600 translate-x-4'
    const neutralClassName = 'flex p-3 mt-6 items-center cursor-pointer transition ease-in-out duration:500 hover:bg-gray-600 hover:translate-x-2';
    return (
        <div className={id === tab ? selectedClassName : neutralClassName} onClick={() => {
            setTab(id);
            handleClick();
        }}>
            <FontAwesomeIcon icon={icon} color='white' />
            <h2 className='text-white pl-4'>{content}</h2>
        </div>);
}

export default ApplicantPage;