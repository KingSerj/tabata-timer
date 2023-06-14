import React from "react";
import * as SC from "./styles"
import {UIProps} from "../../commons/interfaces/UIProps";

export const Button = ({children, onClick, disabled}: UIProps) => {
    return <SC.Button onClick={onClick} disabled={disabled}>{children}</SC.Button>
}