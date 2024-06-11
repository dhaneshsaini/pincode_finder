import { useEffect, useRef, useState } from "react"
import PocketBase from 'pocketbase'
import { stateAndUT } from "./components/StatesAndUT"
import ReactPaginate from 'react-paginate'
import { GrFormNext, GrFormPrevious, GrFormDown, GrFormUp } from "react-icons/gr"

const pb = new PocketBase('https://golu.pockethost.io')

export default function App() {
  const [isStateOpen, setIsStateOpen] = useState(false)
  const [isDistrictOpen, setIsDistrictsOpen] = useState(false)
  const [state, setState] = useState(stateAndUT[0].name)
  const [districts, setDistricts] = useState(stateAndUT[0].districts)
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0])
  const [pincode, setPincode] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const dropdownStateRef = useRef(null)
  const dropdownDistrictRef = useRef(null)

  useEffect(() => {
    (async () => {
      const resultList = await pb.collection('pincode').getList(pageNum, 20, {
        filter: pb.filter("statename ~ {:statename} && districtname ~ {:district}", { statename: state.toUpperCase(), district: selectedDistrict }),
      })

      setPincode(resultList)
    })()
  }, [state, selectedDistrict, pageNum])


  useEffect(() => {
    function handleClickOutsideState(e) {
      if (dropdownStateRef.current && !dropdownStateRef.current.contains(e.target)) {
        setIsStateOpen(false)
      }
    }
    function handleClickOutsideDistrict(e) {
      if (dropdownDistrictRef.current && !dropdownDistrictRef.current.contains(e.target)) {
        setIsDistrictsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutsideState)
    document.addEventListener('mousedown', handleClickOutsideDistrict)

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideState)
      document.removeEventListener('mousedown', handleClickOutsideDistrict)
    }
  }, [])

  const handleStateSelection = (selectedState) => {
    const selected = stateAndUT.find(item => item.name === selectedState)
    setState(selected.name)
    setDistricts(selected.districts)
    setSelectedDistrict(selected.districts[0])
    setIsStateOpen(false)
    setIsDistrictsOpen(false)
  }

  const handleDistrictSelection = (selectedDistrict) => {
    setSelectedDistrict(selectedDistrict)
    setIsDistrictsOpen(false)
  }

  function handleStateSelectionToggle() {
    setIsStateOpen(!isStateOpen)
    setIsDistrictsOpen(false)
  }

  function handleDistrictSelectionToggle() {
    setIsDistrictsOpen(!isDistrictOpen)
    setIsStateOpen(false)
  }

  return (
    <section className="max-w-md min-h-screen mx-auto bg-slate-100">
      <div className="p-5">
        <div className="py-5">
          <h1 className="font-medium text-2xl">Pincode Finder</h1>
        </div>
        <div ref={dropdownStateRef} className="relative">
          <div onClick={handleStateSelectionToggle} className="cursor-pointer flex items-center justify-between bg-white py-3 px-5 rounded-lg">
            <span className="font-medium">{state}</span>
            {isStateOpen ? <GrFormUp /> : <GrFormDown />}
          </div>
          {isStateOpen && (
            <div className="absolute max-h-72 overflow-y-auto bg-white w-full border shadow-md mt-1 z-10">
              {stateAndUT
                .filter(option => option.name !== state)
                .map((item, i) => (
                  <div onClick={() => handleStateSelection(item.name)} key={i} className="cursor-pointer py-2 px-4 hover:bg-gray-200">
                    {item.name}
                  </div>
                ))}
            </div>
          )}
        </div>

        <div ref={dropdownDistrictRef} className="relative mt-4">
          <div onClick={handleDistrictSelectionToggle} className="cursor-pointer flex items-center justify-between bg-white py-3 px-5 rounded-lg">
            <span className="font-medium">{selectedDistrict}</span>
            {isDistrictOpen ? <GrFormUp /> : <GrFormDown />}
          </div>
          {isDistrictOpen && (
            <div className="absolute max-h-72 overflow-y-auto bg-white w-full border shadow-md mt-1 z-10">
              {districts
                .filter(option => option !== selectedDistrict)
                .map((item, i) => (
                  <div onClick={() => handleDistrictSelection(item)} key={i} className="cursor-pointer py-2 px-4 hover:bg-gray-200">
                    {item}
                  </div>
                ))}
            </div>
          )}
        </div>

        <section className="mt-5">
          {pincode.items?.map((item, i) => (
            <div key={i} className="flex justify-between items-center cursor-pointer">
              <span className="font-medium hover:text-blue-500">{item.officename}</span>
              <span>{item.pincode}</span>
            </div>
          ))}

          <ReactPaginate
            className="flex justify-center gap-1 mt-5"
            activeClassName="bg-blue-400"
            activeLinkClassName="text-red-500"
            disabledClassName="hidden"
            disabledLinkClassName="hidden"
            nextLinkClassName="text-gray-600 hover:text-blue-500"
            nextClassName="py-1 px-2 rounded-sm bg-gray-200 flex items-center  hover:bg-blue-100"
            previousLinkClassName="text-gray-600 hover:text-blue-500"
            previousClassName="py-1 px-2 rounded-sm bg-gray-200 flex items-center  hover:bg-blue-100"
            pageLinkClassName="text-gray-600 hover:text-blue-500"
            pageClassName="py-1 px-2 rounded-sm bg-gray-200 hover:bg-blue-100"
            breakLabel="..."
            breakClassName="text-gray-600"
            breakLinkClassName="text-blue-600"
            nextLabel=<GrFormNext />
            onPageChange={e => setPageNum(e.selected + 1)}
            pageRangeDisplayed={3}
            pageCount={pincode.totalPages}
            previousLabel=<GrFormPrevious />
            renderOnZeroPageCount={null}
          />
        </section>

      </div>
    </section>
  )
}
