import {ReactNode} from "react";

export interface TimerProps {
    children?: ReactNode
    onClick?: () => void
    disabled?: boolean
}