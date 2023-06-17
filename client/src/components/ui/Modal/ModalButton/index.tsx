import React from "react";
import { UIProps } from "../../../commons/interfaces/UIProps";
import * as SC from "./styles"

export const ModalButton = ({children, onClick, disabled}: UIProps) => <SC.ModalButton onClick={onClick} disabled={disabled}>{children}</SC.ModalButton>
