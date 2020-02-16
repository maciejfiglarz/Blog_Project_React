import React from 'react';
import {Button} from './buttons';

export const Input = (props) => {
    console.log("propsssss", ...props);
    const {onChange, className, placeholder, name, type} = props;
    type
        ? type
        : "text";
    return (
        <input
            onChange={onChange}
            className={"input-text-default " + className}
            type={type}
            name={name}
            placeholder={placeholder}></input>
    )
}


export const InputFile = (props) => {
    const {onChange, className, placeholder} = props;
    return (
        <div>
            <label className="file-container">
                {/* <Button label={placeholder}/> */}
                <input onChange={onChange} type="file" placeholder={placeholder}></input>
            </label>
        </div>
    )
}

export const TextArea = (props) => {
    const style = {
        height: props.height
    }
    const {onChange, name, className, placeholder} = props;

    return (
        <div className="textarea-default-wrap">
            <textarea
                style={style}
                onChange={onChange}
                name={name}
                className={"textarea-default" + className}
                placeholder={placeholder}/>
        </div>
    )
}
export const Select = (props) => {
    const {onChange, name, className, placeholder} = props;
    return (
        <select name={name} onChange={onChange} className="select-default">
            {props
                .options
                .map(opt => {
                    return (
                        <option key={opt.value} value={opt.value}>{opt.placeholder}</option>
                    );
                })}
        </select>
    )
}
export const Checkbox = (props) => {
    const {onChange, name, className, placeholder} = props;
    return (
        <div>
            <input
                type="checkbox"
                name={name}
                onChange={onChange}
                id={name}
                className="checkbox-default-input"/>
            <label htmlFor={name} className="checkbox-default">{placeholder}</label>
        </div>
    )
}
