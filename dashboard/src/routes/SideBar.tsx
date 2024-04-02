import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { useFetch } from '../hooks/useFetch';
import Logo from '../assets/logo.png'

export default function SideBar() {

    const { handleLogin } = useAppContext();
    const { handleFetch } = useFetch();
    const navigate = useNavigate()

    const handleLogout = async () => {
        await handleFetch('/user/logout')
        handleLogin(false);
        navigate("/login")
    }

    return (
        <div className="bg-pink100 h-[100vh] px-2 py-4 flex-col flex justify-between" style={{ width: 300 }}>
            <div>
                <div className='h-20'>
                    <img src={Logo} height={20} width={"90%"} alt="Logo" />
                </div>
                <div className='space-y-3'>
                    <NavLink
                        to={"/"}
                        end
                        className={({ isActive }) => `flex px-2 py-3 rounded-lg font-bold text-lg text-warmGray800 ${isActive ? "bg-pink300" : "bg-pink100"}`}
                    >
                        Facebook
                    </NavLink>

                    <NavLink
                        to={"/gmail"}
                        end
                        className={({ isActive }) => `flex px-2 py-3 rounded-lg font-bold text-lg text-warmGray800 ${isActive ? "bg-pink300" : "bg-pink100"}`}
                    >
                        Gmail
                    </NavLink>
                    <NavLink
                        to={"/terminal"}
                        end
                        className={({ isActive }) => `flex px-2 py-3 rounded-lg font-bold text-lg text-warmGray800 ${isActive ? "bg-pink300" : "bg-pink100"}`}
                    >
                        Terminal
                    </NavLink>
                </div>
            </div>
            <div onClick={handleLogout} className='cursor-pointer font-bold text-warmGray100 text-xl text-center mx-auto px-2 py-3 bg-fuchsia500 rounded-lg w-[80%]'>
                Logout
            </div>
        </div>
    )
}
