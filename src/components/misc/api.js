import { getCookie, getUserId } from './cookie';
import axios from 'axios';

export const axiosCall = async (url, method, data) => {
    let token = getCookie("token");
    let returnedData = [];
    let options = {
        method: method,
        url: `http://localhost:3002${url}`,
        data: data,
        headers: {}
    }
    if (method.toLowerCase() === 'get' && data) {
        if (Object.keys(data).length > 0) {
            options.params = data;
        }
    }

    if (token) {
        options.headers = {
            'Authorization': `Bearer ${token}`
        };
    }
    let request = await axios(options);
    returnedData = request.data;

    if (!request.data.status) {
        alert(request.data.message);
    }

    return returnedData;
}

export const axiosCallFile = async (url, method, data) => {
    const formData = new FormData();
    let token = getCookie("token");
    let returnedData = [];
    let options = {
        method: method,
        url: `http://localhost:3002${url}`,
        data: data,
        headers: {}
    }

    for (const name in data) {
        formData.append(name, data[name]);
    }

    if (token) {
        options.headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            'Accept': '*/*',
        };
    }
    let request = await axios(options);
    returnedData = request.data;

    if (!request.data.status) {
        alert(request.data.message);
    }

    return returnedData;
}

export const checkLoggedUser = () => {
    let token = getCookie("token");
    let userId = getUserId();

    return (token && userId) ? true : false;
}