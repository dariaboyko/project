import actionPromise from "./ActionPromise";
const getGQL = url =>
    (query, variables = {}) =>
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {}),
                Accept: "application/json",
            },
            body: JSON.stringify({ query, variables }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.data) {
                    return Object.values(data.data)[0];
                } else throw new Error(JSON.stringify(data.errors));
            });

const URL = `http://shop-roles.node.ed.asmer.org.ua/`

const gql = getGQL(`${URL}graphql`)


const actionAuthLogin = (token) => 
    (dispatch, getState) => {
        const oldState = getState().auth
        dispatch({type: 'AUTH_LOGIN', token})
        const newState = getState().auth
        if (newState !== oldState){
            localStorage.authToken = token
        }     
    }

const actionFullLogin = (login, password) =>
    async (dispatch) => {
        const gqlQuery = `query log($login:String, $password:String){
            login(login:$login, password:$password)
        }`
        const gqlPromise = gql(gqlQuery, {login, password})
        const action     = actionPromise('login', gqlPromise) 
        const result     = await dispatch(action)
        dispatch(actionAuthLogin(result))
    }
export default actionFullLogin;