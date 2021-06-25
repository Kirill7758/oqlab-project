interface IState {
    title: string | null,
    message: string | null
}

const initState: IState = {
    title: null,
    message: null,
}
export interface IErrorActions {
    GET_ERROR: {
        type: 'GET_ERROR',
        payload: { title: string, message: string }
    },
    CLEAR_ERROR: {
        type: 'CLEAR_ERROR'
    }
}

export type IErrorActionTypes = IErrorActions['GET_ERROR'] | IErrorActions["CLEAR_ERROR"]

export const ErrorReducer = (state = initState, action: IErrorActionTypes) => {
    switch (action.type) {
        case "GET_ERROR":
            return {
                title: action.payload.title,
                message: action.payload.message,
            }
        case "CLEAR_ERROR":
            return {
                title: null,
                message: null
            }
        default:
            return state
    }
}
