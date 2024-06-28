import { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { Context } from "../Context";

export default function SearchBar() {
    const { pb, toggleSearch, setToggleSearch } = useContext(Context)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchList, setSearchList] = useState([])

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            setToggleSearch(false)
        }
    })

    async function handleSearch() {
        const resultList = await pb.collection('pincode').getList(1, 10, {
            filter: `pincode = ${searchTerm}`,
            // filter: `pincode = ${searchTerm} || officename = ${searchTerm} || divisionname = ${searchTerm} || regionname = ${searchTerm} || circlename = ${searchTerm} || districtname = ${searchTerm} || taluk = ${searchTerm} || statename = ${searchTerm} || related_headoffice = ${searchTerm} || related_suboffice = ${searchTerm}`,
        })

        setSearchList(resultList)
    }

    return (
        <>
            {toggleSearch ?
                <div className="bg-gray-500/70 w-full min-h-screen fixed z-50 flex justify-center items-center flex-col">
                    <RxCross1 title="ese" onClick={() => setToggleSearch(false)} className="top-5 right-5 absolute cursor-pointer text-gray-800" />
                    <div className="absolute w-10/12 sm:w-3/5 md:w-1/2 left-1/2 -translate-x-1/2 top-24 bg-white flex items-center rounded-lg border-2 drop-shadow-lg">
                        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="px-4 py-2 flex-1 outline-none rounded-lg group" placeholder="Search... by pincode" type="text" />
                        <button className="px-4 py-2" onClick={handleSearch}><FaSearch className="fill-gray-700" /></button>
                    </div>
                    <div className="">
                        {searchList ? <SearchList data={searchList} /> : ''}
                    </div>
                </div>
                : ''}
        </>
    )
}

function SearchList({ data }) {
    const { setPinID, setToggleSearch } = useContext(Context)

    function handleSelectSearchItem(data) {
        setPinID(data.id)
        setToggleSearch(false)
    }

    return (
        <ul className="grid gap-1 w-full">
            {data.items?.map((item, i) => (
                <li className="bg-white rounded flex justify-between gap-10 py-1 px-2" key={i} onClick={() => handleSelectSearchItem(item)}>
                    <span className="cursor-pointer">{item.officename}</span>
                    <span>{item.pincode}</span>
                </li>
            ))}
        </ul>
    )
}