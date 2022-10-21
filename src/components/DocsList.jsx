import React from "react";
import { useState, useEffect } from "react";
import Table from './table/Table';
import Modal from './popup/Modal';
import { useDispatch, useSelector } from "react-redux";
import * as _ from '../redux/documentsAction';

const myUploadsColumns = [
    { label: "Label", key: "label" },
    { label: "File Name", key: "fileName" },
    { label: "Action", key: "_id" }
];

const buttonList = [
    { label: 'Edit', link: '' },
    { label: 'Delete', link: '' },
    { label: 'Share', link: '/share' }];

const sharedUploadsColumns = [
    { label: "Label", key: "label" },
    { label: "File Name", key: "fileName" },
    { label: "Shared By", key: "sharedBy" }
];

const DocsList = () => {
    const addUploadLabel = "+ Add Upload";
    const dispatch = useDispatch();
    const sharedBy = useSelector((state) => state.uploads.sharedFile);
    const uploads = useSelector((state) => state.uploads.userUploads);
    const [modal, setModal] = useState({
        modalType: "",
        isOpen: false,
    });
    const [submitUpload, setSubmitUpload] = useState(true);
    const [selectedUpload, setSelectedUpload] = useState([]);
    const uploadDetails = useSelector((state) => state.uploadDetails);

    const closeModal = () => {
        setModal({ modalType: '', isOpen: !modal.isOpen });
    }

    const setAddUpload = async () => {
        setModal({ modalType: "add", isOpen: !modal.isOpen });
    }

    const setEditUpload = async (id) => {
        dispatch(_.getUploadDetails(id));
        setModal({ modalType: "edit", isOpen: !modal.isOpen });
    }

    const handleChanges = evt => {
        const name = evt.target.name;
        const value = evt.target.value;
        setSelectedUpload({ ...selectedUpload, [name]: value });
    }

    const setDeleteUpload = (id) => {
        setSelectedUpload({ id: id });
        setModal({ modalType: "delete", isOpen: !modal.isOpen });
    }

    const confirmHandler = () => {
        if (modal.modalType === 'delete') {
            dispatch(_.deleteUploadDetails(selectedUpload.id)).then((res) => {
                if (res.status) {
                    setModal({ modalType: "", isOpen: !modal.isOpen })
                    dispatch(_.getUploads());
                };
            });;
            setModal({ modalType: "", isOpen: !modal.isOpen });
        } else if (modal.modalType === 'edit') {
            dispatch(_.updateUploadDetails(selectedUpload)).then((res) => {
                if (res.status) setModal({ modalType: "", isOpen: !modal.isOpen });
                dispatch(_.getUploads());
            });
        } else {
            setModal({ modalType: "", isOpen: !modal.isOpen })
        }
    }

    useEffect(() => {
        dispatch(_.getUploads());
    }, [dispatch]);

    useEffect(() => {
        const data = {
            id: uploadDetails.id,
            label: uploadDetails.label
        }
        setSelectedUpload(data);
    }, [uploadDetails])
    return (
        <>
            <section className="full-section">
                <p className="title">My Uploads</p>
                <Table
                    data={uploads}
                    columns={myUploadsColumns}
                    minRow={4}
                    tableType="uploads"
                    buttonList={buttonList}
                    setDelete={setDeleteUpload}
                    setEdit={setEditUpload}
                />
            </section>
            <section className="full-section">
                <p className="title">Shared Uploads</p>
                <Table
                    data={sharedBy}
                    columns={sharedUploadsColumns}
                    minRow={4}
                    tableType="shared"
                />
                <button className="custom-float-btn" onClick={setAddUpload}>{addUploadLabel}</button>
            </section>
            <Modal
                modal={modal}
                closeModal={closeModal}
                isConfirm={confirmHandler}
                data={selectedUpload}
                handleChanges={handleChanges}
            />
        </>
    )
}

export default DocsList