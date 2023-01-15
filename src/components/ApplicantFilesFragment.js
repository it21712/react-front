import { useRef, useState } from "react";
import { APPLICANTS_FILES_URL } from "../backend/urls";
import useAxiosRole from "../hooks/useAxiosRole";
import { uploadPGDsText, uploadPHDsText, uploadUGDsText } from "../strings";

const ApplicantFilesFragment = () => {
    const axiosRole = useAxiosRole();

    const ugdsInput = useRef([]);
    const pgdsInput = useRef([]);
    const phdsInput = useRef([]);
    const cvInput = useRef([]);
    const wxpsInput = useRef([]);
    const crtsInput = useRef([]);
    const mctInput = useRef([]);
    const uafrInput = useRef([]);

    const [ugdFiles, setUgdFiles] = useState(undefined);
    const [pgdFiles, setPgdFiles] = useState(undefined);
    const [phdFiles, setPhdFiles] = useState(undefined);
    const [cv, setCv] = useState(undefined);
    const [wxpFiles, setWxpFiles] = useState(undefined);
    const [crtFiles, setCrtFiles] = useState(undefined);
    const [mctFiles, setMctFiles] = useState(undefined);
    const [afrFiles, setAfrFiles] = useState(undefined);


    const handleSubmit = (event) => {
        event.preventDefault();
        const files = Array.from(ugdFiles);
        let formData = new FormData();
        console.log(files[0]);
        files.forEach((element, i) => {
            console.log(element);
            formData.append('UGD', element, element.name);
        });
        axiosRole.post(APPLICANTS_FILES_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

    }

    const handleUgdsSelect = (e) => {
        const ugds = ugdsInput.current.files;
        console.log(ugds);
        setUgdFiles(ugds);
    }

    const handleFileSelect = ({ fileRef, setFiles }) => {
        setFiles(fileRef.current.files);
    }


    const PdfPreview = ({ content }) => {
        return (
            <div className='flex max-w-[30%] h-12 shadow-lg rounded-xl cursor-pointer p-2 mr-4 bg-white transition ease-in-out duration-300 hover:-translate-y-[14%]'>
                <h2 className='text-sm text-gray-600 font-bold truncate w-full h-full'>{content}</h2>
                { }
            </div>

        );
    }

    const FileUploadSpan = ({ fileRef, uploadText, multiple = true, handleFileChange, files }) => {
        return (
            <>
                <div className='flex bg-gray-800 rounded-lg p-2 cursor-pointer mb-6' onClick={() => { handleRefClick(fileRef) }}>
                    <h2 className='text-white'>{uploadText}</h2>
                </div>
                <input className='hidden' type='file' multiple={multiple} accept='application/pdf' ref={fileRef} onChange={handleFileChange}></input>
                <div className="flex w-full items-center justify-start mb-12">
                    {files && Array.from(fileRef.current.files).map((file, i) => { return <PdfPreview key={i} content={file.name} /> })}
                </div>
            </>

        );
    }

    const handleRefClick = (fileRef) => {
        fileRef.current.click();
    }

    return (
        <div className='flex bg-gray-200 w-full h-full overflow-y-scroll'>
            <form noValidate onSubmit={handleSubmit} className='flex flex-col items-start justify-start m-auto min-w-[400px] h-full w-[80%] mt-[5%]'>

                <FileUploadSpan fileRef={ugdsInput} files={ugdFiles} uploadText={uploadUGDsText} handleFileChange={handleUgdsSelect} />
                <FileUploadSpan fileRef={pgdsInput} files={pgdFiles} uploadText={uploadPGDsText} handleFileChange={() => { setPgdFiles(pgdsInput.current.files) }} />
                <FileUploadSpan fileRef={phdsInput} files={phdFiles} uploadText={uploadPHDsText} handleFileChange={() => { setPhdFiles(phdsInput.current.files) }} />
                <FileUploadSpan fileRef={ugdsInput} files={ugdFiles} uploadText={uploadUGDsText} handleFileChange={handleUgdsSelect} />
                <FileUploadSpan fileRef={ugdsInput} files={ugdFiles} uploadText={uploadUGDsText} handleFileChange={handleUgdsSelect} />
                <FileUploadSpan fileRef={ugdsInput} files={ugdFiles} uploadText={uploadUGDsText} handleFileChange={handleUgdsSelect} />
                <FileUploadSpan fileRef={ugdsInput} files={ugdFiles} uploadText={uploadUGDsText} handleFileChange={handleUgdsSelect} />
                <FileUploadSpan fileRef={ugdsInput} files={ugdFiles} uploadText={uploadUGDsText} handleFileChange={handleUgdsSelect} />
                <button className='mt-12' type="submit">Send</button>
            </form>
        </div>
    );
}

export default ApplicantFilesFragment;