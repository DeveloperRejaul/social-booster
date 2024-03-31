import { Bounce, toast } from "react-toastify";
 type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';

export const showToast = (message:string, type?: TypeOptions ) =>  toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    type,
});