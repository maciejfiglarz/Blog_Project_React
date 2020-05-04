import React, { useState } from "react";
import { Button } from "./buttons";

export const InputText = (props) => {
  const {
    onChange,
    className,
    placeholder,
    name,
    type,
    maxLength,
    value,
  } = props;
  const currentType = type ? type : "text";
  return (
    <div className="input__text-wrap">
      {maxLength && (
        <div className="input__text-counter">
          {value.length} / {maxLength}
        </div>
      )}
      <input
        onChange={onChange}
        className={`input__text-regular  ${className}`}
        type={currentType}
        name={name}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
      ></input>
    </div>
  );
};

export const InputFile = (props) => {
  const { onChange, className, name } = props;
  return (
    <div className="input-file__wrap">
      <input
        type="file"
        name={name}
        id="file"
        onChange={(e) => onChange(e)}
        className="inputfile creator-form__photo-file"
      />
      <label className="button-primary" htmlFor="file">
        Wybierz zdjęcie
      </label>
    </div>
  );
};

export const TextArea = (props) => {
  const style = {
    height: props.height,
  };
  const { onChange, name, className, placeholder,maxLength } = props;
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  return (
    <div className="textarea-default-wrap">
      <textarea
        style={style}
        onChange={onChange}
        name={name}
        onKeyDown={handleKeyDown}
        className={`input__text-regular ${className}`}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </div>
  );
};
export const Select = (props) => {
  const { onChange, name, className, placeholder } = props;
  return (
    <select name={name} onChange={onChange} className="select-default">
      {props.options.map((opt) => {
        return (
          <option key={opt.value} value={opt.value}>
            {opt.placeholder}
          </option>
        );
      })}
    </select>
  );
};

export const Checkbox = (props) => {
  const { onChange, name, className, label } = props;
  return (
    <React.Fragment>
      <div className="input-checkbox__wrap">
        <input
          className="input-checkbox"
          type="checkbox"
          name={name}
          id={name}
          onChange={onChange}
        />
        <label htmlFor={name}>{label}</label>
      </div>
    </React.Fragment>
  );
};

/* <div>
<input
  type="file"
  name="file"
  id="file"
  onChange={onChange}
  className="inputfile creator-form__photo-file"
/>
<label className="button-primary" htmlFor="file">
  Wybierz zdjęcie
</label>
</div> */

/* <div>
<label className="file-container">
  <input
    onChange={onChange}
    type="file"
    placeholder={placeholder}
    className="inputfile creator-form__photo-file"
  ></input>
</label>
</div> */
// }

// export const Checkbox = (props) => {
//     const {onChange, name, className, placeholder} = props;
//     return (
//         <div>
//             <input
//                 type="checkbox"
//                 name={name}
//                 onChange={onChange}
//                 id={name}
//                 className="checkbox-default-input"/>
//             <label htmlFor={name} className="checkbox-default">{placeholder}</label>
//         </div>
//     )
// }
