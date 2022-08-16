function jwtDecode(token){
    try{
        return JSON.parse(atob(token.split('.')[1]))
    }
    catch (e) {

    }
}
function authReducer(state={}, {type, token}){
    if (type === 'AUTH_LOGIN'){
        const payload = jwtDecode(token)
        if (payload)
            return {token, payload}
    }
    if (type === 'AUTH_LOGOUT'){
        return {}
    }
    return state
}
export default authReducer;