import { axiosCall, axiosCallFile } from "../components/misc/api";
import { getUserId } from '../components/misc/cookie';

export const getUploads = () => async (dispatch) => {
    let userId = getUserId();
    return await axiosCall(`/uploads/${userId}`, 'GET').then((res) => {
        dispatch({ type: 'FETCH_UPLOADS', payload: res.data })
        return res;
    });
}

export const getUploadDetails = (id) => (dispatch) => {
    return axiosCall(`/uploads/details/${id}`, 'GET').then((res) => {
        let data = {
            id: '',
            label: ''
        }
        if (res.status) {
            data = {
                id: res.data._id,
                label: res.data.label,
                ...res.data
            }
            delete data._id;
            dispatch({ type: 'FETCH_UPLOAD', payload: data });
        }
        return res;
    })
}

export const createUploadDetails = (data) => async (dispatch) => {
    data.file = data.file[0];
    return axiosCallFile(`/uploads/create`, 'POST', data).then((res) => {
        dispatch({ type: 'CREATE_UPLOAD', payload: data })
        return res;
    });
}

export const updateUploadDetails = (data) => (dispatch) => {
    return axiosCall(`/uploads/update/${data.id}`, 'PATCH', data).then((res) => {
        dispatch({ type: 'EDIT_UPLOAD', payload: data });
        return res;
    })
}

export const deleteUploadDetails = (id) => async (dispatch) => {
    return axiosCall(`/uploads/delete/${id}`, 'DELETE').then((res) => {
        dispatch({ type: 'DELETE_UPLOAD', payload: id });
        return res;
    });
}

export const deleteUserUploadFiles = (id) => async (dispatch) => {
    await axiosCall(`/uploads/delete/user/${id}`, 'DELETE');
    dispatch({ type: 'DELETE_UPLOADS', payload: id })
}