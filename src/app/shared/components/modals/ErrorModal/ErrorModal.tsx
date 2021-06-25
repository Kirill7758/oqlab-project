import React, { FC } from "react";
import { ErrorsSelector } from "../../../store/selectors/errors.selector";
import { useDispatch } from "react-redux";

import "./ErrorModal.css";
import { ClearErrorAction } from "../../../store/actions/errors.actions";
import { Button } from "@material-ui/core";

const ErrorModal: FC<any> = () => {
    const { title, message } = ErrorsSelector()
    const dispatch = useDispatch()
    const clearError = () => {
        dispatch(ClearErrorAction())
    }
    if (title && message) {
        return(
            <div className="overlay flex-center" onClick={clearError}>
                <div className="modal">
                    <header>
                        <h2>{title}</h2>
                    </header>
                    <main>
                        <p>{message}</p>
                    </main>
                    <footer>
                        <Button
                            color="primary"
                            onClick={clearError}
                        >
                            Close
                        </Button>
                    </footer>
                </div>
            </div>
        )
    }
    return null
}

export default ErrorModal
