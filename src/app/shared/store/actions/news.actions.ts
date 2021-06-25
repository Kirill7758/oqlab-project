import { Dispatch } from "redux";
import { INewsActions } from "../reducers/news.reducer";

export const GetNewsAction = () => async (dispatch: Dispatch<INewsActions['GET_NEWS']>) => {
    try {
        const news = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=20')
            .then(res => res.json())
        dispatch({
            type: "GET_NEWS",
            payload: { news }
        })
    } catch (e) {
        throw new Error(e)
    }
}
