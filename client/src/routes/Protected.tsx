
import { Navigate } from 'react-router-dom';
import { NAV_PATH } from '../constants/navPath';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
const baseUrl = import.meta.env.VITE_BASE_URL

interface IProtected {
    children: React.ReactNode
}

export default function Protected({ children }: IProtected) {
    const { isLogin, handleLogin } = useAppContext()
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const res = await fetch(`${baseUrl}/api/user/check`, { "credentials": "include" });
            if (res.status === 200) { setLoading(false); handleLogin(true) }
            if (res.status === 400 || res.status === 500) { setLoading(false); handleLogin(false) }
        };
        init()
    }, [handleLogin])

    if (isLoading) return <div>Loading...</div>
    if (!isLogin) return <Navigate to={NAV_PATH.login} />
    return children;
}