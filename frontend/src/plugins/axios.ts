import axiosLib from 'axios'
import Cookies from 'js-cookie'

const axios = axiosLib.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
})

axios.defaults.withCredentials = true

axios.interceptors.request.use(async (config) => {
    if ((config.method as string).toLowerCase() !== 'get') {
        await axios.get('/csrf-cookie').then()
        config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
    }

    return config
})

export default axios