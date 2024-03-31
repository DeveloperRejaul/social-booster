import { useState } from "react"
const baseUrl = import.meta.env.VITE_BASE_URL

export const useFetch = () => {
  const [isSuccess, setIsSuccess] =  useState(false);
  const [isLoading, setLoading] =  useState(true);
  const [isError, setIsError] =  useState(false);
  const [error, setError] =  useState<unknown>("");
  const [data, setData] =  useState(null);


  const handleFetch = async (url:string="", method:"GET"|"DELETE"|"PUT"|"POST" = "GET", data?:object) => {
    try {
        switch (method) {
            case "GET": {
                setLoading(true);
                const res = await fetch(`${baseUrl}/api${url}`);
                const result = await res.json();
                setLoading(false);
                setIsSuccess(true)
                setData(result)
                break;
            }
        
            default:
                break;
        }
    } catch (error) {
        setError(error);
        setIsError(true)
        setIsSuccess(false)
    }


  }


  return {isLoading, isSuccess, isError, error, data, setData, handleFetch} 

}