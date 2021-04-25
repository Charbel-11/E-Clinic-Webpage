export function saveUserToken(userToken) {
    if (userToken === null) { localStorage.removeItem("TOKEN"); }
    else { localStorage.setItem("TOKEN", userToken); }
}
export function getUserToken() {
    return localStorage.getItem("TOKEN");
}

export function saveUserType(userType) {
    if (userType === null){ localStorage.removeItem("TYPE"); }
    else { localStorage.setItem("TYPE", userType); }
}
export function getUserType() {
    var res = localStorage.getItem("TYPE");
    if (res !== null){ res = parseInt(res); }
    return res;
}