import React from 'react';
import Modal from 'react-modal';
import { BodyAdd, BodyEdit, BodyDelete } from './Body';
Modal.setAppElement('#root');
const App = (props) => {
    let type = props.modal.modalType;
    let title = type === 'add' ? 'Upload' : type === 'edit' ? 'Edit' : "Confirm User Delete";
    const body = () => {
        if (type === 'add') {
            return <BodyAdd {...props} />;
        } else if (type === 'edit') {
            return <BodyEdit {...props} />
        } else {
            return <BodyDelete {...props} />
        }
    }
    return (
        <div>
            <Modal
                isOpen={props.modal.isOpen}
                className={"modal " + (type !== 'delete' ? "modal-md" : "")}
                overlayClassName="overlay"
            >
                <div className="modal-header">
                    {title}
                    <button className="btn-end" onClick={props.closeModal}>&#x2715;</button>
                </div>
                <div className="modal-body">
                    {body()}
                </div>
            </Modal>
        </div>
    );
}

export default App;