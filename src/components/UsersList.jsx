import React from "react";
import { useState, useEffect } from "react";
import { getUserId } from './misc/cookie';
import Table from './table/Table';
import Modal from './popup/Modal';
import { getUsers, deleteUserDetails } from '../redux/usersAction';
import { removeUserFromGroupChat } from '../redux/chatsAction';
import { deleteUserUploadFiles } from '../redux/documentsAction';
import { useDispatch, useSelector } from "react-redux";

const columnsList = [
    { label: "Name", key: "name" },
    { label: "User Email ID", key: "email" },
    { label: "", key: "_id" }
];

const buttonList = [{ label: 'Edit', link: '/edit-user' }, { label: 'Delete', link: '' }];

const UsersList = () => {
    const userId = getUserId();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.usersList.users);
    const [modal, setModal] = useState({
        modalType: "",
        isOpen: false
    });
    const [selectedId, setSelectedId] = useState();

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const closeModal = (id) => {
        setModal({ modalType: "", isOpen: !modal.isOpen });
    }

    const deleteUser = (id) => {
        setSelectedId(id);
        setModal({ modalType: "delete", isOpen: !modal.isOpen });
    }

    const confirmDelete = () => {
        dispatch(deleteUserDetails(selectedId));
        dispatch(removeUserFromGroupChat(selectedId));
        dispatch(deleteUserUploadFiles(selectedId));
        dispatch(getUsers());
        setModal({ modalType: "", isOpen: !modal });
    }

    return (
        <>
            <section className="full-section">
                <p className="title">Users</p>
                <Table
                    data={users}
                    columns={columnsList}
                    minRow={13}
                    tableType="user"
                    buttonList={buttonList}
                    setDelete={deleteUser}
                    userId={userId}
                />
            </section>
            <Modal modal={modal} closeModal={closeModal} isConfirm={confirmDelete} />
        </>
    )
}

export default UsersList