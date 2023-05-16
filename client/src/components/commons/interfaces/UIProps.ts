import {ReactNode} from "react";

export interface UIProps {
    children?: ReactNode;
    type?: "number" | "text"
    props?: any
    onClick?: () => void
    label?: string
    value?: "text" | "number"
    onChange?: () => void
    disabled?: boolean
}