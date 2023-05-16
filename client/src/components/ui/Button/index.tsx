import React from "react";
import * as SC from "./styles"
import {UIProps} from "../../commons/interfaces/UIProps";

export const Button = ({props, children, onClick, disabled}: UIProps) => {
    return <SC.Button {...props} onClick={onClick} disabled={disabled}>{children}</SC.Button>
}