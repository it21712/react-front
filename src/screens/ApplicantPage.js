import { accountDetails, appTitle, contactText, invitationsText, logoutText } from "../strings";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate, { useAxiosRole } from "../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faList, faEnvelope, faAt } from "@fortawesome/free-solid-svg-icons";
import { LOGOUT_URL } from "../backend/urls";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { homeRoute } from "../routes";



const ApplicantPage = () => {
    const { auth, setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [logout, setLogout] = useState(false);
    const axiosRole = useAxiosRole();

    const handleLogout = () => {
        if (auth?.email) {
            axiosPrivate.post(LOGOUT_URL);
            setAuth({});
            setLogout(true);
            localStorage.removeItem('email');
        }
    }

    const handleAccount = () => {
        axiosRole.get('/applicants/account/').then((response) => {
            console.log(response.status);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex bg-gray-800 shadow-md fixed w-full z-10 top-0 h-16 px-3 justify-start items-center">
                
                
                <h3 className='font-normal invisible sm:visible text-white my-auto'>{appTitle}</h3>
                
            </div>

            <SidebarDrawer email={auth?.email}/>
            

            {logout && <Navigate to={homeRoute} replace />}
        </div>
    );

}

const ProfileButton = ({ email, handleLogout }) => {


    return (
        <div className="flex justify-center px-4 group items-center">
            <h3 className='font-bold invisible sm:visible text-white my-auto mr-4 text-lg'>{email}</h3>
            <button className="my-auto ml-7" onClick={handleLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} fontSize={17} color='white'></FontAwesomeIcon>
            </button>
            {/* <div className="my-auto group-hover:motion-safe:animate-bounce"><FaAngleDown color="white" fontSize={20.0}></FaAngleDown></div> */}
        </div>
    );
}

const SidebarDrawer = ({email}) => {
    return (
        <div className='flex h-screen'>
                {/* <div className='flex flex-col transition -translate-x-[80%] ease-in duration:700 w-[23%] hover:translate-x-0 bg-gray-800 mt-16 items-center px-6'>            */}
                <div className='flex flex-col w-[23%] bg-gray-800 mt-16 px-6'>
                    <div className='mt-6 mx-auto'>
                        <ProfileAvatar/>
                    </div>
                    <div className='border-b-[2px] border-white w-full mx-auto mb-10'>
                        <h2 className='text-white font-bold mt-2 mb-2'>{email}</h2>
                    </div>
                    
                    <SidebarAction content={accountDetails} icon={faList}/>
                    <SidebarAction content={invitationsText} icon={faEnvelope}/>
                   
                    <SidebarAction content={contactText} icon={faAt}/>
                    <SidebarAction content={logoutText} icon={faArrowRightFromBracket}/>
                </div>
            </div>
    );
}

const ProfileAvatar = ({pic}) => {
    return (
        <div className='flex w-14 h-14 items-center justify-center'>
            <img src='/unknown_avatar.png' alt='unknown' className='object-cover rounded-full'></img>
        </div>
    );
}

const SidebarAction = ({content, handleClick, icon}) => {
    return (
    <div className='flex items-center mb-8 cursor-pointer transition ease-in-out duration:500 hover:-translate-y-2'>
        <FontAwesomeIcon icon={icon} color='white'/>
        <h2 className='text-white pl-4'>{content}</h2>
    </div>);
}

export default ApplicantPage;