import { useState } from "react"
const baseUrl = import.meta.env.VITE_BASE_URL

export const useFetch = <T>() => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>("");
  const [data, setData] = useState<T>(null as T);


  const handleFetch = async <D>(url: string = "", method: "GET" | "DELETE" | "PUT" | "POST" = "GET", data?: D) => {

    try {
      switch (method) {
        case "GET": {
          setLoading(true);
          const res = await fetch(`${baseUrl}/api${url}`, { "credentials": "include" });
          const result = await res.json();
          setLoading(false);
          setIsError(false)
          setIsSuccess(true)
          setData(result)
          break;
        }

        case "POST": {
          setLoading(true);
          const res = await fetch(`${baseUrl}/api${url}`, {
            body: JSON.stringify(data),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            "credentials": "include",
            method,
          });
          const result = await res.json();
          setLoading(false);
          setIsSuccess(true)
          setIsError(false)
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
      setLoading(false)
    }


  }


  return { isLoading, isSuccess, isError, error, data, handleFetch }
}