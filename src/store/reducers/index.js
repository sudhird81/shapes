/****************************/
//Author - Sudhir Dadwal
/****************************/
import { combineReducers } from "redux";
import { shapesReducer } from "./shapes";

const appReducer = combineReducers({
    shapesReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
