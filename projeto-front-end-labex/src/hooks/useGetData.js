import { useEffect, useState } from 'react'
import axios from 'axios'

export const useGetData = (url, headers) => {
    const [data, setData] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const getData = (url, headers) => {
        setIsLoading(true)
        axios.get(url, headers)
            .then((res) => {
                setData(res.data)
                setIsLoading(false)
            })
            .catch((err) => {
                setIsLoading(false)
                setError(err.response)
            })
    }

    useEffect(() => {
        getData(url, headers)
    }, [url])

    return [data, isLoading, error, getData]
}