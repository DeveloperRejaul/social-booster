import { useLocation } from "react-router-dom"
import Modal from "../components/modal/Modal";
import { useState } from "react";

interface IHeader {
    [key: string]: string
}


export default function Header() {
    const { pathname } = useLocation();
    const [showModal, setShowModal] = useState(false);
    const header: IHeader = {
        "/": "Facebook",
        "/gmail": "Gmail",
        "/terminal": "Terminal",
    }


    const handleTask = () => {
        setShowModal(true)
    }


    return (
        <div className="h-[5vh] bg-pink100 flex items-center justify-between px-5">
            <p className="text-xl font-bold">{header[pathname]}</p>
            <div className="flex items-center space-x-10">
                {["/terminal"].includes(pathname) || <p onClick={handleTask} className="bg-indigo400 px-7 py-1 rounded-md cursor-pointer font-bold hover:bg-indigo500">Task</p>}
                <div className="h-10 w-10 rounded-full bg-warmGray400" />
            </div>
            <Modal
                showModal={showModal}
                onClose={() => setShowModal(false)}
                onSave={() => { }}
            />
        </div>
    )
}
