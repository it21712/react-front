import { verifyEmailDesc, verifyEmailText } from "../strings";


const VerifyEmailPage = () => {
    return (
        <div className="flex h-screen w-screen bg-slate-200">
            <VerifyEmailForm></VerifyEmailForm>
        </div>
    );
}

const VerifyEmailForm = () => {
    return (
        <div className="flex flex-col flex-wrap items-center m-auto w-[400px]  bg-white shadow-2xl shadow-slate-400 px-8 pb-20">
            <h2 className="py-14 text-xl text-gray-800">{verifyEmailText}</h2>

            <h2 className="text-lg text-gray-500">{verifyEmailDesc}</h2>
        </div>
    );

}


export default VerifyEmailPage;