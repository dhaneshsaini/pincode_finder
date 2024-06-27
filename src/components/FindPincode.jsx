import React, { useContext, useEffect, useState } from "react"
import { Context } from "../Context"
import { stateAndUT } from "./StatesAndUT"
import { FaSearch } from "react-icons/fa"
import PinList from "./PinList"
import Dropdown from "./Dropdown"

const PincodeFinder = () => {
    const { pb, pageNum, setPincode, setToggleSearch } = useContext(Context)
    const [state, setState] = useState(stateAndUT[0].name)
    const [districts, setDistricts] = useState(stateAndUT[0].districts)
    const [selectedDistrict, setSelectedDistrict] = useState(districts[0])

    useEffect(() => {
        const fetchData = async () => {
            const resultList = await pb.collection('pincode').getList(pageNum, 20, {
                filter: pb.filter("statename ~ {:statename} && districtname ~ {:district}", { statename: state.toUpperCase(), district: selectedDistrict }),
            })
            setPincode(resultList)
        }

        fetchData()
    }, [state, selectedDistrict, pageNum, pb, setPincode])

    const handleStateChange = (selectedState) => {
        const selected = stateAndUT.find(item => item.name === selectedState)
        setState(selected.name)
        setDistricts(selected.districts)
        setSelectedDistrict(selected.districts[0])
    }

    const handleDistrictChange = (selectedDistrict) => {
        setSelectedDistrict(selectedDistrict)
    }

    return (
        <div className="md:overflow-y-scroll md:max-h-screen no-scrollbar">
            <div className="p-5">
                <div className="flex justify-between items-center mb-5">
                    <span className="text-2xl font-semibold uppercase text-gray-900/50">Pincode Finder</span>
                    <div className="p-2 rounded bg-white/60 backdrop-blur-xl cursor-pointer">
                        <FaSearch fontSize={20} onClick={() => setToggleSearch(true)} className="fill-gray-600" />
                    </div>
                </div>

                <Dropdown
                    label="State"
                    className="mb-5"
                    options={stateAndUT.map(item => item.name)}
                    selected={state}
                    onSelectedChange={handleStateChange}
                />

                <Dropdown
                    label="District"
                    className="mb-5"
                    options={districts}
                    selected={selectedDistrict}
                    onSelectedChange={handleDistrictChange}
                />
                
                <PinList />
            </div>
        </div>
    )
}

export default PincodeFinder
