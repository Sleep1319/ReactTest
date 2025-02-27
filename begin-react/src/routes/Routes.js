import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../views/Main";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Main/>} />
            <Route path='sign-in' element={<SignIn/>} />
            <Route path="sign-up" element={<SignUp/>} />
        </Routes>
    );
};

export default AppRoutes;