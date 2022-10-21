import React from "react";
import TableRow from './Row';

const Table = (props) => {
    const length = props.data.length < props.minRow ? props.minRow : props.data.length;
    const data = props.data;
    const buttons = props.buttonList;
    const extraCols = props.tableType === "shared" ? 3 : 0;
    return (
        <>
            <div className="table">
                <div className="table-header">
                    {props.columns.map((column, index) => (
                        <div className="col-4 th-cell" key={index}>
                            <div className={"box " + (index > 0 ? "text-center" : "")}> {column.label} </div>
                        </div>
                    ))}
                </div>
                <div className="table-body" id="tableBody">
                    {
                        [...Array(length)].map((_, i) => {
                            return <TableRow
                                key={i}
                                {...data[i]}
                                {...props}
                                buttons={buttons}
                            />
                        })
                    }
                    <div className="table-row">
                        {[...Array(extraCols)].map((_, i) => {
                            return <div className="table-cell" key={i}></div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Table