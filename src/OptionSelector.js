import React from "react";

const ButtonOption = ({ value, size, isActive, onClickOnActive, onClick }) => {
  if (isActive) {
    return (
      <button onClick={onClickOnActive} className={`button ${size} is-active is-link`}>
        {value}
      </button>
    );
  } else {
    return (
      <button
        className={`button ${size}`}
        onClick={() => {
          onClick(value);
        }}
      >
        {value}
      </button>
    );
  }
};

const OptionSelector = ({
  value,
  size,
  onChange,
  isMonolitic,
  onClickOnActive,
  options,
  preText,
  afterText,
}) => {
  return (
    <div className="" style={{margin: '10px', marginBottom: '30px'}}>
      <p>{preText}</p>
      <div className={`buttons ${isMonolitic ? 'has-addons' : ''}`}>
        {options.map((seatOption) => (
          <ButtonOption
            key={seatOption}
            size={size}
            isActive={value === seatOption}
            onClick={onChange}
            onClickOnActive={onClickOnActive}
            value={seatOption}
          />
        ))}
        {afterText}
      </div>
    </div>
  );
};

export default OptionSelector;
