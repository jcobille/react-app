import { axiosCall } from "../components/misc/api";

export const setCurrentUser = (id) => async (dispatch) => {
    const res = await axiosCall(`/users/details/${id}`, 'GET');
    dispatch({ type: 'SET_CURRENT_USER', payload: res.data })
}

export const getUsers = () => async (dispatch) => {
    const res = await axiosCall('/users', 'GET');
    dispatch({ type: 'FETCH_USERS', payload: res.data })
}

export const getUserDetails = (id) => async (dispatch) => {
    const res = await axiosCall(`/users/details/${id}`, 'GET');
    dispatch({ type: 'FETCH_USER', payload: res.data })
}

export const createUser = (data) => (dispatch) => {
    return axiosCall('/users/create', 'POST', data).then((res) => {
        dispatch({ type: 'CREATE_USER', payload: [] });
        return res;
    })
}

export const editUserData = (data) => (dispatch, getState) => {
    let userUpdate = {
        name: data.name,
        email: data.email
    }
    return axiosCall(`/users/edit/${data._id}`, 'PATCH', userUpdate).then((res) => {
        dispatch({ type: 'EDIT_USER', payload: data })
        return res;
    });
}

export const deleteUserDetails = (id) => async (dispatch) => {
    await axiosCall(`/users/delete/${id}`, 'DELETE');
    dispatch({ type: 'DELETE_USER', payload: id })
}

export const logoutUser = () => (dispatch) => {
    dispatch({ type: 'USER_LOGOUT', payload: []});
}