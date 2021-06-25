import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { List, ListItem, ListItemText } from '@material-ui/core';

import { GetUsersAction, LogoutUserAction } from "../../store/actions/users.action";
import { UserSelector } from "../../store/selectors/user.selector";
import { LINKS, LINKS_STATE, PATHS } from "../../../routes-page/links";

import './Navbar.css';

const Navbar = () => {
    const location = useLocation<Location>()
    const { authority, user } = UserSelector()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetUsersAction())
    }, [dispatch])
    return (
        <div>
            <AppBar position="static">
                <Toolbar className='container flex-between'>
                    <List className='navbar__list flex-start'>
                        <ListItem button key='main'>
                            <NavLink className="link" to={{
                                pathname: LINKS.MAIN,
                                state: {
                                    title: LINKS_STATE.MAIN.title
                                }
                            }}>
                                <ListItemText className='navbar__list--item' primary='main' />
                            </NavLink>
                        </ListItem>
                        <ListItem button key='news'>
                            <NavLink className="link" to={{
                                pathname: LINKS.NEWS,
                                state: {
                                    title: LINKS_STATE.NEWS.title
                                }
                            }}>
                                <ListItemText className='navbar__list--item' primary='news' />
                            </NavLink>
                        </ListItem>
                        {!authority.token && <ListItem button key='login'>
                            <NavLink className="link" to={{
                            pathname: LINKS.LOGIN,
                                state: {
                                    title: LINKS_STATE.LOGIN.title
                                }
                            }}>
                                <ListItemText className='navbar__list--item' primary='login'/>
                            </NavLink>
                        </ListItem>}
                    </List>
                    <Typography variant="h6" className='navbar__list--item'>
                        { location?.state.title }
                    </Typography>
                    <div className='flex-center'>
                        <NavLink to={{
                            pathname: PATHS.PROFILE(user.id),
                            state: {
                                title: LINKS_STATE.PROFILE.title
                            }
                        }} className='link'>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </NavLink>
                        { !!authority?.token
                        && <ExitToAppIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() => dispatch(LogoutUserAction())}
                        /> }
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar
