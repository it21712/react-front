import { useContext } from "react";
import TabContext from "../context/TabProvider";

const useTab = () => {
    return useContext(TabContext);
}

export default useTab;