import React from "react";
import * as SC from "./styles.js"
import {UIProps} from "../../commons/interfaces/UIProps";

export const Input = ({label, type, value, onChange}: UIProps) => {
    return (
        <SC.Container>
            <SC.Label>{label}</SC.Label>
            <SC.Input type={type} value={value} onChange={onChange}/>
        </SC.Container>
    )
}