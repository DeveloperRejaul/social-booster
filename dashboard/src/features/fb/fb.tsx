import { useAppSelector } from "../../hooks/rtk";
import { useGetFacebookAccountsQuery } from "./api";

type IData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthday: string;
    gender: string;
}

enum ColumnSize {
    FirstName = 100,
    LastName = 101,
    Email = 200,
    BirthDay = 103,
    Password = 104,
    Gender = 105,
    Actions = 150,
}

export default function Facebook() {
    useGetFacebookAccountsQuery({});
    const accounts = useAppSelector(state => state.fb.accounts)

    const handleStart = (data: any) => {
        console.log(data);
    }

    const handleStop = (data: any) => {
        console.log(data);
    }

    return (
        <div className="flex flex-1 flex-col items-center">
            {/* table header */}
            <div className="bg-warmGray400 flex w-full justify-center">
                <div className="flex space-x-3 py-5 bg-warmGray400 px-4 ">
                    <p className="font-bold" style={{ width: ColumnSize.Email }}>Email</p>
                    <p className="text-center font-bold" style={{ width: ColumnSize.Password }}>Password</p>
                    <p className="text-center font-bold" style={{ width: ColumnSize.FirstName }}>First Name</p>
                    <p className="text-center font-bold" style={{ width: ColumnSize.LastName }}>Last Name</p>
                    <p className="text-center font-bold" style={{ width: ColumnSize.BirthDay }}>Birth Day</p>
                    <p className="text-center font-bold" style={{ width: ColumnSize.Gender }}>Gender</p>
                    <p className="text-center font-bold" style={{ width: ColumnSize.Actions }}>Actions</p>
                </div>
            </div>
            <div>
                {(accounts || []).map(e => (
                    <div key={Math.random()}>
                        <div className="space-x-3 px-4 py-2 font-bold text-xl"> Groupe No: {e.id}</div>
                        {(e.accounts || []).map((d: IData) => (
                            <div key={Math.random()} className="flex space-x-3 px-4 py-2">
                                <p style={{ width: ColumnSize.Email }}>{d.email}</p>
                                <p className="text-center" style={{ width: ColumnSize.Password }}>{d.password}</p>
                                <p className="text-center" style={{ width: ColumnSize.FirstName }}>{d.firstName}</p>
                                <p className="text-center" style={{ width: ColumnSize.LastName }}>{d.lastName}</p>
                                <p className="text-center" style={{ width: ColumnSize.BirthDay }}>{d.birthday}</p>
                                <p className="text-center" style={{ width: ColumnSize.Gender }}>{d.gender}</p>
                                <div className="flex justify-around items-center" style={{ width: ColumnSize.Actions }}>
                                    <button className="bg-green700 px-2 py-1 rounded-md" onClick={() => handleStart(e)}>Start</button>
                                    <button className="bg-warning700 px-2 py-1 rounded-md" onClick={() => handleStop(e)}>Stop</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}