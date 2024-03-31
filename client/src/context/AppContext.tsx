import { createContext, useState } from "react";
import { type IAppContext, IContextValue } from "../types/context";

export const Context = createContext({} as IContextValue);

export const AppContext = ({ children }: IAppContext) => {
    const [isLogin, setLogin] = useState<boolean>(false);

    const handleLogin = (bol: boolean) => setLogin(bol);



    return <Context.Provider
        value={{ isLogin, handleLogin }}
    >
        {children}
    </Context.Provider>
}