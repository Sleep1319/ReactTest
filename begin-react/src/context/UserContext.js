import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [state, setState] = useState(() => {
        const savedUser = sessionStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    //유저 정보 변경시 필요요
    useEffect(() => {
        sessionStorage.setItem("user", JSON.stringify(state));
    }, [state]);

    const logout = () => {
        sessionStorage.removeItem("user");
        setState(null);
        alert("로그아웃");
        window.location.href = "/";
    };

    return (
        <UserContext.Provider value={{ state, setState, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}