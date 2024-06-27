import { createContext, useState } from "react"
import PocketBase from 'pocketbase'

export const Context = createContext()

const pb = new PocketBase('https://golu.pockethost.io')

export default function MainContext({ children }) {
    const [pinID, setPinID] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [toggleSearch, setToggleSearch] = useState(false)
    // set single pincode data
    const [pincode, setPincode] = useState([])

    return (
        <Context.Provider value={{
            pb,
            pinID,
            setPinID,
            pageNum,
            setPageNum,
            pincode,
            setPincode,
            toggleSearch,
            setToggleSearch
        }}>
            {children}
        </Context.Provider>
    )
}