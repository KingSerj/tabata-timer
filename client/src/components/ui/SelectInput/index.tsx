import React from "react";
import Select from "react-select";
import { SelectProps } from "./SelectProps";

export const SelectInput = ({options, placeholder, onChange, isDisabled}: SelectProps) => (
    <Select options={options} placeholder={placeholder} onChange={onChange} isDisabled={isDisabled}/>
)
