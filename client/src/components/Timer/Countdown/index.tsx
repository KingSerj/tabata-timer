import {TimerProps} from "../interfaces/TimerProps";
import * as SC from "./styles"

export const Countdown = ({children}: TimerProps) => {
    return (
        <SC.Countdown>{children}</SC.Countdown>
    )
}