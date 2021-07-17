import React from "react";

const Input = (props) => {
    return (
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">{props.title}</label>
            <input id={props.name} name={props.name} type={props.type} className="form-control"
                   onChange={props.handleChange}
                   placeholder={props.placeholder}
                   value={props.value}/>
        </div>
    )
}

export default Input;
