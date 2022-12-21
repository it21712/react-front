const RoleButton = ({ icon, text, onClick }) => {
    return (
        <div className="flex flex-col w-40 h-40 bg-gray-300 rounded-xl items-center shadow-xl shadow-slate-400
        transition ease-in-out duration-300 hover:-translate-y-5 hover:bg-gray-600 cursor-pointer group" onClick={onClick}>
            <div className="flex flex-col m-auto items-center space-y-4">
                {icon}
                <h4 className=" text-gray-500 font-bold transition ease-in-out duration-300 group-hover:text-white">{text}</h4>
            </div>

        </div>
    );
}


export default RoleButton;