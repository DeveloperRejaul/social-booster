import { useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch";

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

export default function Modal({ showModal, onClose, handleModal }: IModal) {

    const { handleSubmit, register, watch } = useForm()
    const { handleFetch } = useFetch()
    const taskType = watch("task-type");


    const onSubmit = (data: any) => {
        const birthday = data.birthday.split("-");
        const formattedBirthday = `${birthday[2]}-${birthday[1]}-${birthday[0]}`

        handleFetch<IFromData>("/gmail", "POST", {
            birthday: formattedBirthday,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            password: data.password
        });
        handleModal(false);
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

                                    <select {...register("task-type")}>
                                        <option value="add"> Add account</option>
                                        <option value="like"> Like</option>
                                        <option value="follow"> Follow </option>
                                        <option value="watch"> Video Watch </option>
                                        <option value="comments"> Comments </option>
                                    </select>
                                </div>
                                {/*body*/}
                                {taskType === "add" && <div>Add account</div>}
                                {taskType === "like" && <div>Like</div>}
                                {taskType === "follow" && <div>follow</div>}
                                {taskType === "watch" && <div>watch</div>}
                                {taskType === "comments" && <div>Comments</div>}

                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b space-x-3">
                                    <button
                                        className="border border-indigo400 px-5 py-2 rounded-md hover:bg-indigo400"
                                        type="button"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-indigo400  px-5 py-2 rounded-md border border-white hover:bg-white  hover:border-indigo400"
                                        type="submit"
                                    >
                                        Save
                                    </button>
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