import React, { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";

const RootRouter: FC = ({ children }) => {
    return (
        <Router>
            {children}
        </Router>
    )
}

export default RootRouter
