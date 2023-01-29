import { useEffect, useRef, useState } from "react";
import FILETYPES, { FILETYPE_FIELDS, FILETYPE_OBJS } from "../backend/fileTypes";
import { APPLICANTS_FILES_URL, APPLICANTS_FILE_DOWNLOAD_URL, APPLICANTS_FILE_METADATA_URL } from "../backend/urls";
import useAxiosRole from "../hooks/useAxiosRole";
import { AFRText, CRTsText, CVText, FLNsText, MCTText, PGDsText, PHDsText, UGDsText, uploadFilesText, WXPsText } from "../strings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faArrowDown, faArrowUp, faX } from "@fortawesome/free-solid-svg-icons";
import { CRTUploadForm, FLNUploadForm, MCTUploadForm, PGDUploadForm, PHDUploadForm, UGDUploadForm, uploadFile, validateForm, WXPUploadForm } from "./forms/FileForms";
import { Link, Route, Routes } from "react-router-dom";

import { FileFormsProvider } from "../context/FileFormsProvider";
import useFileRefresh from "../hooks/useFileRefresh";


const ApplicantFilesFragment = () => {
    const axiosRole = useAxiosRole();

    const files = useRef([]);

    const [storedFiles, setStoredFiles] = useState(JSON.parse(localStorage.getItem('uploads')) || undefined);

    const [upload, setUpload] = useState(false);


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

        const [showDetails, setShowDetails] = useState(false);
        const [loading, setLoading] = useState(false);
        const fileDetails = useRef(undefined);
        const printObj = useRef({});
        const handleDeleteFile = () => {
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

        useEffect(() => {
            if (showDetails) {
                console.log('fetching details');
                setLoading(true);
                fetchFileDetails().then(response => {
                    fileDetails.current = response.data;
                    console.log(fileDetails);

                    //map field titles to sent values
                    const fileType = fileDetails.current.file_type;
                    console.log(fileType);

                    const dataObj = FILETYPE_FIELDS[fileType];

                    Object.keys(dataObj).map(key => {
                        printObj.current[dataObj[key]] = fileDetails.current[key];
                    });
                    console.log(printObj.current);

                    setLoading(false);
                })
                    .catch(error => console.log(error));
            }

        }, [showDetails, fileDetails]);

        const fetchFileDetails = async () => {
            return axiosRole.get(APPLICANTS_FILE_METADATA_URL, { params: { file_id: fileId } });
        }

        const handleFileDownload = async () => {
            return axiosRole.get(APPLICANTS_FILE_DOWNLOAD_URL, { params: { file_id: fileId }, responseType: 'blob' }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.pdf'); // set the file name
                document.body.appendChild(link);
                link.click();
            });
        }

        return (
            <div className={`flex flex-col max-w-[35%] min-w-[300px] shadow-lg rounded-xl cursor-pointer px-2 py-3 mr-4 bg-white`} >

                <div className='flex justify-start items-start'>
                    <h2 className='flex text-sm text-gray-600 font-bold truncate w-[80%] hover:text-red-900' onClick={handleFileDownload}>{content}</h2>
                    <div className='flex w-[20%] justify-end'>
                        <div className='delete-file flex my-auto bg-slate-200 p-2 rounded-full transition ease-in-out duration-300 hover:bg-orange-400 hover:animate-pulse' onClick={handleDeleteFile}>
                            <FontAwesomeIcon icon={faX} fontSize={12} className='delete-file-icon' />
                        </div>
                    </div>

                </div>

                {printObj.current ?
                    <div style={{ maxHeight: showDetails ? '500px' : 0 }} className={`flex flex-col overflow-y-hidden justify-center items-start mt-2 transition-all duration-500 ease-in-out `}>
                        {Object.keys(printObj.current).map(key => (
                            <div key={key} className='flex flex-col justify-center items-start'>
                                <h2 className='font-bold text-lg text-yellow-600 mt-1'>{`${key}`}</h2>
                                <h2 className='mb-4'>{`${printObj.current[key]}`}</h2>
                            </div>

                        ))}
                    </div> : <></>}

                <div className='flex w-full justify-center items-start'>
                    <div className='animate-bounce' onClick={() => setShowDetails(!showDetails)}>
                        <FontAwesomeIcon icon={showDetails ? faArrowUp : faArrowDown} fontSize={17} color={'gray'} />
                    </div>

                </div>



            </div>

        );
    }


    const FileUploadSpan = ({ title, fileType, linkTo }) => {

        const [uploads, setUploads] = useState([]);
        const fileUploads = useRef([]);


        const handlePreviewDelete = (fileRef) => {
            files.current = files.current.filter(item => item.file !== fileRef); //does not cause a rerender
            setUploads(uploads.filter(item => item !== fileRef)); //actual removal of the preview component
        }

        return (
            <>
                <Link to={linkTo} className='flex items-center justify-center mb-4 cursor-pointer'>
                    <h2 className='text-xl mr-4 font-normal text-gray-600 hover:font-bold' onClick={() => { setUpload(true) }}>{title}</h2>
                </Link>

                <div className="flex w-full items-start justify-start mb-12">
                    {storedFiles && storedFiles.filter(file => file.file_type.includes(fileType)).map((file) => { return <StoredPdfPreview key={file.id} fileId={file.id} content={file.file} /> })}
                    {!uploads.length <= 0 && Array.from(uploads).map((file, i) => { return <PdfPreview key={i} content={file.name} fileRef={fileUploads.current.files[i]} handlePreviewDelete={handlePreviewDelete} /> })}
                </div>
            </>

        );
    }

    //TODO clear file form after successfull submition
    //TODO deleting pdf preview trigers route change

    const FileCategoriesView = () => {

        const { refreshFiles, setRefreshFiles } = useFileRefresh();

        useEffect(() => {

            if (refreshFiles) {

                axiosRole.get(APPLICANTS_FILES_URL).then(response => {
                    //save to localstorage
                    const jsonFiles = JSON.stringify(response.data);
                    localStorage.setItem('uploads', jsonFiles);

                    //set state
                    setStoredFiles(response.data);

                    setRefreshFiles(false);
                }).catch(error => {
                    console.log(error);
                });
            }
        }, [refreshFiles]);

        return (
            <div className='flex bg-gray-200 w-full h-full overflow-y-scroll'>
                <div className='flex flex-col justify-start items-center w-full h-full'>
                    <div className='flex flex-col items-start justify-start m-auto min-w-[400px] h-full w-[80%] mt-[5%]'>

                        <FileUploadSpan title={UGDsText} fileType={FILETYPES.UNDER_GRAD_DIPLOMA} linkTo={'UGDs'} />
                        <FileUploadSpan title={PGDsText} fileType={FILETYPES.POST_GRAD_DIPLOMA} linkTo={'PGDs'} />
                        <FileUploadSpan title={PHDsText} fileType={FILETYPES.PHD_DIPLOMA} linkTo={'PHDs'} />


                        <FileUploadSpan title={CVText} fileType={FILETYPES.CV} />

                        <FileUploadSpan title={WXPsText} fileType={FILETYPES.WORK_EXPERIENCE} linkTo={'WXPs'} />
                        <FileUploadSpan title={CRTsText} fileType={FILETYPES.CERTIFICATE} linkTo={'CRTs'} />
                        <FileUploadSpan title={FLNsText} fileType={FILETYPES.FOREIGN_LANG} linkTo={'FLNs'} />
                        <FileUploadSpan title={MCTText} fileType={FILETYPES.MILITARY_CERT} linkTo={'MCTs'} />

                        <FileUploadSpan title={AFRText} fileType={FILETYPES.AFFIRMATION} />

                        <div className='flex mb-12'>

                        </div>

                    </div>



                </div>

            </div>
        );
    }

    return (
        <FileFormsProvider>
            <Routes>
                <Route index element={<FileCategoriesView />} />
                <Route path={'/UGDs'} element={<UGDUploadForm />} />
                <Route path={'/PGDs'} element={<PGDUploadForm />} />
                <Route path={'/PHDs'} element={<PHDUploadForm />} />
                <Route path={'/WXPs'} element={<WXPUploadForm />} />
                <Route path={'/CRTs'} element={<CRTUploadForm />} />
                <Route path={'/MCTs'} element={<MCTUploadForm />} />
                <Route path={'/FLNs'} element={<FLNUploadForm />} />
            </Routes>
        </FileFormsProvider>

    );
}

export default ApplicantFilesFragment;