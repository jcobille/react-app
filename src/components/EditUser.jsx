import { TextInput } from "./views/FormInputs";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getUserDetails, editUserData } from '../redux/usersAction';
import { useDispatch, useSelector } from "react-redux";

const EditUser = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        _id: id,
        name: '',
        email: ''
    });

    const userDetails = useSelector((state) => state.userEdit);
    
    useEffect(() => {
        dispatch(getUserDetails(id));
    }, [dispatch]);

    useEffect(() => {
        setUser(userDetails)
    }, [userDetails])

    const handleChanges = evt => {
        let name = evt.target.name;
        let val = evt.target.value;
        setUser({ ...user, [name]: val });
    }

    const handleSubmit = async evt => {
        evt.preventDefault();
        dispatch(editUserData(user)).then((res) => {
            if (res.status) navigate('/users-list'); 
        });
    }
    return (
        <>
            <section className="section">
                <div className="wrapper">
                    <div>
                        <p className="title">
                            Edit User
                        </p>
                    </div>
                    <div>
                        <form method="post" onSubmit={handleSubmit}>
                            <TextInput
                                type="text"
                                placeholder="Anne Hunter"
                                name="name"
                                id="name"
                                label="Full Name"
                                value={user.name}
                                onChange={handleChanges}
                            />
                            <TextInput
                                type="text"
                                placeholder="anne.hunter@mail.com"
                                name="email"
                                label="Email"
                                value={user.email}
                                onChange={handleChanges}

                            />
                            <div>
                                <button type="submit" className="bordered-button cyan btn-lg">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default EditUser;