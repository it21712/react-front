import { useState } from "react";
import { expirationText } from "../strings";

const InvitationsFragment = () => {

    const [data, setData] = useState({
        title: '',
        program: '',
        publishDate: '',
        expDate: '21/05/2022',
    });
    const [title, setTitle] = useState('HUA MSc Programme');
    const [program, setProgram] = useState('1o Research MSc programme by Harokopeio University of Athens')
    const InvitationComponent = () => {
        return (
            <div className='mb-20 mx-auto flex flex-col md:w-[60%] w-[90%] md:h-[25%] h-[30%] bg-white rounded-t-2xl rounded-b-2xl drop-shadow-md cursor-pointer transition ease-in-out duration-200 hover:-translate-y-4 hover:translate-x-2 hover:shadow-lg'>
                <span className='flex px-6 justify-between items-center w-full h-[20%] bg-stone-300'>
                    <h1 className='text-xl font-sans font-medium text-gray-800'>{title}</h1>
                    <h2 className='text-sm text-gray-700'>{data.expDate}</h2>
                </span>
                <div className='flex flex-col pl-6 mt-2 w-full items-start justify-start'>
                    <h2 className='font-sans text-base mt-10 '>{program}</h2>
                    <span className='flex justify-start items-center w-full mt-8'>
                        <h2 className='text-lg'>{expirationText}</h2>
                        <h2 className='pl-8 tex-base font-mono'>{data.expDate}</h2>
                    </span>
                    <span className='flex w-full justify-end '>
                        <div className='flex cursor-pointer transition ease-in-out duration-500 mr-4 bg-stone-500 p-2'>
                            <h2 className='text-white'>Apply Now</h2>
                        </div>
                    </span>
                </div>

            </div>
        );


    }

    return (
        <div className='w-full h-full flex flex-col bg-gray-200'>
            <div className='w-full h-full mt-12'>
                <InvitationComponent />
                <InvitationComponent />
            </div>

        </div>
    );
}

export default InvitationsFragment;