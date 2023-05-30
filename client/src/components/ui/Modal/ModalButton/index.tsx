import React from "react";
import {UIProps} from "../../../commons/interfaces/UIProps";
import * as SC from "./styles"

export const ModalButton = ({props, children, onClick, disabled}: UIProps) => {
    return <SC.ModalButton {...props} onClick={onClick} disabled={disabled}>{children}</SC.ModalButton>
}