import { useEffect, useState } from "react"
import { useAppContext } from "../../hooks/useAppContext"
import { action } from "../../constants/acrion";

export default function Terminal() {
    const { socket } = useAppContext();
    const [successMessage, setSuccessMessage] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    const [warningMessage, setWarningMessage] = useState<string[]>([]);
    const [input, setInput] = useState([])

    useEffect(() => {
        socket.on(action.SUCCESS, (data: string) => { setSuccessMessage(pre => [...pre, data]) })
        socket.on(action.ERROR, (data: string) => { setErrorMessage(pre => [...pre, data]) })
        socket.on(action.WARNING, (data: string) => { setWarningMessage(pre => [...pre, data]) })

        return () => {
            socket.off(action.SUCCESS);
            socket.off(action.ERROR);
            socket.off(action.WARNING);
        }
    }, [])


    return (
        <div className="bg-warmGray800 h-[95%]">
            <div className="flex space-x-2 px-3 py-3">
                <div className="h-4 w-4 rounded-full bg-green500" />
                <div className="h-4 w-4 rounded-full bg-blue500" />
                <div className="h-4 w-4 rounded-full bg-rose500" />
            </div>

            <div className="px-5">
                {successMessage.map(s => (<p className="text-success500 font-medium text-lg">{s}</p>))}
                {errorMessage.map(e => <p className="text-error500 font-medium text-lg">{e}</p>)}
                {warningMessage.map(w => <p className="text-warning500 font-medium text-lg">{w}</p>)}
            </div>

        </div>
    )
}
