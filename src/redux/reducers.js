const usersList = { users: [] };
const userDetails = {
    _id: '',
    name: '',
    email: ''
};

const uploadsList = { userUploads: [], sharedFile: [] };
const uploadDetails = {
    id: '',
    userId: '',
    label: '',
    fileName: '',
    sharedTo: []
};

const chats = [];
const chat = {
    message: '',
    timestamp: '',
    user: '',
}

// Current user
export const currentUserReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case "SET_CURRENT_USER":
            return { ...state, ...payload };
        case "FETCH_CURRENT_USER":
            return state;
        default:
            return state;
    }
};

// List of users
export const usersListReducer = (state = usersList, { type, payload }) => {
    switch (type) {
        case "FETCH_USERS":
            return { ...state, users: payload };
        default:
            return state;
    }
};

// User Details
export const userReducer = (state = userDetails, { type, payload }) => {
    switch (type) {
        case "FETCH_USER":
            return { ...state, ...payload };
        case "CREATE_USER":
            return payload;
        case "EDIT_USER":
            return payload;
        case "DELETE_USER":
            return payload;
        case "USER_LOGOUT":
            return payload;
        default:
            return userDetails;
    }
}

// Uploads List
export const uploadsReducer = (state = uploadsList, { type, payload }) => {
    switch (type) {
        case "FETCH_UPLOADS":
            return { ...state, ...payload };
        case "DELETE_UPLOADS":
            return state;
        default:
            return state;
    }
}

// Upload details
export const uploadReducer = (state = uploadDetails, { type, payload }) => {
    switch (type) {
        case "CREATE_UPLOAD":
            return payload;
        case "FETCH_UPLOAD":
            return { ...state, ...payload };
        case "EDIT_UPLOAD":
            return { ...state, ...payload };
        case "DELETE_UPLOAD":
            return payload;
        default:
            return state;
    }
}


// Chats
export const chatsReducer = (state = chats, { type, payload }) => {
    switch (type) {
        case "CREATE_CHAT":
            state.push(payload);
            return state;
        case "FETCH_CHATS":
            return payload;
        case "DELETE_CHATS":
            return payload;
        default:
            return state;
    }
}

export const chatReducer = (state = chat, { type, payload }) => {
    switch (type) {
        case "SEND_CHAT":
            return { ...state, ...payload };
        case "RESET_CHAT":
            return;
        default:
            return state;
    }
}