import authStore from "@/zustand/authStore";
import axios from "axios";
import { error } from "console";

const instance = axios.create({
    baseURL: 'http://localhost:8000/api'
})

instance.interceptors.request.use(
    async(req) => {
        const token = authStore.getState().token

        if(token) {
            req.headers['Authorization'] = `Bearer ${token}`
        }

        return req
    },
    (error) => {
        console.log(error)
    }
)

instance.interceptors.response.use(
    async(res) => {
        return res
    },
    error => {
        
        if(error?.response?.data?.message === 'jwt expired') {
            const setAutoLogOut = authStore((state) => state.setAutoLogOut)
            setAutoLogOut()
        
            window.location.href = '/'
        }
        
        return Promise.reject(error)
    }

)

export default instance

