import React from "react";
import * as SC from "./styles"
import { IUIProps } from "../../commons/interfaces/UIProps";

export const Button = ({children, onClick, disabled}: IUIProps) => <SC.Button onClick={onClick} disabled={disabled}>{children}</SC.Button>
