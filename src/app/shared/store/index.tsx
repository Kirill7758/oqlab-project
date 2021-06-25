import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux"
import React, { FC } from "react";
import thunk from "redux-thunk";

import { UsersReducer } from "./reducers/users.reducer";
import { NewsReducer } from "./reducers/news.reducer";
import { ErrorReducer } from "./reducers/errors.reducer";

const rootReducer = combineReducers({
    users: UsersReducer,
    news: NewsReducer,
    errors: ErrorReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootType =  ReturnType<typeof store.getState>

const RootProvider: FC<any> = ({ children }) => {

    return (
        <Provider store={store}>
            { children }
        </Provider>
    )
}

export default RootProvider
