import React from "react";
import Select from "react-select";
import {SelectProps} from "./SelectProps";

export const SelectInput = ({options, placeholder, onChange}: SelectProps) => {
    return (
            <Select options={options} placeholder={placeholder} onChange={onChange}/>
        )
}