import thunk from "redux-thunk";
import { createStore, applyMiddleware , combineReducers} from "redux";
import promiseReducer from "./Reducer";
import authReducer from "./AuthReducer";
const combinedReducers = combineReducers({promise: promiseReducer, 
    auth:   authReducer})
    
const store = createStore(combinedReducers, applyMiddleware(thunk))
export default store;