import React from "react"
import { ITimerProps } from "../interfaces/TimerProps";
import * as SC from "./styles"

export const Countdown = ({children}: ITimerProps) => <SC.Countdown>{children}</SC.Countdown>