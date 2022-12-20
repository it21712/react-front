import React from 'react';
import { applicantText, appLoginMethodText, appTitle, evaluatorText, welcomeText } from '../strings';
import RoleButton from '../components/RoleButton';
import { FaUniversity, FaFolderOpen } from 'react-icons/fa';



const WelcomePage = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex bg-gray-800 shadow-md fixed w-full z-10 top-0 h-16 px-3">
                <h3 className='font-normal invisible sm:visible text-white my-auto'>{appTitle}</h3>
            </div>
            <div className="flex items-center justify-center h-1/4 sm:h-1/2" >
                <img src='huacover_a.jpg' alt='university' className='h-full w-full object-cover'></img>
            </div>
            <div className=' flex-[4] py-5'>
                <h3 className='font-bold text-2xl invisible sm:visible text-gray-800 px-8'>{welcomeText}</h3>
                <h3 className='font-normal text-xl invisible sm:visible text-gray-800 py-6'>{appLoginMethodText}</h3>
                <div className='flex justify-center space-x-8 py-8'>
                    <RoleButton icon={<FaFolderOpen size='45' className='text-stone-500 transition ease-in-out duration-300 group-hover:text-white' />} text={applicantText} />
                    <RoleButton icon={<FaUniversity size='45' className='text-stone-500 transition ease-in-out duration-300 group-hover:text-white' />} text={evaluatorText} />

                </div>

            </div>
        </div>
    );
}

export default WelcomePage;
