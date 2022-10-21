export const TextInput = (props) => {
    return (
        <div className="row">
            <div className="col-5 text-end">
                <label>{props.label}</label>
            </div>
            <div className="col-3 text-start">
                <input
                    onChange={props.onChange}
                    type={props.type}
                    name={props.name}
                    id={props.id}
                    className="bordered-input"
                    placeholder={props.placeholder}
                    value={props.value}
                    autoComplete="off"
                />
            </div>
        </div>
    )
}

export const UserSelection = (props) => {
    return (
        <>
            <select className="custom-select" value={props.value} onChange={props.changeHandler}>
                <option></option>
                {props.data.map((u,key) => {
                    return <option key={key} value={u._id}>{u.name}</option>
                })}
            </select>
        </>
    )
}