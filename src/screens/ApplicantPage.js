import { appTitle } from "../strings";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
const ApplicantPage = () => {
    const { auth } = useAuth();
    return (
        <div className="flex flex-col h-screen">
            <div className="flex bg-gray-800 shadow-md fixed w-full z-10 top-0 h-16 px-3 justify-between items-center">
                <h3 className='font-normal invisible sm:visible text-white my-auto'>{appTitle}</h3>
                <ProfileButton email={auth.email} />
            </div>
        </div>
    );

}

const ProfileButton = ({ email }) => {
    return (
        <div className="flex justify-center px-4 group items-center">
            <h3 className='font-bold invisible sm:visible text-white my-auto mr-4 text-lg'>{email}</h3>
            <button className="my-auto ml-7" onClick={useLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} fontSize={17} color='white'></FontAwesomeIcon>
            </button>

            {/* <div className="my-auto group-hover:motion-safe:animate-bounce"><FaAngleDown color="white" fontSize={20.0}></FaAngleDown></div> */}
        </div>
    );
}

export default ApplicantPage;