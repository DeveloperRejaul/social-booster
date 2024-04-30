import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const baseUrl = import.meta.env.VITE_BASE_URL;

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api`, credentials: "include" }),
    endpoints: () => ({}),
});