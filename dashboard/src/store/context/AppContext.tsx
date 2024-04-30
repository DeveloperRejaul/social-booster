import { createContext, useEffect, useState } from "react";
import { type IAppContext, IContextValue } from "../../types/context";
import { io, Socket } from "socket.io-client";

export const Context = createContext({} as IContextValue);

const socket: Socket = io("http://localhost:3000")
export const AppContext = ({ children }: IAppContext) => {
    const [isLogin, setLogin] = useState<boolean>(false);
    const handleLogin = (bol: boolean) => setLogin(bol);



    useEffect(() => {
        socket.on("verification", (data) => {
            console.log(data);

            setTimeout(() => {
                socket.emit('verification', "123456789");
            }, 60000);
        })
    }, [])

    return <Context.Provider
        value={{ isLogin, handleLogin, socket }}
    >
        {children}
    </Context.Provider>
}