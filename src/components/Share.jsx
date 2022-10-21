import { useEffect, useState } from "react";
import Table from './table/Table';
import { UserSelection } from "./views/FormInputs";
import { useParams } from "react-router-dom";
import { getUsers } from "../redux/usersAction";
import { getUploadDetails, updateUploadDetails } from "../redux/documentsAction";
import Modal from './popup/Modal';
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "./misc/cookie";

const myUploadsColumns = [
    { label: "Shared User", key: "name" },
    { label: "Action", key: "_id" }
];

const Share = () => {
    const { id } = useParams();
    const userId = getUserId();
    const dispatch = useDispatch();
    const [sharedUserIds, setSharedUserIds] = useState([]); // list of users id shared to file
    const [sharedToUser, setSharedToUser] = useState({}); // list of users details shared to file
    const [selectedUserId, setSelectedUser] = useState(''); // selected user to remove or to share
    const [usersList, setUsersList] = useState([]);
    const [modal, setModal] = useState({
        modalType: "",
        isOpen: false
    });
    const uploadsDetails = useSelector((state) => state.uploadDetails);
    let userList = useSelector((state) => state.usersList.users);

    useEffect(() => {
        dispatch(getUploadDetails(id));
        dispatch(getUsers());
    }, [id]);

    useEffect(() => {
        let userData = [];
        let userIds = [];
        userList = userList.filter(user => { // remove users from selection list if already shared 
            let sharedId = uploadsDetails.sharedTo?.find((userId) => {
                return userId === user._id;
            })

            if (sharedId === user._id) {
                userIds.push(sharedId);
                userData.push(user);
            }
            return sharedId !== user._id && userId !== user._id;
        });

        setUsersList(userList);
        setSharedToUser(userData);
        setSharedUserIds(userIds);
    }, [uploadsDetails, userList])

    const changeHandler = evt => {
        setSelectedUser(evt.target.value);
    }

    const setUser = (id) => {
        setSelectedUser(id);
        setModal({ modalType: "delete", isOpen: !modal.isOpen });
    }

    const closeModal = () => {
        setModal({ modalType: "", isOpen: !modal.isOpen });
    }

    const confirmDelete = () => {
        let list = sharedUserIds.filter(userId => userId !== selectedUserId);
        dispatch(updateUploadDetails({ id: id, sharedTo: list }));
        setModal({ modalType: "", isOpen: !modal });
    }

    const shareToUser = () => {
        if (!selectedUserId) {
            alert('No user selected');
        } else {
            dispatch(updateUploadDetails({ id: id, sharedTo: [...sharedUserIds, selectedUserId] }));
            setSelectedUser('');
        }
    }

    return (
        <>
            <section className="full-section">
                <p>
                    <span className="title">Upload Sharing:</span>
                    <span className="title-1"> {uploadsDetails.fileName}</span>
                </p>
                <Table
                    columns={myUploadsColumns}
                    minRow={4}
                    tableType="sharedTo"
                    data={sharedToUser}
                    setDelete={setUser}
                />
                <Modal modal={modal} closeModal={closeModal} isConfirm={confirmDelete} />

            </section>
            <section className="full-section">
                <p className="title">Add Sharing</p>
                <div className="bordered-div p-4">
                    <div className="row">
                        <div className="col-2 text-end">
                            Choose User:
                        </div>
                        <div className="col-3">
                            <UserSelection value={selectedUserId} data={usersList} changeHandler={changeHandler} />
                        </div>
                        <div className="col-3 text-start">
                            <button className="btn-share" onClick={shareToUser}>Add Share</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Share