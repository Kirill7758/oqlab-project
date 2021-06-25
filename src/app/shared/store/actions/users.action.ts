import { Dispatch } from "redux";
import { IUsersActions } from "../reducers/users.reducer";
import { IUser } from "../interfaces";

type UsersResponseTypes = {
    user: {
        "id": number,
        "name": string,
        "username": string,
        "email": string,
        "address": {
            "street": string,
            "suite": string,
            "city": string,
            "zipcode": string,
            "geo": {
                "lat": string,
                "lng": string
            }
        },
        "phone": string,
        "website": string,
        "company": {
            "name": string,
            "catchPhrase": string,
            "bs": string
        }
    }
}

export const GetUsersAction = () => async (dispatch: Dispatch<IUsersActions['GET_USERS']>) => {
    try {
        const { body } = await fetch('')
            .then(res => res.json())
        const users = body.map((item: UsersResponseTypes['user'], idx: number): IUser => {
            const { address, ...user } = item
            const { geo, ...newAddress } = address
            return {
                ...user,
                address: { ...newAddress },
                password: 'secret-key---' + idx
            }
        })
        dispatch({
            type: 'GET_USERS',
            payload: { users }
        })
    } catch (e) {

    }
}

export const GetUserByIdAction = (id: string | number): IUsersActions['GET_BY_ID'] => {
    return {
        type: "GET_BY_ID",
        payload: { id }
    }
}

export const LoginUserAction = (payload: IUsersActions['LOGIN']['payload']): IUsersActions['LOGIN'] => {
    return {
        type: 'LOGIN',
        payload
    }
}

export const LogoutUserAction = (): IUsersActions['LOGOUT'] => {
    return {
        type: 'LOGOUT'
    }
}
