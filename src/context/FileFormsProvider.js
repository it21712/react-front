import { createContext, useState } from "react";

const FileFormContext = createContext({});

export const FileFormsProvider = ({ children }) => {

    const [refreshFiles, setRefreshFiles] = useState(true);

    return (
        <FileFormContext.Provider value={{ refreshFiles, setRefreshFiles }}>
            {children}
        </FileFormContext.Provider>
    );
}

export default FileFormContext; 