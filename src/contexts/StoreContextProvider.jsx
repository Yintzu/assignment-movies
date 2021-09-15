import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocalStorage } from '../utilities/useLocalStorage';

const StoreContext = createContext();

//Small hook to save an import in consuming components.
export const useStore = () => {
    return useContext(StoreContext)
}


const StoreContextProvider = (props) => {
    const [localStorageData, setLocalStorageData] = useLocalStorage('movieHistory', [])
    const [movieHistory, setMovieHistory] = useState(localStorageData)

    useEffect(() => {
        setLocalStorageData(movieHistory)
    },[movieHistory])

    const addToHistory = (movie) => {
        //Filter out dupes, add new one to start of array and then return an array of max 10 length.
        setMovieHistory(prev => {
            prev = prev.filter(item => item.id != movie.id)
            prev.unshift(movie)
            return prev.slice(0, 10)
        })
    }

    const values = {
        movieHistory,
        addToHistory,
        localStorageData,
        setLocalStorageData
    }

    return (
        <StoreContext.Provider value={values}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
