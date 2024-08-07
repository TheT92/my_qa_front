import axios from 'axios';
import router from '../router'
import { EXCLUDE_ROUTERS, STATUS_CODES } from '@/constants';

const intercept = () => {
    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
        const { url } = { ...config };
        // 判断是否存在token,如果存在将每个页面header添加token
        if (!EXCLUDE_ROUTERS.includes(url)) {
            if (localStorage.getItem("token")) {
                config.headers.token = localStorage.getItem("token");
            } else {
                router.push('/login')
            }
        }
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
        return [null, response.data];
        // return response;
    }, function (error) {
        const { response: { status = 0 } } = { response: {}, ...error };
        switch (Number(status)) {
            case STATUS_CODES.UNAUTHORIZED:
                localStorage.setItem('token', '');
                router.push('/login');
                break;
            default:
                // return Promise.reject(error);
                return Promise.resolve([error, null]);
        }
    });
}

export default intercept;