import axios from 'axios'

const Api = axios.create({
    baseURL: process.env.REACT_APP_API
})

Api.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        req.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    return req;
});

export async function registerUser(credentials) {
    try {
        const { data } = await Api.post(`/register`, credentials, { withCredentials: true })
        return data
    } catch (error) {
        return { error: 'Cannot find the User' }
    }
};

export async function userLogin(credentials) {
    try {
        const { data } = await Api.post(`/login`, credentials, { withCredentials: true })
        return data
    } catch (error) {
        return { error: 'login failed' }
    }
};

export async function userProfile(credentials) {
    try {
        const { data } = await Api.get(`/profile`, credentials, { withCredentials: true })
        return data
    } catch (error) {
        console.log(error);
        return { error: 'Data Fetch error' }
    }
};

export async function Auth() {
    try {
        const { data } = await Api.post(`/authenticate`, { withCredentials: true })

        return data
    } catch (error) {
        console.log(error);
        return { error: 'Data Fetch error' }
    }
};


export async function saveProfile(credentials) {
    try {
        const { data } = await Api.put(`/editeProfile`, credentials, { withCredentials: true })
        return data
    } catch (error) {
        console.log(error);
        return { error: 'Data Fetch error' }
    }
};



export async function addTask(credentials) {
    try {
        const { data } = await Api.post(`/addTask`, credentials, { withCredentials: true })
        return data
    } catch (error) {
        console.log(error);
        return { error: 'Data Fetch error' }
    }
};


export async function getTask() {
    try {
        const { data } = await Api.get(`/getTask`, { withCredentials: true })
        return data
    } catch (error) {
        console.log(error);
        return { error: 'Data Fetch error' }
    }
};

export async function addSubTask(credentials) {
    try {
        const { data } = await Api.put(`/addSubTask`,credentials, { withCredentials: true })
        return data
    } catch (error) {
        console.log(error);
        return { error: 'Data Fetch error' }
    }
};

export async function updatedCheckboxe(credentials) {
    try {
        const { data } = await Api.put(`/updatedCheckboxes`,credentials, { withCredentials: true })
        return data
    } catch (error) {
        console.log(error);
        return { error: 'Data Fetch error' }
    }
};

export async function removeTask(id) {
    try {
        const { data } = await Api.delete(`/removeTask/${id}`, { withCredentials: true })
        return data
    } catch (error) {
        console.log(error);
        return { error: 'Data Fetch error' }
    }
};
