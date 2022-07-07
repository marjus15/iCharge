import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    justifyContent: "space-between",
    textAlign: "center",
    marginBottom: "2rem",
  },
});

export const DropDown = ({
  name,
  value,
  options,
  onFocus,
  onChange,
  onBlur,
  setValueCar,
  setValuePerc,
}) => {
  const [localValue, setLocalValue] = useState(value ?? ""); // we want to keep value locally
  useEffect(() => setLocalValue(value ?? ""), [value]); // we want to update local value on prop value change
  const handleFocus = () => {
    if (onFocus) {
      onFocus();
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setLocalValue(value);
    if (onChange) {
      onChange(value);
    }
  };
  const handleBlur = (e) => {
    if (onBlur) {
      onBlur(e.target.value);
    }
  };

  const classes = useStyles();
  return (
    <Select
      className={classes.root}
      name={name}
      value={localValue} // we want to work in controlled mode
      onFocus={handleFocus}
      onChange={handleChange} // we want to work in controlled mode
      onBlur={handleBlur}
    >
      {options?.map((option) => {
        return (
          <MenuItem key={option.value} value={option.value}>
            {option.label ?? option.value}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default DropDown;
