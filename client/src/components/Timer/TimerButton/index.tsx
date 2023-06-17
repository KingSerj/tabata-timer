import React from "react";
import * as SC from "./styles"
import { TimerProps } from "../interfaces/TimerProps";

export const TimerButton = ({children, onClick, disabled}: TimerProps) => <SC.TimerButton onClick={onClick} disabled={disabled}>{children}</SC.TimerButton>
