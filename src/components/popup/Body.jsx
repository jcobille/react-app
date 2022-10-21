import { useState } from "react";
import { getUserId } from '../misc/cookie';
import { createUploadDetails, getUploads } from '../../redux/documentsAction';
import { useDispatch } from "react-redux";

export const BodyAdd = (props) => {
    const dispatch = useDispatch();
    const userId = getUserId();
    const [fileName, setfileName] = useState("No File Selected");
    const [upload, setUpload] = useState({
        userId: userId,
        label: '',
        file: ''
    });
    const handleChanges = e => {
        const name = e.target.name;
        let value = "";
        if (name === 'file') {
            value = e.target.files;
            setfileName(e.target.files[0].name);
        } else {
            value = e.target.value;
        }
        setUpload({ ...upload, [name]: value });
    }
    const handleSubmit = () => {
        if (!upload.label) {
            alert("Description is required");
        } else if (!upload.file) {
            alert("File is required");
        } else {
            dispatch(createUploadDetails(upload)).then((res) => {
                if(res.status) dispatch(getUploads());
            });
            props.isConfirm();
        }
    }
    return <div>
        <div className="row">
            <div className="col-3 centered">
                File Description
            </div>
            <div className="col centered">
                <input type="text" autoComplete="off" className="bordered-input" name="label" onChange={handleChanges} />
            </div>
        </div>
        <div className="row">
            <div className="col-3 centered">
                File Upload
            </div>
            <div className="col text-start">
                <div className="row">
                    <div className="col-4">
                        <label htmlFor="file-upload" className="btn-grey">
                            Choose File
                        </label>
                        <input type="file" name="file" id="file-upload" hidden onChange={handleChanges} />
                    </div>
                    <div className="col">
                        <label className="pl-2">
                            {fileName}
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-3">
                <button className='btn-grey' onClick={handleSubmit}>Upload Now</button>
            </div>
            <div className="col-3 text-start">
                <button className='btn-grey' onClick={props.closeModal}>Cancel</button>
            </div>
        </div>
    </div>
}

export const BodyDelete = (props) => {
    return <div>
        <div className="row">
            <div className="col centered">
                <img src="/question.png" alt="question-mark" width="30" />
                <span>Are you sure ?</span>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <button className='bordered-button btn-md' onClick={props.isConfirm}>ok</button>
                <button className='bordered-button btn-md' onClick={props.closeModal}>cancel</button>
            </div>
        </div>
    </div>
}

export const BodyEdit = (props) => {
    const details = props.data;
    return <div>
        <div className="row">
            <div className="col-3 centered">
                File Description
            </div>
            <div className="col centered">
                <input type="text" className="bordered-input" value={details.label} name="label" onChange={props.handleChanges} />
            </div>
        </div>
        <div className="row">
            <div className="col">
                <button className='bordered-button btn-md' onClick={props.isConfirm}>Save</button>
                <button className='bordered-button btn-md' onClick={props.closeModal}>Cancel</button>
            </div>
        </div>
    </div>
}