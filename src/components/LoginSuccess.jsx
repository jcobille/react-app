import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/usersAction";
import { getUserId } from "./misc/cookie";

const LoginSuccess = () => {
    const dispatch = useDispatch();
    const userId = getUserId();

    const user = useSelector((state) => state.currentUser);
    useEffect(() => {
        dispatch(setCurrentUser(userId));
    }, [userId]);
    return (
        <>
            <section className="section">
                <div className="wrapper">
                    <div>
                        <p className="title">
                            Login Successful
                        </p>
                    </div>
                    <div>
                        <p className="title-1">
                            <b>Welcome !</b> {user.email}
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LoginSuccess