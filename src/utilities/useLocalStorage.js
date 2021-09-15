import { useEffect, useState } from "react"

//Returns parsed localstorage data if it exists otherwiste sets an initial value.
//Can manually set new LS with the setValue function.
export const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const jsonData = localStorage.getItem(key)
        if (jsonData != null) return JSON.parse(jsonData)
        return initialValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}