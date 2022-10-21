import { TextInput } from "./views/FormInputs";
import { useEffect, useState } from 'react';
import { axiosCall } from "./misc/api";
import { setCookie } from "./misc/cookie";
import { checkLoggedUser } from './misc/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [credential, setCredential] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (checkLoggedUser()) navigate('/users-list');
    });

    const submitLogin = async evt => {
        evt.preventDefault();
        let process = await axiosCall('/users/login', 'POST', credential);
        if (process.status) {
            let token = process.data.token;
            let id = process.data.id;

            setCookie("token", token, 7);
            localStorage.setItem('userId', id);
            navigate('/login-success');
        }
    };

    const handleCredentialChange = evt => {
        let name = evt.target.name;
        let val = evt.target.value;
        setCredential({ ...credential, [name]: val });
    }

    return (
        <section className="section">
            <div className="wrapper">
                <div>
                    <p className="title">
                        Login
                    </p>
                </div>
                <div>
                    <form method="post" onSubmit={submitLogin}>
                        <div className="p-2">
                            <TextInput
                                value={credential.email}
                                onChange={handleCredentialChange}
                                type="text"
                                placeholder="anne.hunter@mail.com"
                                name="email"
                                id="email"
                                label="Email Address"
                            />
                        </div>
                        <div className="p-2">
                            <TextInput
                                value={credential.password}
                                onChange={handleCredentialChange}
                                type="password"
                                placeholder="********"
                                name="password"
                                id="password"
                                label="Password"
                            />
                        </div>
                        <div>
                            <button type="submit" className="bordered-button cyan btn-lg">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;