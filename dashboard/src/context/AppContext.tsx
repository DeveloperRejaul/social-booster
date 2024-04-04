import { createContext, useEffect, useState } from "react";
import { type IAppContext, IContextValue } from "../types/context";
import { io } from "socket.io-client";

export const Context = createContext({} as IContextValue);

const socket = io("http://localhost:3000")
export const AppContext = ({ children }: IAppContext) => {
    const [isLogin, setLogin] = useState<boolean>(false);
    const handleLogin = (bol: boolean) => setLogin(bol);


    useEffect(() => {
        socket.on("bot", (data) => {
            console.log(data);
        })
    }, [])

    return <Context.Provider
        value={{ isLogin, handleLogin }}
    >
        {children}
    </Context.Provider>
}