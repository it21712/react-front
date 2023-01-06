import { createContext, useState } from "react";
import AuthContext from "./AuthProvider";

const TabContext = createContext({ currentTab: 0 });

export const TabProvider = ({ children }) => {
    const currentTab = 0;
    const [tab, setTab] = useState(currentTab);

    return (
        <TabContext.Provider value={{ tab, setTab }}>
            {children}
        </TabContext.Provider>
    );
}

export default TabContext;