import { useForm } from "react-hook-form"
import { showToast } from "../../utils/utils"
import { useFetch } from "../../hooks/useFetch";




export default function Login() {
    const { register, handleSubmit } = useForm();
    const { handleFetch, data } = useFetch()

    const onSubmit = (data) => {
        handleFetch("/facebook/account")
        showToast("You are successfully login", "success")
    }

    console.log(data);

    return (
        <div className="h-screen flex flex-1 justify-center items-center">
            <form className="flex flex-col gap-y-2" onSubmit={handleSubmit(onSubmit)}>
                <input {...register("email")} className="border outline-none border-warmGray300 px-3 py-2 rounded-md" placeholder="Enter your email" />
                <input {...register("password")} className="border outline-none border-warmGray300 px-3 py-2 rounded-md" placeholder="Enter your password" />
                <button type="submit" className="bg-blue500 rounded-md py-1">Login</button>
            </form>
        </div>
    )
}
