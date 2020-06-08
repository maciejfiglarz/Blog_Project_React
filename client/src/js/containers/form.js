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
        id={`file-${name}`}
        onChange={(e) => onChange(e)}
        className="inputfile creator-form__photo-file"
      />
      <label className="button-primary" htmlFor={`file-${name}`}>
        Wybierz zdjęcie
      </label>
    </div>
  );
};

export const TextArea = ({
  onChange,
  name,
  className,
  placeholder,
  maxLength,
  height,
  value,
  color
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const style = {
    height,
    color,
  };
  console.log('style',style);
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  const handleOnFocus = (e) => {
    setIsFocus(!isFocus);
  };
  const handleOnBlur = (e) => {
    setIsFocus(!isFocus);
  };
  return (
    <div className="input__text-wrap">
      {maxLength && isFocus && (
        <div className="input__text-counter">
          {value.length} / {maxLength}
        </div>
      )}
      <textarea
        onChange={onChange}
        name={name}
        style={style}
        onKeyDown={handleKeyDown}
        className={`input__text-regular ${className}`}
        placeholder={placeholder}
        maxLength={maxLength}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
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

export const Checkbox = ({ onChange, name, className, label }) => {
  console.log("xxx ", onChange, name, className, label);
  return (
    <div className="input-checkbox__wrap">
      <input
        className={`input-checkbox ${className}`}
        type="checkbox"
        name={name}
        id={`checkbox-${name}`}
        onChange={onChange}
      />
      <label htmlFor={`checkbox-${name}`}>{label}</label>
    </div>
  );
};
