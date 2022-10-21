const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
};

export const formatTime = (time = null) => {
    let date = time ? new Date(time) : new Date();
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    );
}