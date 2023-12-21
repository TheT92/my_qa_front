/*
 * @name: 
 * @param: 
 * @return: 
 */
export const BASE_URL = '/api';
export const PROXY_URL = 'http://localhost:8090';
export const PORT_NUMBER = 9000;

export const ACTION_SUCCESS = "操作成功!";
export const ACTION_FAIL = "操作失败~";

export const STATUS_CODES = {
    UNAUTHORIZED: 401
}

export const PAGE_SIZE = {
    DEFAULT: 10
}

export const LAYOUTS = {
    LAYOUT_LIST: {
        xs: { span: 20, offset: 2 },
        sm: { span: 20, offset: 2 },
        md: { span: 16, offset: 4 },
        lg: { span: 16, offset: 4 },
        xl: { span: 12, offset: 8 },
    },
    LAYOUT_FORM: {
        xs: { span: 18, offset: 3 },
        sm: { span: 16, offset: 4 },
        md: { span: 16, offset: 4 },
        lg: { span: 14, offset: 5 },
        xl: { span: 12, offset: 6 },
    },
}

export const EXCLUDE_ROUTERS = [
    "/api/account/login",
    "/api/question/questionsPage"
]