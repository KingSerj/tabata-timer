import React from "react";
import Select from "react-select";
import { SingleValue } from 'react-select';
import { ISelectProps } from "./SelectProps";
import { IProgramProps } from "../../commons/interfaces/ProgramProps";

export const SelectInput = ({ options, placeholder, onChange, isDisabled }: ISelectProps) => {
    const handleSelectChange = (selected: SingleValue<object> | null) => {
        if (selected && typeof selected === "object") {
            onChange?.(selected as IProgramProps);
        }
    }

    return <Select options={options} placeholder={placeholder} onChange={handleSelectChange} isDisabled={isDisabled} />
}
