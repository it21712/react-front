import { accountDetails, applicationsText, contactText, invitationsText, logoutText, } from "../strings";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faList, faEnvelope, faAt } from "@fortawesome/free-solid-svg-icons";
import { LOGOUT_URL } from "../backend/urls";

import { Link, Route, Routes, useNavigate, } from "react-router-dom";
import { applicantsApplicationsRoute, applicantsInvitationsRoute, applicantsRoute, homeRoute, profileRoute } from "../routes";
import UserDetailsFragment from "../components/UserDetailsFragment";

import InvitationsFragment from "../components/InvitationsFragment";
import ApplicationsFragment from "../components/ApplicationsFragment";


const ApplicantPage = () => {

    const { auth, setAuth } = useAuth();


    return (
        <div className='flex w-full h-full'>
            <SidebarDrawer email={auth?.email} setAuth={setAuth}/>
            <div className='flex w-full h-screen'>
                <Routes>
                    <Route index element={<UserDetailsFragment email={auth?.email} />}></Route>
                    <Route path={applicantsApplicationsRoute} element={<ApplicationsFragment />}></Route>
                    <Route path={applicantsInvitationsRoute} element={<InvitationsFragment />}></Route>
                </Routes>
            </div>
        </div>

    );


}


const SidebarDrawer = ({ email, setAuth }) => {

    const axiosPrivate = useAxiosPrivate();
    
    const navigate = useNavigate();
    

    const handleLogout = () => {

        if (email) {
            axiosPrivate.post(LOGOUT_URL);
            setAuth({});
            localStorage.removeItem('email');
            localStorage.removeItem('profilePic');
            localStorage.removeItem('profilePicUrl');
            localStorage.removeItem('profilePicName');
            localStorage.removeItem('details');
            
            navigate(homeRoute, { replace: true });
        }
    }

    return (
        <div className='hidden h-screen md:w-[23%] md:flex min-w-[300px]'>
            <div className='flex flex-col bg-gray-800 px-6 w-full h-full'>
                
                <div className='border-b-[1px] border-white w-full mx-auto mt-12'>
                    <h2 className='text-white font-bold text-lg mb-2'>{email}</h2>
                </div>
                <div>
                    <SidebarActionTab linkTo={applicantsRoute + profileRoute} content={accountDetails} icon={faList} />
                    <SidebarActionTab linkTo={applicantsRoute + profileRoute + applicantsApplicationsRoute} content={applicationsText} icon={faList} />
                    <SidebarActionTab linkTo={applicantsRoute + profileRoute + applicantsInvitationsRoute} content={invitationsText} icon={faEnvelope} />
                    <SidebarActionTab id={3} content={contactText} icon={faAt} />
                    <SidebarAction content={logoutText} icon={faArrowRightFromBracket} handleClick={handleLogout} />
                </div>

            </div>
        </div>
    );
}

const SidebarAction = ({content, icon, handleClick = () => {}}) => {
    const neutralClassName = 'flex p-3 mt-6 items-center cursor-pointer transition ease-in-out duration:500 hover:bg-gray-600 hover:translate-x-2';
    return (
        <div className={neutralClassName} onClick={handleClick}>
            <FontAwesomeIcon icon={icon} color='white' />
            <h2 className='text-white pl-4'>{content}</h2>
        </div>
    );
}

const SidebarActionTab = ({ linkTo, content, icon }) => {
    const loc = window.location.pathname
    const selectedClassName = 'flex p-3 mt-6 items-center cursor-pointer transition ease-in-out duration:500 bg-gray-600 translate-x-4'
    const neutralClassName = 'flex p-3 mt-6 items-center cursor-pointer transition ease-in-out duration:500 hover:bg-gray-600 hover:translate-x-2';
    return (

        <Link replace={true} className={loc === linkTo ? selectedClassName : neutralClassName} to={linkTo}>
            <FontAwesomeIcon icon={icon} color='white' />
            <h2 className='text-white pl-4'>{content}</h2>
        </Link>

    );
}

export default ApplicantPage;