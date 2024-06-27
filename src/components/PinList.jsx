import { useContext } from "react";
import Paginate from "./Paginate";
import { Context } from "../Context";

export default function PinList() {
    const { setPinID, setPageNum, pincode } = useContext(Context)

    return (
        <section className="mt-5 bg-white/60 backdrop-blur-xl p-5">
            {pincode.items?.map((item, i) => (
                <div onClick={() => setPinID(item.id)} key={i} className="flex justify-between items-center cursor-pointer py-1">
                    <span className="font-medium hover:text-blue-500">{item.officename}</span>
                    <span>{item.pincode}</span>
                </div>
            ))}

            <Paginate pin={pincode} onPageChange={e => setPageNum(e.selected + 1)} />
        </section>
    )
}