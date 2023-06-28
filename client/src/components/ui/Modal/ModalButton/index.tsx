import React from "react";
import { IUIProps } from "../../../commons/interfaces/UIProps";
import * as SC from "./styles"

export const ModalButton = ({children, onClick, disabled}: IUIProps) => <SC.ModalButton onClick={onClick} disabled={disabled}>{children}</SC.ModalButton>
