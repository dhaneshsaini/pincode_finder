import { useContext } from "react"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"
import ReactPaginate from "react-paginate"
import { Context } from "../Context"

export default function Paginate({ onPageChange }) {
    const { pincode } = useContext(Context)

    return (
        <ReactPaginate
            className="flex justify-center gap-1 mt-5"
            activeClassName="bg-blue-400"
            activeLinkClassName="text-blue-500"
            disabledClassName="hidden"
            disabledLinkClassName="hidden"
            nextLinkClassName="text-gray-600 hover:text-blue-500"
            nextClassName="py-1 px-2 rounded-sm bg-white flex items-center  hover:bg-blue-100"
            previousLinkClassName="text-gray-600 hover:text-blue-500"
            previousClassName="py-1 px-2 rounded-sm bg-white flex items-center  hover:bg-blue-100"
            pageLinkClassName="text-gray-600 hover:text-blue-500"
            pageClassName="py-1 px-2 rounded-sm bg-white hover:bg-blue-100"
            breakLabel="..."
            breakClassName="text-gray-600"
            breakLinkClassName="text-blue-600"
            nextLabel=<GrFormNext />
            pageRangeDisplayed={3}
            onPageChange={onPageChange}
            pageCount={pincode.totalPages}
            previousLabel=<GrFormPrevious />
            renderOnZeroPageCount={null}
        />
    )
}