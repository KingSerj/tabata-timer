import { ReactNode } from "react";

export interface ITimerProps {
    children?: ReactNode
    onClick?: () => void
    disabled?: boolean
}