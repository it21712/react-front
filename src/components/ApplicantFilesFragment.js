import { useRef, useState } from "react";
import FILETYPES from "../backend/fileTypes";
import { APPLICANTS_FILES_URL } from "../backend/urls";
import useAxiosRole from "../hooks/useAxiosRole";
import { uploadPGDsText, uploadPHDsText, uploadUGDsText } from "../strings";

const ApplicantFilesFragment = () => {
    const axiosRole = useAxiosRole();

    const files = useRef([]);
    const file_types = useRef([]);

    const handleSubmit = (event) => {
        event.preventDefault();

        let formData = new FormData();

        //add files in formData
        files.current.forEach((file) => {
            formData.append('files', file, file.name);
        });

        //add fileTypes in formData
        file_types.current.forEach((fileType) => {
            formData.append('file_types', fileType)
        });

        axiosRole.post(APPLICANTS_FILES_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

    }

    const PdfPreview = ({ content }) => {
        return (
            <div className='flex max-w-[30%] h-12 shadow-lg rounded-xl cursor-pointer p-2 mr-4 bg-white transition ease-in-out duration-300 hover:-translate-y-[14%]'>
                <h2 className='text-sm text-gray-600 font-bold truncate w-full h-full'>{content}</h2>
                { }
            </div>

        );
    }

    const FileUploadSpan = ({ uploadText, fileType, multiple = true }) => {

        const [uploads, setUploads] = useState([]);
        const fileUploads = useRef([]);
        return (
            <>
                <div className='flex bg-gray-800 rounded-lg p-2 cursor-pointer mb-6' onClick={() => { fileUploads.current.click() }}>
                    <h2 className='text-white'>{uploadText}</h2>
                </div>
                <input className='hidden' type='file' multiple={multiple} accept='application/pdf' ref={fileUploads} onChange={() => {

                    const fs = Array.from(fileUploads.current.files);
                    console.log(fs);
                    setUploads(prev => prev.concat(fs.map((f) => f)));
                    files.current = files.current.concat(fs.map((f) => f));
                    const _types = fs.map(() => fileType);
                    file_types.current = file_types.current.concat(_types);
                }}></input>
                <div className="flex w-full items-center justify-start mb-12">
                    {!uploads.length <= 0 && Array.from(uploads).map((file, i) => { return <PdfPreview key={i} content={file.name} /> })}
                </div>
            </>

        );
    }


    return (
        <div className='flex bg-gray-200 w-full h-full overflow-y-scroll'>
            <form noValidate onSubmit={handleSubmit} className='flex flex-col items-start justify-start m-auto min-w-[400px] h-full w-[80%] mt-[5%]'>

                <FileUploadSpan uploadText={uploadUGDsText} fileType={FILETYPES.UNDER_GRAD_DIPLOMA} />
                <FileUploadSpan uploadText={uploadPGDsText} fileType={FILETYPES.POST_GRAD_DIPLOMA} />
                <FileUploadSpan uploadText={uploadPHDsText} fileType={FILETYPES.PHD_DIPLOMA} />
                <FileUploadSpan uploadText={uploadUGDsText} fileType={FILETYPES.CV} />
                <FileUploadSpan uploadText={uploadUGDsText} fileType={FILETYPES.WORK_EXPERIENCE} />
                <FileUploadSpan uploadText={uploadUGDsText} fileType={FILETYPES.CERTIFICATE} />
                <FileUploadSpan uploadText={uploadUGDsText} fileType={FILETYPES.MILITARY_CERT} />
                <FileUploadSpan uploadText={uploadUGDsText} fileType={FILETYPES.AFFIRMATION} />

                <button className='mt-12' type="submit">Send</button>
            </form>
        </div>
    );
}

export default ApplicantFilesFragment;