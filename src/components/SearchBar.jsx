import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { Context } from "../Context";

export default function SearchBar({ onClick }) {
    const { toggleSearch, setToggleSearch } = useContext(Context)

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            setToggleSearch(false)
        }
    })

    return (
        <>
            {toggleSearch ?
                <div className="bg-gray-500/70 w-full min-h-screen fixed z-50">
                    <RxCross1 title="ese" onClick={() => setToggleSearch(false)} className="top-5 right-5 absolute cursor-pointer text-gray-800" />
                    <div className="absolute w-10/12 sm:w-3/5 md:w-1/2 left-1/2 -translate-x-1/2 top-24 bg-white flex items-center rounded-lg border-2 drop-shadow-lg">
                        <input className="px-4 py-2 flex-1 outline-none rounded-lg group" placeholder="Search..." type="text" />
                        <button className="px-4 py-2" onClick={onClick}><FaSearch className="fill-gray-700" /></button>
                    </div>
                </div> : ''}
        </>
    )
}