import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";

import { NewsSelector } from "../shared/store/selectors/news.selector";
import { GetNewsAction } from "../shared/store/actions/news.actions";
import "./NewsPage.css";
import { Card, CardContent, Typography } from "@material-ui/core";

const NewsPage: FC<any> = () => {
    const { news } = NewsSelector()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetNewsAction())
    }, [dispatch])
    return (
        <div>
            <h1>News Page</h1>
            <div className="cards flex-start">
                {news.map(item => {
                    return (
                        <div className="card" key={item.id}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        { item.title }
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        { item.body }
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NewsPage;
