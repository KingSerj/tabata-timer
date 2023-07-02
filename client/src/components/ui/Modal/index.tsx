import React from "react";
import * as SC from "./styles"
import { IUIProps } from "../../commons/interfaces/UIProps";

export const Modal = ({children}: IUIProps) => (
    <SC.ModalWrapper>
        <SC.Modal>
            <SC.ModalText>{children}</SC.ModalText>
        </SC.Modal>
    </SC.ModalWrapper>
)