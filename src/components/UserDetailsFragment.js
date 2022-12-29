import { addressText, cellPhoneText, cityText, countryText, dateOfBirthText, detailsSubmitText, firstNameText, lastNameText, phoneText, roadNameText, roadNumberText, tkText } from "../strings";


export const ProfileAvatar = ({ pic }) => {
    return (
        <div className='flex w-full h-full items-center justify-center '>
            <img src='/unknown_avatar.png' alt='unknown' className='w-full h-full object-cover rounded-full'></img>
        </div>
    );
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
                    </div>
                    <div className='flex flex-col items-start w-full'>
                        <h2>{lastNameText}</h2>
                        <InputField type='text' id='lastName' />
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
                <button type="submit" className="text-white mx-auto w-[50%] my-16 p-3 bg-gray-700 duration:700 hover:bg-gray-800 shadow-xl shadow-gray-400 transition-all duration:500 ease-in-out hover:rounded-lg hover:-translate-y-2">{detailsSubmitText}</button>



            </form>
        </div>
    );
}

export default UserDetailsFragment;