export const setCookie = (cookieName, value, expiredays) => {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);

    document.cookie =
        cookieName +
        "=" +
        value +
        (expiredays === null ? "" : ";expires=" + exdate.toGMTString());
}

export const getCookie = (cookieName) => {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(cookieName + "=");
        if (c_start !== -1) {
            c_start = c_start + cookieName.length + 1;
            let c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

export const getUserId = () => {
    return localStorage.getItem('userId');
}

export const logout = () => {
    setCookie("token", null, 0);
    localStorage.removeItem('userId');
}