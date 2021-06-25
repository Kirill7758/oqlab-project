import { IToken, IUser } from "../interfaces";

interface IState {
    users: IUser[],
    user: IUser | {},
    authority: IToken
}

const initState: IState = {
    users: [
        {
            id: 666,
            username: 'Admin',
            password: '12345',
            name: 'Gerasimenko Kirill',
            email: 'kirillg7758@gmail.com',
            address: {
                street: 'Somebody St.',
                suite: 'Apt.666',
                city: 'Kiev',
                zipcode: '02000',
            },
            phone: "050-14-26145",
            website: null,
            company: null
        }
    ],
    user: {},
    authority: {
        token: localStorage.getItem('owlab-test-token') || false,
        expireIn: localStorage.getItem('owlab-test-expireIn') || 0
    }
}
export interface IUsersActions {
    GET_USERS: {
        type: 'GET_USERS',
        payload: { users: IUser[] }
    },
    FIND_USER: {
        type: 'FIND_USER',
        payload: { login: string, password: string }
    },
    LOGIN: {
        type: 'LOGIN',
        payload: { login: string, password: string }
    },
    LOGOUT: {
        type: 'LOGOUT'
    },
    GET_BY_ID: {
        type: 'GET_BY_ID',
        payload: { id: string | number }
    }
}

export type IUsersActionTypes = IUsersActions['GET_USERS']
    | IUsersActions['FIND_USER']
    | IUsersActions['LOGIN']
    | IUsersActions['LOGOUT']
    | IUsersActions['GET_BY_ID']

export const UsersReducer = (state = initState, action: IUsersActionTypes) => {
    switch (action.type) {
        case "GET_USERS":
            const token = localStorage.getItem('owlab-test-token')
            const expireIn = localStorage.getItem('owlab-test-expireIn')
            if (token && expireIn) {
                return {
                    ...state,
                    users: [...state.users, action.payload.users],
                    authority: {
                        token,
                        expireIn
                    }
                }
            }
            return {
                ...state,
                users: [...state.users, action.payload.users],
                authority: {
                    token: false,
                    expireIn: 0
                }
            }
        case "GET_BY_ID":
            const findById = state.users.find(item => +item.id === +action.payload.id)
            if (findById) {
                return {
                    ...state,
                    user: { ...findById }
                }
            }
            return state
        case "LOGIN":
            const checkUser = action.payload
            const findUser = state.users.find((item: IUser) =>
                item.username === checkUser.login && item.password === checkUser.password)
            if (findUser) {
                const expireIn = new Date(new Date().getTime() + 900000) // plus 15 minutes
                localStorage.setItem('owlab-test-token', '1')
                localStorage.setItem('owlab-test-expireIn', String(expireIn))
                return  {
                    ...state,
                    user: findUser,
                    authority: {
                        token: '1',
                        expireIn
                    }
                }
            }
            return state
        case "LOGOUT":
            localStorage.removeItem('owlab-test-token')
            localStorage.removeItem('owlab-test-expireIn')
            return {
                ...state,
                user: {},
                authority: {
                    token: false,
                    expireIn: 0
                }
            }
        default:
            return state
    }
}
