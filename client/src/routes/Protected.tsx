
import { Navigate } from 'react-router-dom';
import { NAV_PATH } from '../constants/navPath';
import React from 'react';

interface IProtected {
    children: React.ReactNode
}

export default function Protected({ children }: IProtected) {

    const isLogin = false

    if (!isLogin) return <Navigate to={NAV_PATH.login} replace />;
    return children;
}