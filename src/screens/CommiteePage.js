import { useEffect } from "react";
import { EVALUATOR_VIEW_INVITATIONS_URL } from "../backend/urls";
import useAxiosEvaluator from "../hooks/useAxiosEvaluator";
import { logoutText } from "../strings";

const CommiteePage = () => {

    const testEvaluator = {
        name: 'Thomas Kamalakis',
        email: 'thkam@app.com',
    };

    const axiosEvaluator = useAxiosEvaluator();

    const fetchInvitations = () => {
        axiosEvaluator.get(EVALUATOR_VIEW_INVITATIONS_URL).then((response => {
            console.log(response.data);
        })).catch(error => console.error(error));
    }

    useEffect(() => {
        fetchInvitations();
    }, []);

    return (
        <div className='flex h-screen w-screen bg-gray-200'>
            <div className="flex bg-gray-800 shadow-md fixed w-full z-10 top-0 h-16 px-4 justify-between items-center">
                <h2 className='font-semibold invisible sm:visible text-white my-auto text-lg'>{testEvaluator.name}</h2>
                <div className='flex justify-center items-center'>
                    {/* <h3 className='font-semibold invisible sm:visible text-white my-auto text-lg mr-6 '>{testEvaluator.email}</h3> */}
                    <div className='cursor-pointer flex bg-gray-800 rounded-full px-3 py-[7px] border-white border-2 hover:bg-gray-700'>
                        <h2 className='text-white'>{logoutText}</h2>
                        {/* <FontAwesomeIcon icon={faArrowRightFromBracket} color={'white'} fontSize={22} /> */}
                    </div>
                </div>

            </div>

            <div className='flex m-auto'>

            </div>
        </div>
    );
}

export default CommiteePage;