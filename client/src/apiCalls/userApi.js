import axios from 'axios'


export const userInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
    timeout:60000,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const register=(formData)=>userInstance.post('/register', formData);


