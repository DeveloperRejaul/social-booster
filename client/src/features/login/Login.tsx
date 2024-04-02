import { useForm } from "react-hook-form"
import { showToast } from "../../utils/utils"
import { useFetch } from "../../hooks/useFetch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NAV_PATH } from "../../constants/navPath";
import { useAppContext } from "../../hooks/useAppContext";




export default function Login() {
    const { register, handleSubmit } = useForm();
    const { handleFetch, isSuccess, isError } = useFetch();
    const navigate = useNavigate();
    const { handleLogin } = useAppContext()

    useEffect(() => {
        if (isSuccess) {
            showToast("You are successfully login", "success");
            handleLogin(true)
            navigate(NAV_PATH.home)
        }
        if (isError) {
            showToast("Something went wrong ", "error");
        }
    }, [isSuccess, isError, navigate, handleLogin])

    const onSubmit = (formData = {}) => {
        handleFetch("/user/login", "POST", formData)
    }

    return (
        <div className="h-screen flex flex-1 justify-center items-center">
            <form className="flex flex-col gap-y-2" onSubmit={handleSubmit(onSubmit)}>
                <input {...register("email")} className="border outline-none border-warmGray300 px-3 py-2 rounded-md" placeholder="Enter your email" />
                <input {...register("password")} className="border outline-none border-warmGray300 px-3 py-2 rounded-md" placeholder="Enter your password" />
                <button type="submit" className="bg-indigo400 rounded-md py-1">Login</button>
            </form>
        </div>
    )
}
