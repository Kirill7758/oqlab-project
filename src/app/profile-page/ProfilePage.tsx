import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    createStyles,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
import React, { FC, useEffect } from "react";
import { red } from "@material-ui/core/colors";

import "./ProfilePage.css";
import { UserSelector } from "../shared/store/selectors/user.selector";
import { useDispatch } from "react-redux";
import { GetUserByIdAction } from "../shared/store/actions/users.action";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }),
);

const ProfilePage: FC<any> = () => {
    const classes = useStyles();
    const { user } = UserSelector()
    const dispatch = useDispatch()
    const { id }: any = useParams()
    useEffect(() => {
        dispatch(GetUserByIdAction(id))
    }, [dispatch, id, user.id])
    if (user.id) {
        return (
            <div className='profile flex-center'>
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                K
                            </Avatar>
                        }
                        title={user.name}
                        subheader={"User Phone - " + user.phone}
                    />
                    <CardMedia
                        className={classes.media}
                        image="https://www.next-t.co.kr/public/uploads/7b7f7e2138e29e598cd0cdf2c85ea08d.jpg"
                        title="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            User Address: {user.address.city}, {user.address.street}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            User Email: {user.email}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
    return null
}

export default ProfilePage;

