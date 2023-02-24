import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { APPLICANT_PROFILEPIC_URL, EVALUATOR_APPLICANT_PROFILEPIC_URL } from '../backend/urls';
import useAxiosEvaluator from "../hooks/useAxiosEvaluator";
import { FaChevronRight } from 'react-icons/fa';

const ApplicantPreviewPage = () => {
    const location = useLocation();
    console.log(location.state.applicants);

    const applicants = location.state.applicants;
    const invitationTitle = location.state.title;

    const axiosEvaluator = useAxiosEvaluator();

    const ApplicantPreviewComponent = ({ applicant }) => {

        const [profilePicUrl, setProfilePicUrl] = useState('');

        const fetchProfilePic = () => {
            console.log(`fetching profile pic for applicant: ${applicant.firstName} ${applicant.lastName}`);
            axiosEvaluator.post(EVALUATOR_APPLICANT_PROFILEPIC_URL, { id: applicant.id }, { responseType: 'blob' }).then((response) => {
                if (response.status !== 204) {
                    const url = URL.createObjectURL(response.data);
                    setProfilePicUrl(url);
                }

            }).catch((error) => { console.log(error) });

        }

        useEffect(() => {
            fetchProfilePic();
        }, []);

        return (
            <div className='flex p-4 rounded-md bg-white justify-between items-center cursor-pointer space-x-4 shadow-lg hover:-translate-y-[6%] transition-all duration-300 ease-in-out'>
                <div className='flex flex-row space-x-4'>
                    <div className='flex rounded-full bg-gray-300'>
                        <img src={!profilePicUrl ? '/unknown_avatar.png' : profilePicUrl} alt='profile pic' className='w-8 h-8 object-cover rounded-full'></img>
                    </div>
                    <h2 className='text-gray-700 font-bold'>{applicant.firstName + ' ' + applicant.lastName}</h2>
                </div>

                <FaChevronRight color='gray' />
            </div>
        );
    }

    return (
        <div className='flex flex-col w-full h-screen items-center justify-start p-6 bg-gray-200'>
            <h1 className='font-bold text-xl text-gray-700'>{invitationTitle}</h1>

            <div className='flex flex-col space-y-6 mt-12'>
                {applicants.map(applicant => { return <ApplicantPreviewComponent key={applicant.id} applicant={applicant} /> })}
            </div>
        </div>
    )
}

export default ApplicantPreviewPage