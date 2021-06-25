import { shallowEqual, useSelector } from "react-redux";
import { RootType } from "../index";
import { IToken, IUser } from "../interfaces";

interface ISelect {
    user: IUser,
    users: IUser[],
    authority: IToken ,
}

export const UserSelector = (): ISelect => {
    const {  users, user, authority  } = useSelector(({ users }: RootType): RootType['users'] => users, shallowEqual)
    return { user, users, authority }
}
