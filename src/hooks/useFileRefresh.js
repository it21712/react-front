import { useContext } from "react"
import FileFormContext from "../context/FileFormsProvider"

const useFileRefresh = () => {
    return useContext(FileFormContext);
}

export default useFileRefresh;