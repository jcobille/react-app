import { axiosCall } from "../components/misc/api";

export const submitMessage = (data) => async (dispatch) => {
    let res = await axiosCall('/chats/create/', 'POST', data);
    dispatch({ type: 'CREATE_CHAT', payload: res.data });
    dispatch({ type: 'SEND_CHAT', payload: res.data });
}

export const getMessages = () => async (dispatch) => {
    const res = await axiosCall('/chats', 'GET');
    dispatch({ type: 'FETCH_CHATS', payload: res.data })
}

export const removeUserFromGroupChat = (id) => async (dispatch) => {
    const res = await axiosCall(`/chats/delete/${id}`, 'DELETE');
    dispatch({ type: 'DELETE_CHATS', payload: res.data });
}