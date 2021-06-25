import React, { FC, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import { Button, Icon, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { LoginUserAction } from "../shared/store/actions/users.action";
import { UserSelector } from "../shared/store/selectors/user.selector";
import { GetErrorAction } from "../shared/store/actions/errors.actions";
import { LINKS_STATE, PATHS } from "../routes-page/links";
import "./LoginPage.css";

const loginValues = {
    login: '',
    password: ''
}

const LoginPage: FC<any> = () => {
    const [isSubmit, setIsSubmit] = useState(false)
    const { authority, user } = UserSelector()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!authority.token && isSubmit) {
            dispatch(GetErrorAction({ title: 'Authorization', message: 'Login or password are incorrect!' }))
        }
        return () => {
            setIsSubmit(false)
        }
    }, [authority.token, isSubmit, dispatch])
    const onSubmit = (values: FormikValues, helpers: FormikHelpers<any>) => {
        const { resetForm } = helpers
        dispatch(LoginUserAction({
            login: values.login,
            password: values.password
        }))
        const { token } = authority
        if (token) {
            resetForm()
        }
        setIsSubmit(true)
    }

    if (authority.token) {
        return <Redirect to={{
            pathname: PATHS.PROFILE(user.id),
            state: {
                title: LINKS_STATE.PROFILE.title
            }
        }} />
    }

    return (
        <div className='flex-center flex-col form'>
            <Formik
                initialValues={loginValues}
                onSubmit={onSubmit}
            >
                {({values, handleChange, errors, touched}: FormikProps<FormikValues>) => {
                    return (
                        <Form className='flex-start flex-col'>
                            <label className='flex-center'>
                                <Icon
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </Icon>
                            </label>
                            <TextField
                                className='field'
                                name='login'
                                id="standard-basic"
                                label="Login"
                                value={values.login}
                                onChange={handleChange}
                            />
                            <TextField
                                className='field'
                                name='password'
                                id="standard-basic"
                                label="Password"
                                value={values.password}
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Log in
                            </Button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default LoginPage;
