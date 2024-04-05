import React from 'react';
import { Socket } from 'socket.io-client';
export interface IAppContext {
    children: React.ReactNode
}

export interface IContextValue {
    isLogin: boolean;
    handleLogin: (bol: boolean) => void
    socket: Socket
}