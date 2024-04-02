import  React  from 'react';
export interface IAppContext {
    children: React.ReactNode
}

export interface IContextValue {
    isLogin: boolean;
    handleLogin: (bol: boolean) => void
}