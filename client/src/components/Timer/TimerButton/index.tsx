import React from "react";
import * as SC from "./styles"
import { ITimerProps } from "../interfaces/TimerProps";

export const TimerButton = ({children, onClick, disabled}: ITimerProps) => <SC.TimerButton onClick={onClick} disabled={disabled}>{children}</SC.TimerButton>
