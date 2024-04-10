import { useEffect } from "react"
import { useFetch } from "../../hooks/useFetch"

type DateString = `${string}-${string}-${string}`;
interface IGmail {
    firstName: string,
    lastName: string,
    email: string,
    birthday: DateString,
    password: string,
    gender: string,
}

enum ColumnSize {
    FirstName = 100,
    LastName = 101,
    Email = 200,
    BirthDay = 103,
    Password = 104,
    gender = 105,
}

interface IGender {
    [key: string]: string
}

function Gmail() {
    const { handleFetch, data } = useFetch<IGmail[]>()
    useEffect(() => {
        handleFetch("/gmail")
    }, [])

    const gender: IGender = {
        "1": "Male",
        "2": "Female",
        "3": "Custom",
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
                    <p className="text-center font-bold" style={{ width: ColumnSize.gender }}>Gender</p>
                </div>
            </div>
            <div>
                {(data || []).map(e => (
                    <div className="flex space-x-3 px-4 py-2">
                        <p style={{ width: ColumnSize.Email }}>{e.email}</p>
                        <p className="text-center" style={{ width: ColumnSize.Password }}>{e.password}</p>
                        <p className="text-center" style={{ width: ColumnSize.FirstName }}>{e.firstName}</p>
                        <p className="text-center" style={{ width: ColumnSize.LastName }}>{e.lastName}</p>
                        <p className="text-center" style={{ width: ColumnSize.BirthDay }}>{e.birthday}</p>
                        <p className="text-center" style={{ width: ColumnSize.gender }}>{gender[e.gender]}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gmail