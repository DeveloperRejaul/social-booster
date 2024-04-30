import { useContext } from "react";
import { Context } from "../store/context/AppContext";

export const useAppContext = () => useContext(Context)