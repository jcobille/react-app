import { Link } from "react-router-dom";

const tableRow = (props) => {
    const downloadLink = "http://localhost:3002/uploads/download/";
    const buttons = (props.buttons) ? props.buttons : [];
    const deleteRow = (id) => {
        if (props.tableType === 'user' && props.userId === id) {
            return;
        }
        props.setDelete(id);
    }

    return (
        <div className="table-row">
            {props.columns.map((column, key) => {
                if (key < 2) {
                    if (props.tableType !== 'sharedTo') { // filename and user email id column
                        if (column.key === "fileName") {
                            return <div className={"table-cell " + (key > 0 ? "text-center" : "")} key={key}>
                                <a href={`${downloadLink}${props._id}`} className="btn-link" download>{props[column.key]}</a>
                            </div>
                        }

                        return <div className={"table-cell " + (key > 0 ? "text-center" : "")} key={key}>
                            {props[column.key]}
                        </div>
                    } else {
                        if (key < 1) { //  column shared user
                            return <div className={"table-cell " + (key > 0 ? "text-center" : "")} key={key}>
                                {props[column.key]}
                            </div>
                        } else {
                            let btn = "";
                            if (props[column.key]) { // column action
                                btn = <button className="btn-link" onClick={() => deleteRow(props[column.key])}>
                                    Remove
                                </button>
                            }
                            return <div className="table-cell text-center" key={key}>{btn}</div>
                        }
                    }
                } else {
                    if (column.key === 'sharedBy') { // column shared by 
                        return <div className="table-cell text-center" key={key}>
                            {props[column.key]}
                        </div>
                    } else { // buttons
                        return <div className="table-cell text-center" key={key}>
                            {buttons.map((btn, key) => {
                                if (props[column.key]) {
                                    if (btn.label !== 'Delete') {
                                        if (props.tableType === 'user') { // btn edit user
                                            return (
                                                <Link to={`${btn.link}/${props[column.key]}`} key={key}>
                                                    <button className="btn-link">{btn.label}</button>
                                                </Link>
                                            )
                                        } else {
                                            if (btn.label === 'Edit') { // btn edit file
                                                return (
                                                    <button className="btn-link" key={key} onClick={() => { props.setEdit(props[column.key]) }}>{btn.label}</button>
                                                )
                                            } else {
                                                return ( // btn share
                                                    <Link to={`${btn.link}/${props[column.key]}`} key={key}>
                                                        <button className="btn-link">{btn.label}</button>
                                                    </Link>
                                                )
                                            }

                                        }
                                    } else {
                                        if (props.tableType === 'user') { // btn user delete
                                            return (
                                                <button className={props.userId === props[column.key] ? "btn-disabled" : "btn-link"}
                                                    key={key} onClick={() => deleteRow(props[column.key])}>
                                                    {btn.label}
                                                </button>
                                            )
                                        } else { // btn file delete
                                            return (
                                                <button className="btn-link"
                                                    key={key} onClick={() => deleteRow(props[column.key])}>
                                                    {btn.label}
                                                </button>
                                            )
                                        }
                                    }
                                }
                                return <span key={key} />;
                            })}
                        </div>
                    }
                }
            })}
        </div>
    )
}

export default tableRow;