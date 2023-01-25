import { createContext, useState } from "react";

const FileFormContext = createContext({});

export const FileFormsProvider = ({ children }) => {

    const [path, setPath] = useState(true);

    return (
        <FileFormContext.Provider value={{ path, setPath }}>
            {children}
        </FileFormContext.Provider>
    );
}

export default FileFormContext; 