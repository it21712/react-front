import { useState, useRef, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { cellPhoneText, cityText, countryText, dateOfBirthText, detailsSubmitText, firstNameText, lastNameText, phoneText, roadNameText, roadNumberText, tkText } from "../strings";
import { RequiredFieldValidator, TextOnlyValidator, WordOnlyValidator } from "../validators/Validators";
import useAxiosPrivate, { useAxiosRole } from "../hooks/useAxiosPrivate";
import { APPLICANT_DETAILS_URL, APPLICANT_PROFILEPIC_URL } from "../backend/urls";
import Cookies from "js-cookie";
import { FaPen } from "react-icons/fa";

export const ProfileAvatar = ({ picUrl }) => {

    return (
        <div className='flex w-full h-full items-center justify-center '>
            <img src={!picUrl ? '/unknown_avatar.png' : picUrl} alt='profile pic' className='w-full h-full object-cover rounded-full'></img>
        </div>
    );
}

const UserDetailsFragment = ({ email }) => {

    const [details, setDetails] = useState(undefined);

    const getDetails = () => {
        const detailsStr = localStorage.getItem('details');

        if (detailsStr === null) {
            axiosRole.get(APPLICANT_DETAILS_URL).then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('details', JSON.stringify(response.data));
                    setDetails(response.data);
                }

            }).catch((error) => console.log(error));

        }
        setDetails(JSON.parse(detailsStr));
    }
    const axiosPrivate = useAxiosPrivate();
    const axiosRole = useAxiosRole();
    const { auth } = useAuth();


    useEffect(() => {
        getDetails();
    }, []);

    const InputField = ({ type, id, onChange, value, readOnly }) => {
        return (
            <input type={type} id={id} value={value} readOnly={readOnly} onChange={onChange} className='w-full py-3 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-2 focus:outline-none'></input>
        );
    }

    const InfoField = ({ value, css }) => {
        return (
            <h2 className={'text-gray-700 mt-2 text-lg font-normal ' + css}>{value}</h2>
        );
    }

    const InfoHeader = ({ value, css }) => {
        return (
            <h1 className={'text-2xl font-bold text-gray-900 ' + css}>{value}</h1>
        );
    }


    const DetailsForm = () => {

        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');

        const [birthDate, setBirthDate] = useState('');
        const [phone, setPhone] = useState('');
        const [cellPhone, setCellPhone] = useState('');
        const [country, setCountry] = useState('');
        const [city, setCity] = useState('');
        const [road, setRoad] = useState('');
        const [roadNum, setRoadNum] = useState('');
        const [profilePic, setProfilePic] = useState({});
        const [profilePicUrl, setProfilePicUrl] = useState('');
        const [tk, setTk] = useState('');

        const [firstNameError, setFirstNameError] = useState(null);
        const [lastNameError, setLastNameError] = useState(null);

        const [birthDateError, setBirthDateError] = useState(null);
        const [cellPhoneError, setCellPhoneError] = useState(null);
        const [countryError, setCountryError] = useState(null);
        const [cityError, setCityError] = useState(null);
        const [roadError, setRoadError] = useState(null);
        const [roadNumError, setRoadNumError] = useState(null);
        const [tkError, setTkError] = useState(null);

        const handleFileSelect = (e) => {
            const url = URL.createObjectURL(e.target.files[0]);
            setProfilePicUrl(url);
            setProfilePic(e.target.files[0]);
            localStorage.setItem('profilePic', url);

        }

        const sendDetails = () => {
            const data = {
                'firstName': firstName,
                'lastName': lastName,
                'birth_date': birthDate,
                'phone': phone,
                'cell_phone': cellPhone,
                'country': country,
                'city': city,
                'road': road,
                'road_number': roadNum,
                'postal_code': tk,
                'profile_pic': profilePic,
            }

            //convert data to form data and send request with Content-Type:multipart/form-data headers
            let form_data = new FormData();
            for (const [key, value] of Object.entries(data)) {

                if (key === 'profile_pic') {

                    form_data.append('profile_pic', value, value.name);
                }
                form_data.append(key, value);
            }

            axiosRole.post(APPLICANT_DETAILS_URL, form_data, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    if (response.status === 201) {
                        localStorage.setItem('details', JSON.stringify(data));
                        setDetails(data);
                    }
                });
        }

        const validateForm = () => {

            const fe = WordOnlyValidator(firstName);
            const le = WordOnlyValidator(lastName);
            const be = RequiredFieldValidator(birthDate);
            const ce = RequiredFieldValidator(cellPhone);
            const coe = TextOnlyValidator(country);
            const cie = TextOnlyValidator(city);
            const re = TextOnlyValidator(road);
            const rne = RequiredFieldValidator(roadNum);
            const te = RequiredFieldValidator(tk);

            setFirstNameError(fe);
            setLastNameError(le);
            setBirthDateError(be);
            setCellPhoneError(ce);
            setCountryError(coe);
            setCityError(cie);
            setRoadError(re);
            setRoadNumError(rne);
            setTkError(te);

            if (fe || le || be || ce || coe
                || cie || re || rne || te) return false;

            return true;
        }


        const handleFormSubmit = (event) => {
            event.preventDefault();

            if (validateForm())
                sendDetails(event);
        }



        return (
            <form noValidate={true} onSubmit={handleFormSubmit} className='flex flex-col md:w-[60%] w-[90%]'>
                <div className='flex items-center mt-6 mb-10'>
                    <div className='w-24 h-24 shadow-lg shadow-stone-400 rounded-full mr-4'>
                        <ProfileAvatar picUrl={profilePicUrl} />
                    </div>

                    <input type='file' accept='image/*' id='profilePic' onChange={handleFileSelect} className='file:bg-gray-700 file:p-2 file:text-white file:rounded-md file:border-none file:cursor-pointer file:drop-shadow-md file:shadow-stone-400 file:mr-4 file:transition file:duration:500 file:ease-in-out hover:file:-translate-y-2 py-2 pl-4 rounded-sm text-gray-700' />
                </div>

                <div className='flex'>

                    <div className='flex flex-col items-start pr-6 w-full'>
                        <h2>{firstNameText}</h2>
                        <InputField type='text' value={firstName} id='firstName' onChange={(event) => setFirstName(event.target.value)} />
                        <h2 className='text-red-500 text-sm font-bold'>{firstNameError ? firstNameError : ''}</h2>


                    </div>
                    <div className='flex flex-col items-start w-full'>
                        <h2>{lastNameText}</h2>
                        <InputField type='text' value={lastName} id='lastName' onChange={(event) => setLastName(event.target.value)} />
                        <h2 className='text-red-500 text-sm font-bold'>{lastNameError ? lastNameError : ''}</h2>
                    </div>
                </div>

                <div className='flex flex-col items-start mt-6'>
                    <h2>Email</h2>
                    <InputField type='email' id='email' value={email} readOnly={true} />

                </div>

                <div className='flex flex-col items-start mt-6'>
                    <h2>{dateOfBirthText}</h2>
                    <InputField type='date' id='birthDate' value={birthDate} onChange={(event) => setBirthDate(event.target.value)} />
                    <h2 className='text-red-500 text-sm font-bold'>{birthDateError ? birthDateError : ''}</h2>
                </div>

                <div className='flex mt-6'>
                    <div className='w-full flex flex-col items-start pr-6'>
                        <h2>{phoneText}</h2>
                        <InputField type='number' id='phone' value={phone} onChange={(event) => setPhone(event.target.value)} />

                    </div>

                    <div className='w-full flex flex-col items-start'>
                        <h2>{cellPhoneText}</h2>
                        <InputField type='number' id='cellPhone' value={cellPhone} onChange={(event) => setCellPhone(event.target.value)} />
                        <h2 className='text-red-500 text-sm font-bold'>{cellPhoneError ? cellPhoneError : ''}</h2>
                    </div>

                </div>

                <div className='flex'>
                    <div className='flex flex-col justify-start items-start mt-6 pr-6 w-full'>
                        <h2>{countryText}</h2>
                        <InputField type='text' id='country' value={country} onChange={(event) => setCountry(event.target.value)} />
                        <h2 className='text-red-500 text-sm font-bold'>{countryError ? countryError : ''}</h2>
                    </div>

                    <div className='flex flex-col items-start mt-6 w-full'>
                        <h2>{cityText}</h2>
                        <InputField type='text' id='city' value={city} onChange={(event) => setCity(event.target.value)} />
                        <h2 className='text-red-500 text-sm font-bold'>{cityError ? cityError : ''}</h2>
                    </div>
                </div>
                <div className='flex flex-col items-start mt-3'>

                    <div className='flex items-center w-full'>
                        <div className='flex flex-col items-start pr-4 w-full justify-start'>
                            <h2>{roadNameText}</h2>
                            <InputField type='text' id='roadName' value={road} onChange={(event) => setRoad(event.target.value)} />
                            <h2 className='text-red-500 text-sm font-bold'>{roadError ? roadError : ''}</h2>
                        </div>
                        <div className='flex flex-col items-start pr-4 w-full'>
                            <h2>{roadNumberText}</h2>
                            <InputField type='number' id='roadNumber' value={roadNum} onChange={(event) => setRoadNum(event.target.value)} />
                            <h2 className='text-red-500 text-sm font-bold'>{roadNumError ? roadNumError : ''}</h2>
                        </div>
                        <div className='flex flex-col items-start w-full'>
                            <h2>{tkText}</h2>
                            <InputField type='number' id='tk' value={tk} onChange={(event) => setTk(event.target.value)} />
                            <h2 className='text-red-500 text-sm font-bold'>{tkError ? tkError : ''}</h2>
                        </div>
                    </div>

                </div>
                <button type="submit" className="text-white mx-auto w-[50%] p-3 mt-8 bg-gray-700 duration:700 hover:bg-gray-800 shadow-xl shadow-gray-400 transition-all duration:500 ease-in-out hover:rounded-lg hover:-translate-y-2">{detailsSubmitText}</button>
            </form>
        );
    }
    const DetailSheet2 = ({ data }) => {

        const [profilePicUrl, setProfilePicUrl] = useState('');
        useEffect(() => {
            axiosPrivate.get(APPLICANT_PROFILEPIC_URL, { responseType: 'blob' }).then((response) => {
                const url = URL.createObjectURL(response.data);
                setProfilePicUrl(url);
            });
        }, []);

        return (
            <div className='flex flex-col md:w-[70%] w-[90%]'>
                <div className='flex items-center mt-6 mb-10 justify-between'>
                    <div className='w-32 h-32 shadow-lg shadow-stone-400 rounded-full mr-4'>
                        <ProfileAvatar picUrl={profilePicUrl} />
                    </div>
                    <div className='flex w-12 h-12 bg-gray-700 rounded-full drop-shadow-xl shadow-gray-700 mt-12 mr-32 cursor-pointer transition-all ease-in-out duration-500 hover:bg-gray-600 hover:w-14 hover:h-14'>
                        <div className='m-auto'>
                            <FaPen color='white' />
                        </div>

                    </div>
                </div>

                <div className='flex'>

                    <div className='flex flex-col items-start pr-6 w-[20%]'>
                        <InfoHeader value={firstNameText} />
                        <InfoField value={data.firstName} />
                    </div>
                    <div className='flex flex-col items-start w-[20%]'>
                        <InfoHeader value={lastNameText} />
                        <InfoField value={data.lastName} />
                    </div>
                    <div className='flex flex-col items-start w-[40%]'>
                        <InfoHeader value={dateOfBirthText} />
                        <InfoField value={data.birth_date} />
                    </div>
                </div>

                <div className='flex flex-col items-start mt-16'>
                    <InfoHeader value='Email' />
                    <InfoField value={auth?.email} />

                </div>



                <div className='flex mt-16'>

                    <div className='w-[40%] flex flex-col items-start pr-6'>
                        <InfoHeader value={phoneText} />
                        <InfoField value={data.phone} />

                    </div>

                    <div className='w-[60%] flex flex-col items-start'>
                        <InfoHeader value={cellPhoneText} />
                        <InfoField value={data.cell_phone} />
                    </div>


                </div>

                <div className='flex mt-10'>
                    <div className='flex flex-col justify-start items-start mt-6 pr-6 w-[30%]'>
                        <InfoHeader value={countryText} />
                        <InfoField value={data.country} />
                    </div>

                    <div className='flex flex-col items-start mt-6 w-[30%]'>
                        <InfoHeader value={cityText} />
                        <InfoField value={data.city} />
                    </div>
                </div>
                <div className='flex flex-col items-start mt-16'>
                    <div className='flex items-center w-full'>
                        <div className='flex flex-col items-start pr-4 w-[30%] justify-start'>
                            <InfoHeader value={roadNameText} />
                            <InfoField value={data.road} />
                        </div>
                        <div className='flex flex-col items-start pr-4 w-[30%]'>
                            <InfoHeader value={roadNumberText} />
                            <InfoField value={data.road_number} />
                        </div>
                        <div className='flex flex-col items-start w-[30%]'>
                            <InfoHeader value={tkText} />
                            <InfoField value={data.postal_code} />
                        </div>
                    </div>

                </div>

                <div className='flex justify-end mt-6 w-full'>

                </div>
            </div>
        );
    }

    const DetailSheet = ({ data }) => {

        const [profilePicUrl, setProfilePicUrl] = useState('');
        useEffect(() => {
            axiosPrivate.get(APPLICANT_PROFILEPIC_URL, { responseType: 'blob' }).then((response) => {
                const url = URL.createObjectURL(response.data);
                setProfilePicUrl(url);
            });
        }, []);

        return (
            <div className='flex flex-col md:w-[70%] w-[90%]'>

                <div className='flex items-center justify-start mt-6'>
                    <div className='w-20 h-20 p-1 bg-white shadow-lg shadow-stone-400 rounded-full mr-6 sm:w-32 sm:h-32'>
                        <ProfileAvatar picUrl={profilePicUrl} />
                    </div>
                    <div className='flex-1 flex-col mb-6 justify-start items-start'>
                        <div className='flex justify-start items-start'>
                            <InfoHeader value={data.firstName} css='mr-2' />
                            <InfoHeader value={data.lastName} />
                        </div>
                        <InfoField value={auth?.email} css='flex justify-start' />
                    </div>
                    <div className='flex-2 justify-end'>
                        <div className='flex w-12 h-12 bg-gray-700 rounded-full drop-shadow-xl shadow-gray-700 mt-12 mr-32 cursor-pointer transition-all ease-in-out duration-500 hover:bg-gray-600 hover:w-14 hover:h-14'>
                            <div className='m-auto'>
                                <FaPen color='white' />
                            </div>

                        </div>
                    </div>

                </div>


                <div className='flex mt-16 justify-start items-start'>

                    <div className='flex flex-col w-[40%] items-start justify-start'>
                        <InfoHeader value={phoneText} />
                        <InfoField value={data.phone} />

                    </div>

                    <div className='flex flex-col w-[50%] items-start justify-start'>
                        <InfoHeader value={cellPhoneText} />
                        <InfoField value={data.cell_phone} />
                    </div>


                </div>

                <div className='flex mt-10'>
                    <div className='flex flex-col justify-start items-start mt-6 pr-6 w-[30%]'>
                        <InfoHeader value={countryText} />
                        <InfoField value={data.country} />
                    </div>

                    <div className='flex flex-col items-start mt-6 w-[30%]'>
                        <InfoHeader value={cityText} />
                        <InfoField value={data.city} />
                    </div>
                </div>
                <div className='flex flex-col items-start mt-16'>
                    <div className='flex items-center w-full'>
                        <div className='flex flex-col items-start pr-4 w-[30%] justify-start'>
                            <InfoHeader value={roadNameText} />
                            <InfoField value={data.road} />
                        </div>
                        <div className='flex flex-col items-start pr-4 w-[30%]'>
                            <InfoHeader value={roadNumberText} />
                            <InfoField value={data.road_number} />
                        </div>
                        <div className='flex flex-col items-start w-[30%]'>
                            <InfoHeader value={tkText} />
                            <InfoField value={data.postal_code} />
                        </div>
                    </div>

                </div>

                <div className='flex justify-end mt-6 w-full'>

                </div>
            </div>
        );
    }

    return (
        <div className='flex bg-gray-200 w-full h-full justify-center overflow-y-scroll'>
            {!details ? <DetailsForm /> : <DetailSheet data={details} />}
        </div>
    );


}

export default UserDetailsFragment;