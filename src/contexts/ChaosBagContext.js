import React, { useContext, useEffect, useMemo, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { useAxios } from "../hooks/useAxios"
import { toCamelCase } from "../utils/general"

const ChaosBagContext = React.createContext()

export const useChaosBagContext = () => {
    return useContext(ChaosBagContext)
}

export const ChaosBagProvider = ({ children }) => {
    const [bag, setBag] = useState({})

    const stats = useMemo(() => {
        return { a: 1 }
    }, [bag])

    const addToken = (token) => {

    }

    const removeToken = (token) => {

    }

    return (
        <ChaosBagContext.Provider
            value={{
                bag,
                setBag,
                addToken,
                removeToken,
                stats
            }}
        >
            {children}
        </ChaosBagContext.Provider>
    )
}