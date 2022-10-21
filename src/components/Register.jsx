import { TextInput } from "./views/FormInputs";
import { useEffect, useState } from 'react';
import { checkLoggedUser } from './misc/api';
import { useNavigate } from 'react-router-dom';
import { createUser } from "../redux/usersAction";
import { useDispatch } from "react-redux";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (checkLoggedUser()) navigate('/login-success');
    });

    const [details, setDetails] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const submitHandler = async evt => {
        evt.preventDefault();
        dispatch(createUser(details)).then((res) => {
            if (res.status) navigate('/registration-success');
        });
    }

    const handleDetailChange = evt => {
        let name = evt.target.name;
        let val = evt.target.value;

        setDetails({ ...details, [name]: val });
    }

    return (
        <section className="section">
            <div className="wrapper">
                <div>
                    <p className="title">
                        Register
                    </p>
                </div>
                <div>
                    <form method="post" onSubmit={submitHandler}>
                        <div className="p-2">
                            <TextInput
                                value={details.name}
                                onChange={handleDetailChange}
                                name="name"
                                type="text"
                                placeholder="Anne Hunter"
                                id="fullname"
                                label="Full Name" />
                        </div>
                        <div className="p-2">
                            <TextInput
                                value={details.email}
                                onChange={handleDetailChange}
                                name="email"
                                type="text"
                                placeholder="anne.hunter@mail.com"
                                id="email"
                                label="Email Address"
                            />
                        </div>
                        <div className="p-2">
                            <TextInput
                                value={details.password}
                                onChange={handleDetailChange}
                                name="password"
                                type="password"
                                placeholder="********"
                                id="password"
                                label="Password"
                            />
                        </div>
                        <div className="p-2">
                            <TextInput
                                value={details.confirmPassword}
                                onChange={handleDetailChange}
                                name="confirmPassword"
                                type="password"
                                placeholder="********"
                                id="confirm-password"
                                label="Confirm Password"
                            />
                        </div>
                        <div>
                            <button className="bordered-button cyan btn-lg">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Register;