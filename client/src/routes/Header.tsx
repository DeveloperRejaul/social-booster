import { useLocation } from "react-router-dom"

interface IHeader {
    [key: string]: string
}


export default function Header() {
    const { pathname } = useLocation();
    const header: IHeader = {
        "/": "Facebook",
        "/gmail": "Gmail"
    }

    return (
        <div className="h-[5vh] bg-pink100">
            {header[pathname]}
        </div>
    )
}
