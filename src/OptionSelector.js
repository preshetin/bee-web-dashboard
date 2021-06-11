import React from "react";

const ButtonOption = ({ value, isDisabled, onClick }) => {
  if (isDisabled) {
    return (
      <button className="button is-static is-active is-link">{value}</button>
    );
  } else {
    return (
      <button
        className="button"
        onClick={() => {
          onClick(value);
        }}
      >
        {value}
      </button>
    );
  }
};

const OptionSelector = ({ value, onChange, options, preText, afterText }) => {
  
  return (
    <div className="box">
      <p>{preText}</p>
      <div className="buttons has-addons">
        {options.map((seatOption) => (
          <ButtonOption
            key={seatOption}
            isDisabled={value === seatOption}
            onClick={onChange}
            value={seatOption}
          />
        ))}
        {afterText}
      </div>
    </div>
  );
};

export default OptionSelector;