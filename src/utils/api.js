import axios from 'axios'

export const Api = axios.create({
    baseURL: process.env.REACT_APP_API
})

Api.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        req.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    return req;
});
