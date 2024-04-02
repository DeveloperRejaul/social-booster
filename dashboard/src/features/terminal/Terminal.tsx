export default function Terminal() {
    return (
        <div className="bg-warmGray800 h-[95%]">
            <div className="flex space-x-2 px-3 py-3">
                <div className="h-4 w-4 rounded-full bg-green500" />
                <div className="h-4 w-4 rounded-full bg-blue500" />
                <div className="h-4 w-4 rounded-full bg-rose500" />
            </div>

            <div className="px-5">
                <p className="text-success500 font-medium text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, sint.</p>
                <p className="text-error500 font-medium text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, sint.</p>
                <p className="text-warning500 font-medium text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, sint.</p>
            </div>

        </div>
    )
}
