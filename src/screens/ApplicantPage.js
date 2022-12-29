import { accountDetails, addressText, appTitle, cellPhoneText, cityText, contactText, countryText, dateOfBirthText, detailsSubmitText, firstNameText, invitationsText, lastNameText, logoutText, phoneText, roadNameText, roadNumberText, tkText } from "../strings";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate, { useAxiosRole } from "../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faList, faEnvelope, faAt } from "@fortawesome/free-solid-svg-icons";
import { LOGOUT_URL } from "../backend/urls";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { homeRoute } from "../routes";



const ApplicantPage = () => {


    return (
        <div className="flex flex-col h-screen">
            <div className="flex bg-gray-800 shadow-md fixed w-full z-10 top-0 h-16 px-3 justify-start items-center">
                <h3 className='font-normal invisible sm:visible text-white my-auto'>{appTitle}</h3>
            </div>

            <div className='flex h-full w-screen'>
                <SidebarDrawer />
                <UserDetailsFragment />
            </div>

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

const SidebarDrawer = () => {

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
            <div className='flex flex-col bg-gray-800 mt-16 px-6 w-full h-full'>
                <div className='mt-6 mx-auto w-12 h-12'>
                    <ProfileAvatar />
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

const ProfileAvatar = ({ pic }) => {
    return (
        <div className='flex w-full h-full items-center justify-center '>
            <img src='/unknown_avatar.png' alt='unknown' className='w-full h-full object-cover rounded-full'></img>
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


const UserDetailsFragment = () => {

    const InputField = ({ type, id }) => {
        return (
            <input type={type} id={id} className='w-full py-3 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-2 focus:outline-none'></input>
        );
    }

    return (
        <div className='flex bg-gray-200 w-full h-screen mt-16 justify-center'>
            <form className='mt-6 flex flex-col w-[40%]'>
                <div className='flex items-center mt-6 mb-12'>
                    <div className='w-24 h-24 shadow-lg shadow-stone-400 rounded-full mr-4'>
                        <ProfileAvatar />
                    </div>

                    <input type='file' id='profilePic' className='file:bg-gray-700 file:p-2 file:text-white file:rounded-md file:border-none file:cursor-pointer file:drop-shadow-md file:shadow-stone-400 file:mr-4 file:transition file:duration:500 file:ease-in-out hover:file:-translate-y-2 py-2 pl-4 rounded-sm text-gray-700' />
                </div>

                <div className='flex'>

                    <div className='flex flex-col items-start pr-6 w-full'>
                        <h2>{firstNameText}</h2>
                        <InputField type='text' id='firstName' />
                        {/* <input type='text' id='firstName' className='w-full py-2 border-2 rounded-sm text-gray-700 leading-tight mt-2 focus:outline-none '></input> */}
                    </div>
                    <div className='flex flex-col items-start w-full'>
                        <h2>{lastNameText}</h2>
                        <InputField type='text' id='lastName' />
                        {/* <input type='text' id='lastName' className='w-full py-2 border-2 rounded-sm text-gray-700 leading-tight mt-2 focus:outline-none '></input> */}
                    </div>
                </div>

                <div className='flex flex-col items-start mt-6'>
                    <h2>Email</h2>
                    <InputField type='email' id='email' />
                </div>

                <div className='flex flex-col items-start mt-6'>
                    <h2>{dateOfBirthText}</h2>
                    <InputField type='date' id='birthDate' />
                </div>

                <div className='flex mt-6'>
                    <div className='w-full flex flex-col items-start pr-6'>
                        <h2>{phoneText}</h2>
                        <InputField type='number' id='phone' />
                    </div>

                    <div className='w-full flex flex-col items-start'>
                        <h2>{cellPhoneText}</h2>
                        <InputField type='number' id='cellPhone' />
                    </div>

                </div>

                <div className='flex'>
                    <div className='flex flex-col justify-start items-start mt-6 pr-6 w-full'>
                        <h2>{countryText}</h2>
                        <InputField type='text' id='country' />
                    </div>

                    <div className='flex flex-col items-start mt-6 w-full'>
                        <h2>{cityText}</h2>
                        <InputField type='text' id='city' />
                    </div>
                </div>
                <div className='flex flex-col items-start mt-3'>
                    <h1 className='text-lg mb-3 mt-3'>{addressText}</h1>
                    <div className='flex items-center w-full'>
                        <div className='flex flex-col items-start pr-4 w-full justify-start'>
                            <h2>{roadNameText}</h2>
                            <InputField type='text' id='roadName' />
                        </div>
                        <div className='flex flex-col items-start pr-4 w-full'>
                            <h2>{roadNumberText}</h2>
                            <InputField type='number' id='roadNumber' />
                        </div>
                        <div className='flex flex-col items-start w-full'>
                            <h2>{tkText}</h2>
                            <InputField type='number' id='tk' />
                        </div>
                    </div>

                </div>
                <button type="submit" className="text-white mx-auto w-[50%] my-16 p-3 bg-gray-700 duration:700 hover:bg-gray-800 shadow-xl shadow-gray-400 transition duration:500 ease-in-out hover:-translate-y-2">{detailsSubmitText}</button>



            </form>
        </div>
    );
}

export default ApplicantPage;