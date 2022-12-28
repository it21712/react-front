import { accountDetails, addressText, appTitle, cityText, contactText, countryText, dateOfBirthText, firstNameText, invitationsText, lastNameText, logoutText } from "../strings";
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

            <div className='flex h-full w-screen'>
                <SidebarDrawer email={auth?.email}/>
                <UserDetailsFragment/>
            </div>          

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
        <div className='flex h-screen w-[23%]'>
                {/* <div className='flex flex-col transition -translate-x-[80%] ease-in duration:700 w-[23%] hover:translate-x-0 bg-gray-800 mt-16 items-center px-6'>            */}
                <div className='flex flex-col bg-gray-800 mt-16 px-6 w-full h-full'>
                    <div className='mt-6 mx-auto w-12 h-12'>
                        <ProfileAvatar/>
                    </div>
                    <div className='border-b-[1px] border-white w-full mx-auto mb-10'>
                        <h2 className='text-white font-bold mt-2 mb-2'>{email}</h2>
                    </div>
                    <div>
                    <SidebarAction content={accountDetails} icon={faList}/>
                    <SidebarAction content={invitationsText} icon={faEnvelope}/>
                    <SidebarAction content={contactText} icon={faAt}/>
                    <SidebarAction content={logoutText} icon={faArrowRightFromBracket}/>
                    </div>
                    
                </div>
            </div>
    );
}

const ProfileAvatar = ({pic}) => {
    return (
        <div className='flex w-full h-full items-center justify-center '>
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


const UserDetailsFragment = () => {
    return (
        <div className='flex bg-gray-200 w-[77%] h-full mt-16 justify-center'>
            <form className='mt-6 flex flex-col'>
                <div className='flex items-center mt-6 mb-12'>
                    <div className='w-24 h-24'>
                        <ProfileAvatar/>
                    </div>
                    
                    <input type='file' id='profilePic' className='py-2 pl-4 border-2 rounded-sm text-gray-700 leading-tight focus:outline-none '/>
                </div>

                <div className='flex'>
                    
                    <div className='flex flex-col justify-start items-start pr-6'>
                        <h2>{firstNameText}</h2>
                        <input type='text' id='firstName' className='w-full py-2 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-2 focus:outline-none '></input>
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                        <h2>{lastNameText}</h2>
                        <input type='text' id='lastName' className='w-full py-2 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-2 focus:outline-none '></input>
                    </div>
                </div>

                <div className='flex flex-col items-start mt-6'>
                    <h2>Email</h2>
                    <input type='email' id='email' className='w-full py-2 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-2 focus:outline-none '/>
                </div>

                <div className='flex flex-col items-start mt-6'>
                    <h2>{dateOfBirthText}</h2>
                    <input type='date' id='date' className='w-full py-2 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-2 focus:outline-none '/>
                </div>

                <div className='flex flex-col items-start mt-6'>
                <h2>{countryText}</h2>
                    <input type='text' id='country' className='w-full py-2 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-2 focus:outline-none '/>

                    <h2 className='mt-3'>{cityText}</h2>
                    <input type='text' id='city' className='w-full py-2 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-2 focus:outline-none '/>
                
                    <h1 className='text-lg mb-3'>{addressText}</h1>
                    
                </div>

                
            </form>
        </div>
    );
}

export default ApplicantPage;