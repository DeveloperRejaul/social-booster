import { useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { NAV_PATH } from "../../constants/navPath";

interface IModal {
    showModal: boolean;
    onClose: () => void;
    handleModal: (bool: boolean) => void
}

interface IFromData {
    firstName: string;
    lastName: string;
    email: string;
    birthday: string;
    gender: string;
    password: string;
}
interface IGender {
    [key: string]: string
}
export default function Modal({ showModal, onClose, handleModal }: IModal) {

    const { handleSubmit, register, watch } = useForm()
    const { handleFetch, isLoading } = useFetch()
    const navigate = useNavigate()
    const taskType = watch("task-type") || 'add';

    const gender: IGender = {
        "1": "male",
        "2": "female",
        "3": "custom",
    }

    const onSubmit = (data: any) => {

        const birthday = data.birthday.split("-");
        const formattedBirthday = `${birthday[2]}-${birthday[1]}-${birthday[0]}`

        handleFetch<IFromData>("/facebook/account", "POST", {
            birthday: formattedBirthday,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            gender: gender[data.gender],
            password: data.password
        });
        handleModal(false);
        navigate(NAV_PATH.terminal)
    }

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto min-w-96 max-w-3xl">
                            {/*content*/}
                            <form className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none" onSubmit={handleSubmit(onSubmit)}>
                                {/*header*/}
                                <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t w-full">
                                    <h3 className="text-2xl font-semibold">
                                        Facebook
                                    </h3>

                                    <select {...register("task-type")} defaultValue={"add"}>
                                        <option value="add"> Add account</option>
                                        <option value="like"> Like</option>
                                        <option value="follow"> Follow </option>
                                        <option value="watch"> Video Watch </option>
                                        <option value="comments"> Comments </option>
                                    </select>
                                </div>
                                {/*body*/}
                                {taskType === "add" && <div className="flex flex-col p-3 space-y-3 px-8" >
                                    <input {...register("firstName")} type="text" className="border border-warmGray300 px-2 rounded-md py-2 " placeholder="First name" />
                                    <input {...register("lastName")} type="text" className="border border-warmGray300 px-2 rounded-md py-2 " placeholder="Last name" />
                                    <input {...register("email")} type="email" className="border border-warmGray300 px-2 rounded-md py-2 " placeholder="Enter Email" />
                                    <input {...register("password")} type="text" className="border border-warmGray300 px-2 rounded-md py-2 " placeholder="Enter password" />
                                    <input {...register("birthday")} type="date" name="birthday" className="border border-warmGray300 px-2 rounded-md py-2 " placeholder="Select birthday" />
                                    <div className="flex space-x-5">
                                        <div className="flex justify-center items-center space-x-2">
                                            <label className="text-warmGray700 font-normal text-lg cursor-pointer" htmlFor="male">Male</label>
                                            <input {...register("gender")} type="radio" value={"1"} id="male" className="scale-110 cursor-pointer" />
                                        </div>

                                        <div className="flex justify-center items-center space-x-2">
                                            <label className="text-warmGray700 font-normal text-lg cursor-pointer" htmlFor="female">Female</label>
                                            <input  {...register("gender")} type="radio" value={"2"} id="female" className="scale-110 cursor-pointer" />
                                        </div>

                                        <div className="flex justify-center items-center space-x-2">
                                            <label className="text-warmGray700 font-normal text-lg cursor-pointer" htmlFor="custom">Custom</label>
                                            <input  {...register("gender")} type="radio" value={"3"} id="custom" className="scale-110 cursor-pointer" />
                                        </div>
                                    </div>
                                </div>}

                                {taskType === "like" && <div className="flex flex-col p-3 space-y-3 px-8" >
                                    <input {...register("like")} type="text" className="border border-warmGray300 px-2 rounded-md py-2 " placeholder="Past link" />
                                </div>}
                                {taskType === "follow" && <div className="flex flex-col p-3 space-y-3 px-8" >
                                    <input {...register("follow")} type="text" className="border border-warmGray300 px-2 rounded-md py-2 " placeholder="Past link" />
                                </div>}
                                {taskType === "watch" && <div className="flex flex-col p-3 space-y-3 px-8" >
                                    <input {...register("watch")} type="text" className="border border-warmGray300 px-2 rounded-md py-2 " placeholder="Past link" />
                                </div>}
                                {taskType === "comments" && <div className="flex flex-col p-3 space-y-3 px-8" >
                                    <input {...register("comments")} type="text" className="border border-warmGray300 px-2 rounded-md py-2 " placeholder="Past link" />
                                </div>}

                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b space-x-3">
                                    <button
                                        className="border border-indigo400 px-5 py-2 rounded-md hover:bg-indigo400"
                                        type="button"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                    <Button className="px-3 py-2 !h-10" isLoading={isLoading} text="Save" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null
            }
        </>
    );
}