import React, { FC, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom"

import { LINKS, LINKS_STATE } from "./links";
import MainPage from "../main-page";
import NewsPage from "../news-page";
import ProfilePage from "../profile-page";
import LoginPage from "../login-page";
import { useDispatch } from "react-redux";
import { LogoutUserAction } from "../shared/store/actions/users.action";
import { UserSelector } from "../shared/store/selectors/user.selector";

const PrivateRoute: FC<any> = ({ isAuth, ...routes }) => {
    if (isAuth) {
        return <Route {...routes} />
    } else {
        return <Redirect to={{
            pathname: LINKS.REDIRECT,
            state: {
                title: LINKS_STATE.LOGIN.title
            }
        }} />
    }
}

const RoutesPage: FC<any> = () => {
    const { authority } = UserSelector()
    const dispatch = useDispatch()
    useEffect(() => {
        const expire = authority.expireIn
        if (expire && new Date(expire) < new Date()) {
            dispatch(LogoutUserAction())
        }
    }, [dispatch, authority.expireIn])
    return (
        <Switch>
            <Route exact path={LINKS.MAIN} component={MainPage} />
            <Route exact path={LINKS.NEWS} component={NewsPage} />
            <Route exact path={LINKS.LOGIN} component={LoginPage} />
            <PrivateRoute
                exact
                path={LINKS.PROFILE}
                component={ProfilePage}
                isAuth={authority.token}
            />
            <Redirect to={{
                pathname: LINKS.REDIRECT,
                state: {
                    title: LINKS_STATE.LOGIN.title
                }
            }} />
        </Switch>
    )
}

export default RoutesPage
