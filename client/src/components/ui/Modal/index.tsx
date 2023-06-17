import React from "react";
import * as SC from "./styles"
import { UIProps } from "../../commons/interfaces/UIProps";

export const Modal = ({children}: UIProps) => (
    <SC.ModalWrapper>
        <SC.Modal>
            <SC.ModalText>{children}</SC.ModalText>
        </SC.Modal>
    </SC.ModalWrapper>
)