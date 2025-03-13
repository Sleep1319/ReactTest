import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Main from "../views/Main";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import Board from "../views/Board";
import WriteBoard from "../views/WriteBoard";

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Main/>} />
            {/* 로그인시 이용 불가능*/}
            <Route element={<ProtectedRoute requireAuth={false} />}>
                <Route path="/sign-in" element={<SignIn/>} />
                <Route path="/sign-up" element={<SignUp />} />
            </Route>
            {/* 로그인 후 이용가능 */}
            <Route element={<ProtectedRoute requireAuth={true} />}>
                <Route path="/write-board" element={<WriteBoard/>} />
            </Route>
            <Route path="/board/:id" element={<Board/>} />
        </Routes>
    );
};

export default AppRoutes;