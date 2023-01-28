import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { FILETYPE_OBJS } from "../../backend/fileTypes";
import { APPLICANTS_FILES_URL } from "../../backend/urls";
import { useAxiosRole } from "../../hooks/useAxiosPrivate";
import useFileRefresh from "../../hooks/useFileRefresh";
import { certDateText, cityText, countryText, currentlyThereText, departmentText, detailsSubmitText, diplomaDateText, fromDateText, gpaText, institutionText, languageText, levelText, militaryDoneText, positionText, requiredFieldText, supervisorText, titleText, universityText, untilDateText, uploadText } from "../../strings";


const InputField = ({ type, id, onChange, value, readOnly }) => {
    if (id === 'title') id = 'ttId';
    return (
        <input type={type} id={id} value={value} readOnly={readOnly} onChange={onChange} className='w-full py-3 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-2 focus:outline-none'></input>
    );
}

const PdfPreview = ({ content, fileRef = undefined, handlePreviewDelete }) => {
    return (
        <div className='flex max-w-[30%] shadow-lg rounded-xl cursor-pointer px-2 py-3 mr-4 bg-slate-300 transition ease-in-out duration-300 hover:-translate-y-[14%]'>
            <h2 className='text-sm text-gray-600 font-bold truncate w-full h-full mr-4'>{content}</h2>
            <div className='delete-file flex m-auto bg-slate-400 p-2 rounded-full transition ease-in-out duration-300 hover:bg-orange-400 hover:animate-pulse' onClick={
                () => {
                    handlePreviewDelete(fileRef);
                }
            }>
                <FontAwesomeIcon icon={faX} color='white' fontSize={12} />
            </div>
        </div >

    );
}

const FileUploadPrompt = ({ file, title, upload, setUpload }) => {

    const handleChange = () => {
        setUpload(file.current.files[0]);
    }

    const handlePreviewDelete = (fileRef) => {
        file.current.value = ''; //does not cause a rerender
        setUpload(undefined);
    }

    return (
        <div>
            <div className='flex items-center justify-start mb-4 cursor-pointer'>
                <h2 className='text-lg mr-4 font-normal text-gray-600 hover:font-bold' onClick={() => { file.current.click(); }}>{title}</h2>

            </div>

            <input className='hidden' type='file' accept='application/pdf' ref={file} onChange={handleChange}></input>
            <div className="flex w-full items-center justify-start mb-4">
                {upload && <PdfPreview content={upload.name} fileRef={file.current.files[0]} handlePreviewDelete={handlePreviewDelete} />}

            </div>
        </div>

    );
}

const validateForm = (data, setError, file, setUploadError) => {
    let isValid = true;
    const errors = {};
    let uploadError = '';
    Object.keys(data).forEach(field => {
        if (!data[field]) {
            isValid = false;
            errors[field] = requiredFieldText;
        }
    });
    setError(errors);

    if (!file.current.files[0]) {

        uploadError = requiredFieldText;
        isValid = false;
    }
    setUploadError(uploadError);
    return isValid;
}

const successMessageBar = () => {


}


const uploadFile = async (data, file, fileType, axiosRole, setRefreshFiles) => {


    let formData = new FormData();
    console.log(file.current.files[0]);
    formData.set('file', file.current.files[0], file.current.files[0].name);
    formData.set('file_type', fileType);
    Object.keys(data).forEach(field => {
        console.log(data[field]);
        formData.set(field, data[field]);
    });

    const response = await axiosRole.post(APPLICANTS_FILES_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    if (response.status === 201)
        setRefreshFiles(true);

    return response;
}


export const UGDUploadForm = () => {
    const axiosRole = useAxiosRole();
    const file = useRef();
    const { setRefreshFiles } = useFileRefresh();
    const [fileUpload, setFileUpload] = useState(file.current?.files[0] || '');
    const [uploadError, setUploadError] = useState();
    const [error, setError] = useState(FILETYPE_OBJS.UGD);
    const [data, setData] = useState(FILETYPE_OBJS.UGD);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(data, setError, file, setUploadError))
            uploadFile(data, file, 'UGD', axiosRole, setRefreshFiles).then((response) => {
                if (response.status === 201) {
                    //clear and reset form

                    setData(FILETYPE_OBJS.UGD);
                    setFileUpload('');
                    file.current.value = '';
                    event.target.reset();
                }
                //TODO use context to go back to files
            }).catch(error => console.log(error));
    }

    return (
        <div className='flex bg-gray-200 w-full h-full overflow-y-scroll pt-6'>
            <div className='flex flex-col justify-start items-center w-full h-full mt-4'>
                <form noValidate={true} onSubmit={handleSubmit} className='flex flex-col md:w-[50%] w-[80%]'>
                    <div className='flex flex-col items-start pr-6 w-full mb-4'>
                        <h2>{institutionText}</h2>
                        <h2 className='text-red-500 text-sm font-bold '>{error.institution}</h2>
                        <InputField type={'text'} id={'insitution'} value={data['institution']} onChange={(event) => { setData((prev) => { return { ...prev, 'institution': event.target.value } }) }} />
                    </div>
                    <div className='flex w-full mb-4'>
                        <div className='flex flex-col items-start pr-6 w-full mb-4'>
                            <h2>{universityText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.university}</h2>
                            <InputField type={'text'} id={'university'} value={data['university']} onChange={(event) => { setData((prev) => { return { ...prev, 'university': event.target.value } }) }} />
                        </div>

                        <div className='flex flex-col items-start pr-6 w-full mb-4'>
                            <h2>{departmentText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.department}</h2>
                            <InputField type={'text'} id={'department'} value={data['department']} onChange={(event) => { setData((prev) => { return { ...prev, 'department': event.target.value } }) }} />
                        </div>
                    </div>


                    <div className='flex w-full mb-4'>
                        <div className='flex flex-col items-start pr-6 w-full mb-4'>
                            <h2>{countryText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.country}</h2>
                            <InputField type={'text'} id={'country'} value={data['country']} onChange={(event) => { setData((prev) => { return { ...prev, 'country': event.target.value } }) }} />
                        </div>

                        <div className='flex flex-col items-start pr-6 w-full mb-4'>
                            <h2>{cityText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.city}</h2>
                            <InputField type={'text'} id={'city'} value={data['city']} onChange={(event) => { setData((prev) => { return { ...prev, 'city': event.target.value } }) }} />
                        </div>
                    </div>

                    <div className='flex w-full mb-4'>
                        <div className='flex flex-col items-start w-full pr-6 mb-4'>
                            <h2>{diplomaDateText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.diplomaDate}</h2>
                            <InputField type={'date'} id={'diplomaDate'} value={data['diplomaDate']} onChange={(event) => { setData((prev) => { return { ...prev, 'diplomaDate': event.target.value } }) }} />
                        </div>

                        <div className='flex flex-col items-start w-full pr-6 mb-4'>
                            <h2>{gpaText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.gpa}</h2>
                            <InputField type={'text'} id={'gpa'} value={data['gpa']} onChange={(event) => { setData((prev) => { return { ...prev, 'gpa': event.target.value } }) }} />
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-start w-full'>
                        <FileUploadPrompt file={file} title={uploadText} upload={fileUpload} setUpload={setFileUpload} />
                        <h2 className='text-red-500 text-sm font-bold mb-10'>{uploadError}</h2>
                    </div>


                    <div className='flex mb-6'>
                        <div className='flex items-center justify-center min-h-[20px] h-[25%] transition ease-in-out duration-500 hover:bg-gray-800 bg-gray-700 rounded-md p-4 shadow-xl shadow-gray-400'>
                            <button className='text-white text-lg' type='submit'>{detailsSubmitText}</button>
                            <div className='mt-44'></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}


export const PGDUploadForm = () => {
    const axiosRole = useAxiosRole();
    const file = useRef();
    const { setRefreshFiles } = useFileRefresh();
    const [fileUpload, setFileUpload] = useState(file.current?.files[0] || '');
    const [uploadError, setUploadError] = useState();
    const [error, setError] = useState(FILETYPE_OBJS.PGD);
    const [data, setData] = useState(FILETYPE_OBJS.PGD);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(data, setError, file, setUploadError))
            uploadFile(data, file, 'PGD', axiosRole, setRefreshFiles).then((response) => {
                if (response.status === 201) {
                    //clear and reset form

                    setData(FILETYPE_OBJS.PGD);
                    setFileUpload('');
                    file.current.value = '';
                    event.target.reset();
                }
                //TODO use context to go back to files
            }).catch(error => console.log(error));
    }

    return (
        <div className='flex bg-gray-200 w-full h-full overflow-y-scroll pt-6'>
            <div className='flex flex-col justify-start items-center w-full h-full mt-4'>
                <form noValidate={true} onSubmit={handleSubmit} className='flex flex-col md:w-[50%] w-[80%]'>
                    <div className='flex flex-col items-start pr-6 w-full mb-4'>
                        <h2>{institutionText}</h2>
                        <h2 className='text-red-500 text-sm font-bold '>{error.institution}</h2>
                        <InputField type={'text'} id={'insitution'} value={data['institution']} onChange={(event) => { setData((prev) => { return { ...prev, 'institution': event.target.value } }) }} />
                    </div>
                    <div className='flex w-full mb-4'>
                        <div className='flex flex-col items-start pr-6 w-full mb-4'>
                            <h2>{universityText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.university}</h2>
                            <InputField type={'text'} id={'university'} value={data['university']} onChange={(event) => { setData((prev) => { return { ...prev, 'university': event.target.value } }) }} />
                        </div>

                        <div className='flex flex-col items-start pr-6 w-full mb-4'>
                            <h2>{departmentText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.department}</h2>
                            <InputField type={'text'} id={'department'} value={data['department']} onChange={(event) => { setData((prev) => { return { ...prev, 'department': event.target.value } }) }} />
                        </div>
                    </div>


                    <div className='flex w-full mb-4'>
                        <div className='flex flex-col items-start pr-6 w-full mb-4'>
                            <h2>{countryText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.country}</h2>
                            <InputField type={'text'} id={'country'} value={data['country']} onChange={(event) => { setData((prev) => { return { ...prev, 'country': event.target.value } }) }} />
                        </div>

                        <div className='flex flex-col items-start pr-6 w-full mb-4'>
                            <h2>{cityText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.city}</h2>
                            <InputField type={'text'} id={'city'} value={data['city']} onChange={(event) => { setData((prev) => { return { ...prev, 'city': event.target.value } }) }} />
                        </div>
                    </div>

                    <div className='flex flex-col items-start pr-6 w-full mb-4'>
                        <h2>{titleText}</h2>
                        <h2 className='text-red-500 text-sm font-bold'>{error.title}</h2>
                        <InputField type={'text'} id={'title'} value={data['title']} onChange={(event) => { setData((prev) => { return { ...prev, 'title': event.target.value } }) }} />
                    </div>

                    <div className='flex w-full mb-4'>
                        <div className='flex flex-col items-start w-full pr-6 mb-4'>
                            <h2>{diplomaDateText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.diplomaDate}</h2>
                            <InputField type={'date'} id={'diplomaDate'} value={data['diplomaDate']} onChange={(event) => { setData((prev) => { return { ...prev, 'diplomaDate': event.target.value } }) }} />
                        </div>

                        <div className='flex flex-col items-start w-full pr-6 mb-4'>
                            <h2>{gpaText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.gpa}</h2>
                            <InputField type={'text'} id={'gpa'} value={data['gpa']} onChange={(event) => { setData((prev) => { return { ...prev, 'gpa': event.target.value } }) }} />
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-start w-full'>
                        <FileUploadPrompt file={file} title={uploadText} upload={fileUpload} setUpload={setFileUpload} />
                        <h2 className='text-red-500 text-sm font-bold mb-10'>{uploadError}</h2>
                    </div>


                    <div className='flex mb-6'>
                        <div className='flex items-center justify-center min-h-[20px] h-[25%] transition ease-in-out duration-500 hover:bg-gray-800 bg-gray-700 rounded-md p-4 shadow-xl shadow-gray-400'>
                            <button className='text-white text-lg' type='submit'>{detailsSubmitText}</button>
                            <div className='mt-44'></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export const PHDUploadForm = () => {
    const axiosRole = useAxiosRole();
    const file = useRef();
    const { setRefreshFiles } = useFileRefresh();
    const [fileUpload, setFileUpload] = useState(file.current?.files[0] || '');
    const [uploadError, setUploadError] = useState();
    const [error, setError] = useState(FILETYPE_OBJS.PHD);
    const [data, setData] = useState(FILETYPE_OBJS.PHD);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(data, setError, file, setUploadError))
            uploadFile(data, file, 'PHD', axiosRole, setRefreshFiles).then((response) => {
                if (response.status === 201) {
                    //clear and reset form

                    setData(FILETYPE_OBJS.PHD);
                    setFileUpload('');
                    file.current.value = '';
                    event.target.reset();
                }
                //TODO use context to go back to files
            }).catch(error => console.log(error));
    }

    return (
        <div className='flex bg-gray-200 w-full h-full overflow-y-scroll pt-6'>
            <div className='flex flex-col justify-start items-center w-full h-full mt-4'>
                <form noValidate={true} onSubmit={handleSubmit} className='flex flex-col md:w-[50%] w-[80%]'>
                    <div className='flex flex-col items-start pr-6 w-full mb-4'>
                        <h2>{institutionText}</h2>
                        <h2 className='text-red-500 text-sm font-bold '>{error.institution}</h2>
                        <InputField type={'text'} id={'insitution'} value={data['institution']} onChange={(event) => { setData((prev) => { return { ...prev, 'institution': event.target.value } }) }} />
                    </div>
                    <div className='flex w-full mb-4'>
                        <div className='flex flex-col items-start pr-6 w-full mb-4'>
                            <h2>{universityText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.university}</h2>
                            <InputField type={'text'} id={'university'} value={data['university']} onChange={(event) => { setData((prev) => { return { ...prev, 'university': event.target.value } }) }} />
                        </div>

                        <div className='flex flex-col items-start pr-6 w-full mb-4'>
                            <h2>{departmentText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.department}</h2>
                            <InputField type={'text'} id={'department'} value={data['department']} onChange={(event) => { setData((prev) => { return { ...prev, 'department': event.target.value } }) }} />
                        </div>
                    </div>


                    <div className='flex w-full mb-4'>
                        <div className='flex flex-col items-start pr-6 w-full mb-4'>
                            <h2>{countryText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.country}</h2>
                            <InputField type={'text'} id={'country'} value={data['country']} onChange={(event) => { setData((prev) => { return { ...prev, 'country': event.target.value } }) }} />
                        </div>

                        <div className='flex flex-col items-start pr-6 w-full mb-4'>
                            <h2>{cityText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.city}</h2>
                            <InputField type={'text'} id={'city'} value={data['city']} onChange={(event) => { setData((prev) => { return { ...prev, 'city': event.target.value } }) }} />
                        </div>
                    </div>

                    <div className='flex flex-col items-start pr-6 w-full mb-4'>
                        <h2>{titleText}</h2>
                        <h2 className='text-red-500 text-sm font-bold'>{error.title}</h2>
                        <InputField type={'text'} id={'title'} value={data.title} onChange={(event) => { setData((prev) => { return { ...prev, 'title': event.target.value } }) }} />
                    </div>

                    <div className='flex flex-col items-start pr-6 w-full mb-4'>
                        <h2>{supervisorText}</h2>
                        <h2 className='text-red-500 text-sm font-bold'>{error.supervisor}</h2>
                        <InputField type={'text'} id={'supervisor'} value={data['supervisor']} onChange={(event) => { setData((prev) => { return { ...prev, 'supervisor': event.target.value } }) }} />
                    </div>

                    <div className='flex w-full mb-4'>
                        <div className='flex flex-col items-start w-full pr-6 mb-4'>
                            <h2>{diplomaDateText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.diplomaDate}</h2>
                            <InputField type={'date'} id={'diplomaDate'} value={data['diplomaDate']} onChange={(event) => { setData((prev) => { return { ...prev, 'diplomaDate': event.target.value } }) }} />
                        </div>

                        <div className='flex flex-col items-start w-full pr-6 mb-4'>
                            <h2>{gpaText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.gpa}</h2>
                            <InputField type={'text'} id={'gpa'} value={data['gpa']} onChange={(event) => { setData((prev) => { return { ...prev, 'gpa': event.target.value } }) }} />
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-start w-full'>
                        <FileUploadPrompt file={file} title={uploadText} upload={fileUpload} setUpload={setFileUpload} />
                        <h2 className='text-red-500 text-sm font-bold mb-10'>{uploadError}</h2>
                    </div>


                    <div className='flex mb-6'>
                        <div className='flex items-center justify-center min-h-[20px] h-[25%] transition ease-in-out duration-500 hover:bg-gray-800 bg-gray-700 rounded-md p-4 shadow-xl shadow-gray-400'>
                            <button className='text-white text-lg' type='submit'>{detailsSubmitText}</button>
                            <div className='mt-44'></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export const WXPUploadForm = () => {
    const axiosRole = useAxiosRole();
    const file = useRef();
    const { setRefreshFiles } = useFileRefresh();
    const [fileUpload, setFileUpload] = useState(file.current?.files[0] || '');
    const [uploadError, setUploadError] = useState();
    const [error, setError] = useState(FILETYPE_OBJS.WXP);
    const [data, setData] = useState(FILETYPE_OBJS.WXP);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(data, setError, file, setUploadError))
            uploadFile(data, file, 'WXP', axiosRole, setRefreshFiles).then((response) => {
                if (response.status === 201) {
                    //clear and reset form

                    setData(FILETYPE_OBJS.WXP);
                    setFileUpload('');
                    file.current.value = '';
                    event.target.reset();
                }
                //TODO use context to go back to files
            }).catch(error => console.log(error));
    }

    return (
        <div className='flex bg-gray-200 w-full h-full overflow-y-scroll pt-6'>
            <div className='flex flex-col justify-start items-center w-full h-full mt-4'>
                <form noValidate={true} onSubmit={handleSubmit} className='flex flex-col md:w-[50%] w-[80%]'>
                    <div className='flex flex-col items-start pr-6 w-full mb-4'>
                        <h2>{positionText}</h2>
                        <h2 className='text-red-500 text-sm font-bold '>{error.position}</h2>
                        <InputField type={'text'} id={'position'} value={data['position']} onChange={(event) => { setData((prev) => { return { ...prev, 'position': event.target.value } }) }} />
                    </div>
                    <div className='flex w-full mb-4'>
                        <h2 className='mr-4'>{currentlyThereText}</h2>
                        <input className='' type={'checkbox'} id={'currently_working'} value={data['currently_working']} onChange={(event) => { setData((prev) => { return { ...prev, 'currently_working': event.target.checked } }) }} />
                    </div>

                    <div className='flex w-full mb-4'>
                        <div className='flex flex-col items-start w-full pr-6 mb-4'>
                            <h2>{fromDateText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.from}</h2>
                            <InputField type={'date'} id={'from'} value={data['from']} onChange={(event) => { setData((prev) => { return { ...prev, 'from': event.target.value } }) }} />
                        </div>

                        {!data['currently_working'] ? <div className='flex flex-col items-start w-full pr-6 mb-4'>
                            <h2>{untilDateText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.until}</h2>
                            <InputField type={'date'} id={'until'} value={data['until']} onChange={(event) => { setData((prev) => { return { ...prev, 'until': event.target.value } }) }} />
                        </div> : <div></div>}
                    </div>


                    <div className='flex w-full mb-4'>
                        <div className='flex flex-col items-start pr-6 w-full mb-4'>
                            <h2>{countryText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.country}</h2>
                            <InputField type={'text'} id={'country'} value={data['country']} onChange={(event) => { setData((prev) => { return { ...prev, 'country': event.target.value } }) }} />
                        </div>

                        <div className='flex flex-col items-start pr-6 w-full mb-4'>
                            <h2>{cityText}</h2>
                            <h2 className='text-red-500 text-sm font-bold'>{error.city}</h2>
                            <InputField type={'text'} id={'city'} value={data['city']} onChange={(event) => { setData((prev) => { return { ...prev, 'city': event.target.value } }) }} />
                        </div>
                    </div>



                    <div className='flex flex-col justify-center items-start w-full'>
                        <FileUploadPrompt file={file} title={uploadText} upload={fileUpload} setUpload={setFileUpload} />
                        <h2 className='text-red-500 text-sm font-bold mb-10'>{uploadError}</h2>
                    </div>


                    <div className='flex mb-6'>
                        <div className='flex items-center justify-center min-h-[20px] h-[25%] transition ease-in-out duration-500 hover:bg-gray-800 bg-gray-700 rounded-md p-4 shadow-xl shadow-gray-400'>
                            <button className='text-white text-lg' type='submit'>{detailsSubmitText}</button>
                            <div className='mt-44'></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export const CRTUploadForm = () => {
    const axiosRole = useAxiosRole();
    const file = useRef();
    const { setRefreshFiles } = useFileRefresh();
    const [fileUpload, setFileUpload] = useState(file.current?.files[0] || '');
    const [uploadError, setUploadError] = useState();
    const [error, setError] = useState(FILETYPE_OBJS.CRT);
    const [data, setData] = useState(FILETYPE_OBJS.CRT);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(data, setError, file, setUploadError))
            uploadFile(data, file, 'CRT', axiosRole, setRefreshFiles).then((response) => {
                if (response.status === 201) {
                    //clear and reset form

                    setData(FILETYPE_OBJS.CRT);
                    setFileUpload('');
                    file.current.value = '';
                    event.target.reset();
                }
                //TODO use context to go back to files
            }).catch(error => console.log(error));
    }

    return (
        <div className='flex bg-gray-200 w-full h-full overflow-y-scroll pt-6'>
            <div className='flex flex-col justify-start items-center w-full h-full mt-4'>
                <form noValidate={true} onSubmit={handleSubmit} className='flex flex-col md:w-[50%] w-[80%]'>
                    <div className='flex flex-col items-start pr-6 w-full mb-4'>
                        <h2>{titleText}</h2>
                        <h2 className='text-red-500 text-sm font-bold '>{error.title}</h2>
                        <InputField type={'text'} id={'title'} value={data['title']} onChange={(event) => { setData((prev) => { return { ...prev, 'title': event.target.value } }) }} />
                    </div>

                    <div className='flex flex-col items-start w-full pr-6 mb-4'>
                        <h2>{certDateText}</h2>
                        <h2 className='text-red-500 text-sm font-bold'>{error.date}</h2>
                        <InputField type={'date'} id={'date'} value={data['date']} onChange={(event) => { setData((prev) => { return { ...prev, 'date': event.target.value } }) }} />
                    </div>


                    <div className='flex flex-col justify-center items-start w-full'>
                        <FileUploadPrompt file={file} title={uploadText} upload={fileUpload} setUpload={setFileUpload} />
                        <h2 className='text-red-500 text-sm font-bold mb-10'>{uploadError}</h2>
                    </div>


                    <div className='flex mb-6'>
                        <div className='flex items-center justify-center min-h-[20px] h-[25%] transition ease-in-out duration-500 hover:bg-gray-800 bg-gray-700 rounded-md p-4 shadow-xl shadow-gray-400'>
                            <button className='text-white text-lg' type='submit'>{detailsSubmitText}</button>
                            <div className='mt-44'></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export const MCTUploadForm = () => {
    const axiosRole = useAxiosRole();
    const file = useRef();
    const { setRefreshFiles } = useFileRefresh();
    const [fileUpload, setFileUpload] = useState(file.current?.files[0] || '');
    const [uploadError, setUploadError] = useState();
    const [error, setError] = useState(FILETYPE_OBJS.MCT);
    const [data, setData] = useState(FILETYPE_OBJS.MCT);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(data, setError, file, setUploadError))
            uploadFile(data, file, 'MCT', axiosRole, setRefreshFiles).then((response) => {
                if (response.status === 201) {
                    //clear and reset form

                    setData(FILETYPE_OBJS.MCT);
                    setFileUpload('');
                    file.current.value = '';
                    event.target.reset();
                }
                //TODO use context to go back to files
            }).catch(error => console.log(error));
    }

    return (
        <div className='flex bg-gray-200 w-full h-full overflow-y-scroll pt-6'>
            <div className='flex flex-col justify-start items-center w-full h-full mt-4'>
                <form noValidate={true} onSubmit={handleSubmit} className='flex flex-col md:w-[50%] w-[80%]'>
                    <div className='flex w-full mb-4'>
                        <h2 className='mr-4'>{militaryDoneText}</h2>
                        <input className='' type={'checkbox'} id={'fulfilled'} value={data['fulfilled']} onChange={(event) => { setData((prev) => { return { ...prev, 'fulfilled': event.target.checked } }) }} />
                    </div>


                    <div className='flex flex-col justify-center items-start w-full'>
                        <FileUploadPrompt file={file} title={uploadText} upload={fileUpload} setUpload={setFileUpload} />
                        <h2 className='text-red-500 text-sm font-bold mb-10'>{uploadError}</h2>
                    </div>


                    <div className='flex mb-6'>
                        <div className='flex items-center justify-center min-h-[20px] h-[25%] transition ease-in-out duration-500 hover:bg-gray-800 bg-gray-700 rounded-md p-4 shadow-xl shadow-gray-400'>
                            <button className='text-white text-lg' type='submit'>{detailsSubmitText}</button>
                            <div className='mt-44'></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export const FLNUploadForm = () => {
    const axiosRole = useAxiosRole();
    const file = useRef();
    const { setRefreshFiles } = useFileRefresh();
    const [fileUpload, setFileUpload] = useState(file.current?.files[0] || undefined);
    const [uploadError, setUploadError] = useState();
    const [error, setError] = useState(FILETYPE_OBJS.FLN);
    const [data, setData] = useState(FILETYPE_OBJS.FLN);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(data, setError, file, setUploadError))
            uploadFile(data, file, 'FLN', axiosRole, setRefreshFiles).then((response) => {
                if (response.status === 201) {
                    //clear and reset form

                    setData(FILETYPE_OBJS.FLN);
                    setFileUpload('');
                    file.current.value = '';
                    event.target.reset();

                }
                //TODO use context to go back to files
            }).catch(error => console.log(error));
    }

    return (
        <div className='flex bg-gray-200 w-full h-full overflow-y-scroll pt-6'>
            <div className='flex flex-col justify-start items-center w-full h-full mt-4'>
                <form noValidate={true} onSubmit={handleSubmit} className='flex flex-col md:w-[50%] w-[80%]'>
                    <div className='flex flex-col items-start pr-6 w-full mb-4'>
                        <h2>{languageText}</h2>
                        <h2 className='text-red-500 text-sm font-bold '>{error.lang}</h2>
                        <InputField type={'text'} id={'lang'} value={data['lang']} onChange={(event) => { setData((prev) => { return { ...prev, 'lang': event.target.value } }) }} />
                    </div>

                    <div className='flex flex-col items-start w-full pr-6 mb-4'>
                        <h2>{levelText}</h2>
                        <h2 className='text-red-500 text-sm font-bold'>{error.level}</h2>
                        <InputField type={'text'} id={'level'} value={data['level']} onChange={(event) => { setData((prev) => { return { ...prev, 'level': event.target.value } }) }} />
                    </div>

                    <div className='flex flex-col items-start w-full pr-6 mb-4'>
                        <h2>{titleText}</h2>
                        <h2 className='text-red-500 text-sm font-bold'>{error.title}</h2>
                        <InputField type={'text'} id={'title'} value={data['title']} onChange={(event) => { setData((prev) => { return { ...prev, 'title': event.target.value } }) }} />
                    </div>


                    <div className='flex flex-col justify-center items-start w-full'>
                        <FileUploadPrompt file={file} title={uploadText} upload={fileUpload} setUpload={setFileUpload} />
                        <h2 className='text-red-500 text-sm font-bold mb-10'>{uploadError}</h2>
                    </div>


                    <div className='flex mb-6'>
                        <div className='flex items-center justify-center min-h-[20px] h-[25%] transition ease-in-out duration-500 hover:bg-gray-800 bg-gray-700 rounded-md p-4 shadow-xl shadow-gray-400'>
                            <button className='text-white text-lg' type='submit'>{detailsSubmitText}</button>
                            <div className='mt-44'></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}