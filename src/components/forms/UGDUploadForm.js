const UGDUploadForm = () => {

    return (
        <div className='flex bg-gray-200 w-full h-full overflow-y-scroll'>
                <div className='flex flex-col justify-start items-center w-full h-full mt-4'>
                    <h2 className='text-xl mr-4  mb-6 font-normal text-gray-600'>{title}</h2>
                    <form noValidate={true} onSubmit={handleSubmit} className='flex flex-col md:w-[50%] w-[80%]'>
                        {fields.map((field, i) => {return <FormField key={i} field={field}/>} )}
                        <FileUploadPrompt title={uploadText} uploadText={uploadFilesText} fileType={fileType} />

                        <div className='flex mb-12'>
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

export default UGDUploadForm;