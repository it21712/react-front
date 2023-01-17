import { useEffect, useRef, useState } from "react";
import FILETYPES from "../backend/fileTypes";
import { APPLICANTS_FILES_URL } from "../backend/urls";
import useAxiosRole from "../hooks/useAxiosRole";
import { AFRText, CRTsText, CVText, MCTText, PGDsText, PHDsText, UGDsText, uploadFileText, WXPsText } from "../strings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import './ApplicantFilesFragment.css';


const ApplicantFilesFragment = () => {
    const axiosRole = useAxiosRole();

    const files = useRef([]);

    const [storedFiles, setStoredFiles] = useState(JSON.parse(localStorage.getItem('uploads')) || undefined);

    useEffect(() => {
        if (!localStorage.getItem('uploads')) {
            axiosRole.get(APPLICANTS_FILES_URL).then(response => {

                //save to localstorage
                const jsonFiles = JSON.stringify(response.data);
                localStorage.setItem('uploads', jsonFiles);

                //set state
                setStoredFiles(response.data);

            }).catch(error => {
                console.error(error);
            });
        }

    }, [axiosRole]);

    const handleSubmit = (event) => {
        event.preventDefault();

        let formData = new FormData();

        //add files and their types in formData
        files.current.forEach((data) => {
            formData.append('files', data.file, data.file.name);
            formData.append('file_types', data.file_type);
        });


        axiosRole.post(APPLICANTS_FILES_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            if (response.status === 201) {
                axiosRole.get(APPLICANTS_FILES_URL).then(response => {
                    if (response.status === 200) {
                        localStorage.setItem('uploads', JSON.stringify(response.data));
                        setStoredFiles(response.data);
                    }
                }).catch(error => console.error(error));

            }
        }).catch(error => { console.error(error) });

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

    const StoredPdfPreview = ({ content, fileId }) => {
        return (
            <div className='flex max-w-[30%] shadow-lg rounded-xl cursor-pointer px-2 py-3 mr-4 bg-white transition ease-in-out duration-300 hover:-translate-y-[14%]'>
                <h2 className='text-sm text-gray-600 font-bold truncate w-full h-full mr-4'>{content}</h2>
                <div className='delete-file flex m-auto bg-slate-200 p-2 rounded-full transition ease-in-out duration-300 hover:bg-orange-400 hover:animate-pulse' onClick={
                    () => {
                        if (fileId) {
                            const data = { 'id': fileId };
                            axiosRole.delete(APPLICANTS_FILES_URL, { data }, { headers: { 'Content-Type': 'application/json' } })
                                .then(response => {
                                    if (response.status === 204) {
                                        axiosRole.get(APPLICANTS_FILES_URL).then(response => {
                                            if (response.status === 200) {
                                                localStorage.setItem('uploads', JSON.stringify(response.data));
                                                setStoredFiles(response.data);
                                            }
                                        }).catch(error => console.error(error));
                                    }
                                })
                                .catch(error => console.error(error));
                        }
                    }
                }>
                    <FontAwesomeIcon icon={faX} fontSize={12} className='delete-file-icon' />
                </div>
            </div>

        );
    }

    const FileUploadSpan = ({ title, fileType, multiple = true }) => {

        const [uploads, setUploads] = useState([]);
        const fileUploads = useRef([]);

        const handleChange = () => {
            const fs = Array.from(fileUploads.current.files);
            files.current = files.current.concat(fs.map((f) => { return { 'file': f, 'file_type': fileType } }));
            setUploads(prev => prev.concat(fs.map((f) => f)));
        }

        const handlePreviewDelete = (fileRef) => {
            files.current = files.current.filter(item => item.file !== fileRef); //does not cause a rerender
            setUploads(uploads.filter(item => item !== fileRef)); //actual removal of the preview component
        }

        return (
            <>
                <div className='flex items-center justify-center mb-4 cursor-pointer'>
                    <h2 className='text-xl mr-4 font-normal text-gray-600 hover:font-bold' onClick={() => { fileUploads.current.click(); }}>{title}</h2>
                </div>

                <input className='hidden' type='file' multiple={multiple} accept='application/pdf' ref={fileUploads} onChange={handleChange}></input>
                <div className="flex w-full items-center justify-start mb-12">
                    {storedFiles && storedFiles.filter(file => file.file_type.includes(fileType)).map((file) => { return <StoredPdfPreview key={file.id} fileId={file.id} content={file.file} /> })}
                    {!uploads.length <= 0 && Array.from(uploads).map((file, i) => { return <PdfPreview key={i} content={file.name} fileRef={fileUploads.current.files[i]} handlePreviewDelete={handlePreviewDelete} /> })}
                </div>
            </>

        );
    }


    return (
        <div className='flex bg-gray-200 w-full h-full overflow-y-scroll'>
            <div className='flex flex-col justify-start items-center w-full h-full'>
                <form noValidate onSubmit={handleSubmit} className='flex flex-col items-start justify-start m-auto min-w-[400px] h-full w-[80%] mt-[5%]'>

                    <FileUploadSpan title={UGDsText} uploadText={uploadFileText} fileType={FILETYPES.UNDER_GRAD_DIPLOMA} />
                    <FileUploadSpan title={PGDsText} uploadText={uploadFileText} fileType={FILETYPES.POST_GRAD_DIPLOMA} />
                    <FileUploadSpan title={PHDsText} uploadText={uploadFileText} fileType={FILETYPES.PHD_DIPLOMA} />
                    <FileUploadSpan title={CVText} multiple={false} uploadText={uploadFileText} fileType={FILETYPES.CV} />
                    <FileUploadSpan title={WXPsText} uploadText={uploadFileText} fileType={FILETYPES.WORK_EXPERIENCE} />
                    <FileUploadSpan title={CRTsText} uploadText={uploadFileText} fileType={FILETYPES.CERTIFICATE} />
                    <FileUploadSpan title={MCTText} multiple={false} uploadText={uploadFileText} fileType={FILETYPES.MILITARY_CERT} />
                    <FileUploadSpan title={AFRText} multiple={false} uploadText={uploadFileText} fileType={FILETYPES.AFFIRMATION} />

                    <div className='flex mb-12'>
                        <div className='flex items-center justify-center min-h-[20px] h-[25%] transition ease-in-out duration-500 hover:bg-gray-800 bg-gray-700 rounded-md p-4 shadow-xl shadow-gray-400'>
                            <button className='text-white text-lg' type='submit'>{uploadFileText}</button>
                            <h2 className='mt-44'></h2>
                        </div>
                    </div>

                </form>



            </div>

        </div>
    );
}

export default ApplicantFilesFragment;