import React from "react";
import * as SC from "./styles"
import {UIProps} from "../../commons/interfaces/UIProps";

export const Modal = ({props, children}: UIProps) => {
    return <SC.ModalWrapper>
        <SC.Modal {...props}>
            <SC.ModalText>{children}</SC.ModalText>
        </SC.Modal>
    </SC.ModalWrapper>
}