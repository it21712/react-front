import { useState } from "react";
import { addressText, cellPhoneText, cityText, countryText, dateOfBirthText, detailsSubmitText, firstNameText, lastNameText, phoneText, roadNameText, roadNumberText, tkText } from "../strings";
import { EmailFieldValidator, RequiredFieldValidator, TextOnlyValidator } from "../validators/Validators";


export const ProfileAvatar = ({ pic }) => {
    //const cachedImageUrl = localStorage.getItem('imageUrl');

    return (
        <div className='flex w-full h-full items-center justify-center '>
            <img src={!pic ? '/unknown_avatar.png' : pic} alt='unknown' className='w-full h-full object-cover rounded-full'></img>
        </div>
    );
}

const UserDetailsFragment = ({ imageUrl, fileRef, handleFileSelect, handleSubmit }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [cellPhone, setCellPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [road, setRoad] = useState('');
    const [roadNum, setRoadNum] = useState('');
    const [tk, setTk] = useState('');

    const [validate, setValidate] = useState(false);
    const InputField = ({ type, id, onChange, value }) => {
        console.log(value);
        return (
            <input type={type} id={id} value={value} onChange={onChange} className='w-full py-3 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-2 focus:outline-none'></input>
        );
    }


    const handleFormSubmit = (event) => {
        event.preventDefault();
        //validate form
        setValidate(true);

        handleSubmit();
    }



    return (
        <div className='flex bg-gray-200 w-full h-full justify-center overflow-y-scroll'>
            <form noValidate={true} onSubmit={handleFormSubmit} className='flex flex-col w-[40%]'>
                <div className='flex items-center mt-6 mb-10'>
                    <div className='w-24 h-24 shadow-lg shadow-stone-400 rounded-full mr-4'>
                        <ProfileAvatar pic={imageUrl} />
                    </div>

                    <input type='file' ref={fileRef} onChange={handleFileSelect} id='profilePic' className='file:bg-gray-700 file:p-2 file:text-white file:rounded-md file:border-none file:cursor-pointer file:drop-shadow-md file:shadow-stone-400 file:mr-4 file:transition file:duration:500 file:ease-in-out hover:file:-translate-y-2 py-2 pl-4 rounded-sm text-gray-700' />
                </div>

                <div className='flex'>

                    <div className='flex flex-col items-start pr-6 w-full'>
                        <h2>{firstNameText}</h2>
                        <InputField type='text' value={firstName} id='firstName' onChange={(event) => setFirstName(event.target.value)} />
                        {validate && <h2 className='text-red-500 text-sm font-bold'>{TextOnlyValidator(firstName)}</h2>}

                    </div>
                    <div className='flex flex-col items-start w-full'>
                        <h2>{lastNameText}</h2>
                        <InputField type='text' value={lastName} id='lastName' onChange={(event) => setLastName(event.target.value)} />
                        {validate && <h2 className='text-red-500 text-sm font-bold'>{TextOnlyValidator(lastName)}</h2>}
                    </div>
                </div>

                <div className='flex flex-col items-start mt-6'>
                    <h2>Email</h2>
                    <InputField type='email' id='email' value={'sample@com'} onChange={(event) => setEmail(event.target.value)} />
                    {validate && <h2 className='text-red-500 text-sm font-bold'>{EmailFieldValidator(email)}</h2>}
                </div>

                <div className='flex flex-col items-start mt-6'>
                    <h2>{dateOfBirthText}</h2>
                    <InputField type='date' id='birthDate' value={birthDate} onChange={(event) => setBirthDate(event.target.value)} />
                    {validate && <h2 className='text-red-500 text-sm font-bold'>{RequiredFieldValidator(birthDate)}</h2>}
                </div>

                <div className='flex mt-6'>
                    <div className='w-full flex flex-col items-start pr-6'>
                        <h2>{phoneText}</h2>
                        <InputField type='number' id='phone' value={phone} onChange={(event) => setPhone(event.target.value)} />

                    </div>

                    <div className='w-full flex flex-col items-start'>
                        <h2>{cellPhoneText}</h2>
                        <InputField type='number' id='cellPhone' value={cellPhone} onChange={(event) => setCellPhone(event.target.value)} />
                        {validate && <h2 className='text-red-500 text-sm font-bold'>{RequiredFieldValidator(cellPhone)}</h2>}
                    </div>

                </div>

                <div className='flex'>
                    <div className='flex flex-col justify-start items-start mt-6 pr-6 w-full'>
                        <h2>{countryText}</h2>
                        <InputField type='text' id='country' value={country} onChange={(event) => setCountry(event.target.value)} />
                        {validate && <h2 className='text-red-500 text-sm font-bold'>{RequiredFieldValidator(country)}</h2>}
                    </div>

                    <div className='flex flex-col items-start mt-6 w-full'>
                        <h2>{cityText}</h2>
                        <InputField type='text' id='city' value={city} onChange={(event) => setCity(event.target.value)} />
                        {validate && <h2 className='text-red-500 text-sm font-bold'>{RequiredFieldValidator(city)}</h2>}
                    </div>
                </div>
                <div className='flex flex-col items-start mt-3'>
                    {/* <h1 className='text-lg mb-3 mt-3'>{addressText}</h1> */}
                    <div className='flex items-center w-full'>
                        <div className='flex flex-col items-start pr-4 w-full justify-start'>
                            <h2>{roadNameText}</h2>
                            <InputField type='text' id='roadName' value={road} onChange={(event) => setRoad(event.target.value)} />
                            {validate && <h2 className='text-red-500 text-sm font-bold'>{RequiredFieldValidator(road)}</h2>}
                        </div>
                        <div className='flex flex-col items-start pr-4 w-full'>
                            <h2>{roadNumberText}</h2>
                            <InputField type='number' id='roadNumber' value={roadNum} onChange={(event) => setRoadNum(event.target.value)} />
                            {validate && <h2 className='text-red-500 text-sm font-bold'>{RequiredFieldValidator(roadNum)}</h2>}
                        </div>
                        <div className='flex flex-col items-start w-full'>
                            <h2>{tkText}</h2>
                            <InputField type='number' id='tk' value={tk} onChange={(event) => setTk(event.target.value)} />
                            {validate && <h2 className='text-red-500 text-sm font-bold'>{RequiredFieldValidator(tk)}</h2>}
                        </div>
                    </div>

                </div>
                <button type="submit" className="text-white mx-auto w-[50%] p-3 mt-8 bg-gray-700 duration:700 hover:bg-gray-800 shadow-xl shadow-gray-400 transition-all duration:500 ease-in-out hover:rounded-lg hover:-translate-y-2">{detailsSubmitText}</button>



            </form>
        </div>
    );
}

export default UserDetailsFragment;