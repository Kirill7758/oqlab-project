import { INew } from "../interfaces";

export interface INewsActions {
    GET_NEWS: {
        type: 'GET_NEWS',
        payload: { news: INew[] }
    }
}

interface IState {
    news: INew[] | []
}

const initState: IState = {
    news: []
}

type NewsActionTypes = INewsActions['GET_NEWS']

export const NewsReducer = (state = initState, action: NewsActionTypes) => {
    switch (action.type) {
        case "GET_NEWS":
            return {
                news: [...action.payload.news]
            }
        default:
            return state
    }
}
