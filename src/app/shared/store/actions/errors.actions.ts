import { IErrorActions } from "../reducers/errors.reducer";

export const GetErrorAction = (payload: IErrorActions['GET_ERROR']['payload']): IErrorActions['GET_ERROR'] => {
    return {
        type: "GET_ERROR",
        payload
    }
}

export const ClearErrorAction = (): IErrorActions['CLEAR_ERROR'] => {
    return {
        type: "CLEAR_ERROR"
    }
}
