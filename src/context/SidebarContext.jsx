import React, { createContext, useContext, useState} from 'react';

const SidebarContext = createContext();

export const useSidebar = () => {
    return useContext(SidebarContext);
};

export const SidebarProvider = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    // Toggle the sidebar's collapsed state
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <SidebarContext.Provider
            value={{
                isCollapsed,
                setIsCollapsed,
                toggleSidebar,
            }}
        >
            {children}
        </SidebarContext.Provider>
    )
}