import axios from 'axios';

const BASE_URL = "http://localhost:5000"

export const $api = axios.create({
    withCredentials: true,
    baseURL:BASE_URL
})
$api.interceptors.request.use((config)=>{
    config.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
return config;
})
$api.interceptors.response.use((config)=>{    
   return config;
},(error)=>{

    const originalRequest = error.request;
    if (error.response.status ===401 && error.config && !error.config.isRetry) {
        axios.post<AuthResponse>( "http://localhost:5000/api/refresh",
        {},{withCredentials:true}    
        ).then((res)=>{
            localStorage.setItem("accessToken",res.data.accessToken)
            return $api.request(originalRequest);
        }).catch((err)=>{
            console.log(err);
        })
    }
    throw error
})