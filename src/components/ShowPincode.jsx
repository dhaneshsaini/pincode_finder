import { useContext, useEffect, useState } from "react"
import { Context } from "../Context"

export default function ShowPincode() {
    const [data, setData] = useState({})
    const { pb, pinID } = useContext(Context)

    useEffect(() => {
        (async () => {
            const record = await pb.collection('pincode').getOne(pinID)
            setData(record)
        })()
    }, [pinID])

    const { circlename, deliverystatus, districtname, divisionname, latitude, longitude, officename, officetype, pincode, regionname, related_headoffice, related_suboffice, statename, taluk, telephone
    } = data

    return (
        <div className={`flex transition-all justify-center p-5 ${pinID === null ? 'md:opacity-0 md:translate-y-full' : 'md:opacity-100 md:translate-y-0'}`}>
            <div className="p-5 w-full bg-white/60 rounded backdrop-blur-xl">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-blue-500 py-5 px-4 font-light text-3xl" colSpan={2}>{pincode || '000000'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 font-semibold">Office Name</td>
                            <td className="py-2 px-4">{officename || <LoadingSkeleton />}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 font-semibold">Office Type</td>
                            <td className="py-2 px-4">{officetype || <LoadingSkeleton />}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 font-semibold">Related Headoffice</td>
                            <td className="py-2 px-4">{related_headoffice || <LoadingSkeleton />}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 font-semibold">Related Suboffice</td>
                            <td className="py-2 px-4">{related_suboffice || <LoadingSkeleton />}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 font-semibold">Taluk</td>
                            <td className="py-2 px-4">{taluk || <LoadingSkeleton />}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 font-semibold">Region Name</td>
                            <td className="py-2 px-4">{regionname || <LoadingSkeleton />}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 font-semibold">Division Name</td>
                            <td className="py-2 px-4">{divisionname || <LoadingSkeleton />}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 font-semibold">Circle Name</td>
                            <td className="py-2 px-4">{circlename || <LoadingSkeleton />}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 font-semibold">District Name</td>
                            <td className="py-2 px-4">{districtname || <LoadingSkeleton />}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 font-semibold">State Name</td>
                            <td className="py-2 px-4">{statename || <LoadingSkeleton />}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 font-semibold">Delivery Status</td>
                            <td className="py-2 px-4">{deliverystatus || <LoadingSkeleton />}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 font-semibold">Telephone</td>
                            <td className="py-2 px-4">{telephone || <LoadingSkeleton />}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >
    )
}

function LoadingSkeleton() {
    return (
        <div className="animate-pulse -z-10 w-full">
            <div className="h-2 w-32 bg-gray-400 rounded"></div>
        </div>
    )
}