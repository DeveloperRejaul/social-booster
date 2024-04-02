import { Outlet } from 'react-router-dom';
import SideBar from "./SideBar";
import Header from './Header';

export default function Main() {
    return (
        <div className='flex flex-1'>
            <SideBar />
            <div className='w-full'>
                <Header />
                <Outlet />
            </div>
        </div>
    )
}