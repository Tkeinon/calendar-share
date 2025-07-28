import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'; 


const METHODS = ['post', 'put', 'patch', 'delete'];


function getCookie(name: string): string | null {
    const cookieValue = document.cookie.split('; ').find((row) => row.startsWith(name + '='));
    
    return cookieValue ? decodeURIComponent(cookieValue.split('=')[1]) : null;
}


const axiosInstance: AxiosInstance = axios.create({
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
});


axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const csrftoken = getCookie('csrftoken');

    if (
        csrftoken
        && config.method
        && METHODS.includes(config.method.toLocaleLowerCase())
    ) {
        config.headers['X-CSRFToken'] = csrftoken;
    }

    return config;

    }, 
    (error) => Promise.reject(error)
);


export default axiosInstance;