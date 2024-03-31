
import { Navigate } from 'react-router-dom';
import { NAV_PATH } from '../constants/navPath';
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';

interface IProtected {
    children: React.ReactNode
}

export default function Protected({ children }: IProtected) {
    const { isLogin, isLoading } = useAppContext()
    if (isLoading) return <div>Loading ...</div>
    if (!isLogin) return <Navigate to={NAV_PATH.login} />
    return children;
}